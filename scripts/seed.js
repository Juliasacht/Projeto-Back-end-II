import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const sql = fs.readFileSync(path.join(__dirname, '..', 'schema.sql'), 'utf-8');
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || ''
  });
  for (const statement of sql.split(/;\s*\n/)) {
    const stmt = statement.trim();
    if (!stmt) continue;
    await conn.query(stmt);
  }
  await conn.end();
  console.log('Banco criado e pronto!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
