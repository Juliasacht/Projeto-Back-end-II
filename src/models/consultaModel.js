import pool from './db.js';

export async function createConsulta(data) {
  const sql = `
    INSERT INTO Consultas (data, horario, status, observacoes, idPaciente, idMedico)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [
    data.data,
    data.horario,
    data.status || 'agendada',
    data.observacoes || null,
    data.idPaciente,
    data.idMedico
  ];
  const [result] = await pool.execute(sql, params);
  return result.insertId;
}

export async function listConsultas({ search } = {}) {
  let sql = `
    SELECT c.*, 
           p.nome AS pacienteNome,
           m.nome AS medicoNome
      FROM Consultas c
      JOIN Pacientes p ON p.idPaciente = c.idPaciente
      JOIN Medicos   m ON m.idMedico   = c.idMedico
  `;
  const params = [];

  if (search) {
    sql += `
      WHERE p.nome LIKE ?
         OR m.nome LIKE ?
         OR c.status LIKE ?
         OR DATE_FORMAT(c.data, '%d/%m/%Y') LIKE ?
    `;
    const like = `%${search}%`;
    params.push(like, like, like, like);
  }

  sql += ' ORDER BY c.data DESC, c.horario DESC';

  const [rows] = await pool.execute(sql, params);
  return rows;
}


export async function getConsultaById(id) {
  const [rows] = await pool.execute('SELECT * FROM Consultas WHERE idConsulta = ?', [id]);
  return rows[0] || null;
}

export async function updateConsulta(id, data) {
  const sql = `
    UPDATE Consultas
       SET data = ?, horario = ?, status = ?, observacoes = ?, idPaciente = ?, idMedico = ?
     WHERE idConsulta = ?
  `;
  const params = [
    data.data,
    data.horario,
    data.status || 'agendada',
    data.observacoes || null,
    data.idPaciente,
    data.idMedico,
    id
  ];
  const [result] = await pool.execute(sql, params);
  return result.affectedRows;
}

export async function deleteConsulta(id) {
  const [result] = await pool.execute('DELETE FROM Consultas WHERE idConsulta = ?', [id]);
  return result.affectedRows;
}

export async function countConsultasHoje() {
  const [rows] = await pool.execute(
    'SELECT COUNT(*) AS total FROM Consultas WHERE data = CURDATE()'
  );
  return rows[0]?.total || 0;
}
