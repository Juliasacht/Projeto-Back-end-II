import pool from './db.js';

export async function createMedico(data) {
  const sql = `INSERT INTO Medicos (nome, crm, especialidade, telefone, email, disponibilidade)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [data.nome, data.crm, data.especialidade, data.telefone || null, data.email || null, data.disponibilidade || null];
  const [result] = await pool.execute(sql, params);
  return result.insertId;
}

export async function listMedicos({ search } = {}) {
  let sql = 'SELECT * FROM Medicos';
  let params = [];
  if (search) {
    sql += ' WHERE nome LIKE ? OR crm LIKE ? OR especialidade LIKE ?';
    const like = `%${search}%`;
    params = [like, like, like];
  }
  sql += ' ORDER BY nome';
  const [rows] = await pool.execute(sql, params);
  return rows;
}
