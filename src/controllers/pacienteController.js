import {
  createPaciente,
  listPacientes,
  getPacienteById,
  updatePaciente,
  deletePaciente,
} from '../models/pacienteModel.js';

function validatePaciente(form) {
  const errors = {};

  if (!form.nome) errors.nome = 'Informe o nome';

  return errors;
}

function formatDateInput(value) {
  if (!value) return '';
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

export async function getList(req, res) {
  try {
    const pacientes = await listPacientes({ search: req.query.q });
    return res.render('pacientes/index', {
      title: 'Pacientes',
      active: 'pacientes',
      pacientes,
      q: req.query.q || '',
    });
  } catch (err) {
    return res.status(500).send('Erro ao listar pacientes: ' + err.message);
  }
}

export function getCreate(req, res) {
  return res.render('pacientes/create', {
    title: 'Cadastrar Paciente',
    active: 'pacientes',
    errors: {},
    form: {},
    editing: false,
  });
}

export async function postCreate(req, res) {
  const form = { ...req.body };
  const errors = validatePaciente(form);

  if (Object.keys(errors).length) {
    return res.status(400).render('pacientes/create', {
      title: 'Cadastrar Paciente',
      active: 'pacientes',
      errors,
      form,
      editing: false,
    });
  }

  try {
    await createPaciente(form);
    return res.redirect('/pacientes');
  } catch (err) {
    let msg = err.message;
    if (msg.includes('Duplicate') && msg.includes('cpf')) msg = 'CPF já cadastrado.';

    return res.status(400).render('pacientes/create', {
      title: 'Cadastrar Paciente',
      active: 'pacientes',
      errors: { geral: msg },
      form,
      editing: false,
    });
  }
}

export async function getEdit(req, res) {
  try {
    const paciente = await getPacienteById(req.params.id);
    if (!paciente) return res.status(404).send('Paciente não encontrado');

    return res.render('pacientes/create', {
      title: 'Editar Paciente',
      active: 'pacientes',
      errors: {},
      form: {
        ...paciente,
        dataNascimento: formatDateInput(paciente.dataNascimento),
      },
      editing: true,
    });
  } catch (err) {
    return res.status(500).send('Erro ao carregar paciente: ' + err.message);
  }
}

export async function postEdit(req, res) {
  const id = req.params.id;
  const form = { ...req.body, idPaciente: id };
  const errors = validatePaciente(form);

  if (Object.keys(errors).length) {
    return res.status(400).render('pacientes/create', {
      title: 'Editar Paciente',
      active: 'pacientes',
      errors,
      form,
      editing: true,
    });
  }

  try {
    await updatePaciente(id, form);
    return res.redirect('/pacientes');
  } catch (err) {
    let msg = err.message;
    if (msg.includes('Duplicate') && msg.includes('cpf')) msg = 'CPF já cadastrado.';

    return res.status(400).render('pacientes/create', {
      title: 'Editar Paciente',
      active: 'pacientes',
      errors: { geral: msg },
      form,
      editing: true,
    });
  }
}

export async function getDelete(req, res) {
  try {
    await deletePaciente(req.params.id);
    return res.redirect('/pacientes');
  } catch (err) {
    return res.status(500).send('Erro ao excluir paciente: ' + err.message);
  }
}
