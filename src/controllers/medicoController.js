import { createMedico, listMedicos } from '../models/medicoModel.js';

export async function getList(req, res) {
  try {
    const medicos = await listMedicos({ search: req.query.q });
    res.render('medicos/index', { title: 'Médicos', medicos, q: req.query.q || '' });
  } catch (err) {
    res.status(500).send('Erro ao listar médicos: ' + err.message);
  }
}

export async function getCreate(req, res) {
  res.render('medicos/create', { title: 'Cadastrar Médico', errors: {}, form: {} });
}

export async function postCreate(req, res) {
  const { nome, crm, especialidade, telefone, email, disponibilidade } = req.body;
  const form = { nome, crm, especialidade, telefone, email, disponibilidade };
  const errors = {};
  if (!nome) errors.nome = 'Informe o nome';
  if (!crm) errors.crm = 'Informe o CRM';
  if (!especialidade) errors.especialidade = 'Informe a especialidade';

  if (Object.keys(errors).length) {
    return res.status(400).render('medicos/create', { title: 'Cadastrar Médico', errors, form });
  }
  try {
    await createMedico(form);
    res.redirect('/medicos');
  } catch (err) {
    let msg = err.message;
    if (msg.includes('Duplicate')) msg = 'CRM já cadastrado.';
    res.status(400).render('medicos/create', { title: 'Cadastrar Médico', errors: { geral: msg }, form });
  }
}
