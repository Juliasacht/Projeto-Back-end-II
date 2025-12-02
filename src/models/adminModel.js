import pool from './db.js';

export async function findAdminByLogin(login) {
  const [rows] = await pool.execute('SELECT * FROM Admins WHERE login = ?', [login]);
  return rows[0] || null;
}
