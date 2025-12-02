import {
  createPaciente,
  listPacientes,
  getPacienteById,
  updatePaciente,
  deletePaciente
} from '../models/pacienteModel.js';

export async function getList(req, res) {
  try {
    const pacientes = await listPacientes({ search: req.query.q });
    res.render('pacientes/index', {
      title: 'Pacientes',
      pacientes,
      q: req.query.q || ''
    });
  } catch (err) {
    res.status(500).send('Erro ao listar pacientes: ' + err.message);
  }
}

export function getCreate(req, res) {
  res.render('pacientes/create', {
    title: 'Cadastrar Paciente',
    errors: {},
    form: {},
    editing: false
  });
}


export async function postCreate(req, res) {
  const form = { ...req.body };
  const errors = {};

  if (!form.nome) errors.nome = 'Informe o nome';

  if (Object.keys(errors).length) {
    return res.status(400).render('pacientes/create', {
      title: 'Cadastrar Paciente',
      errors,
      form
    });
  }

  try {
    await createPaciente(form);
    res.redirect('/pacientes');
  } catch (err) {
    let msg = err.message;
    if (msg.includes('Duplicate') && msg.includes('cpf')) msg = 'CPF já cadastrado.';
    res.status(400).render('pacientes/create', {
      title: 'Cadastrar Paciente',
      errors: { geral: msg },
      form
    });
  }
}

export async function getEdit(req, res) {
  try {
    const paciente = await getPacienteById(req.params.id);
    if (!paciente) return res.status(404).send('Paciente não encontrado');

    res.render('pacientes/create', {
      title: 'Editar Paciente',
      errors: {},
      form: paciente,
      editing: true
    });
  } catch (err) {
    res.status(500).send('Erro ao carregar paciente: ' + err.message);
  }
}

export async function postEdit(req, res) {
  const id = req.params.id;
  const form = { ...req.body, idPaciente: id };
  const errors = {};

  if (!form.nome) errors.nome = 'Informe o nome';

  if (Object.keys(errors).length) {
    return res.status(400).render('pacientes/create', {
      title: 'Editar Paciente',
      errors,
      form,
      editing: true
    });
  }

  try {
    await updatePaciente(id, form);
    res.redirect('/pacientes');
  } catch (err) {
    let msg = err.message;
    if (msg.includes('Duplicate') && msg.includes('cpf')) msg = 'CPF já cadastrado.';
    res.status(400).render('pacientes/create', {
      title: 'Editar Paciente',
      errors: { geral: msg },
      form,
      editing: true
    });
  }
}

export async function getDelete(req, res) {
  try {
    await deletePaciente(req.params.id);
    res.redirect('/pacientes');
  } catch (err) {
    res.status(500).send('Erro ao excluir paciente: ' + err.message);
  }
}
