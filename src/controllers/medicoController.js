import {
  createMedico,
  listMedicos,
  getMedicoById,
  updateMedico,
  deleteMedico
} from '../models/medicoModel.js';

export async function getList(req, res) {
  try {
    const medicos = await listMedicos({ search: req.query.q });
    res.render('medicos/index', {
      title: 'Médicos',
      medicos,
      q: req.query.q || ''
    });
  } catch (err) {
    res.status(500).send('Erro ao listar médicos: ' + err.message);
  }
}

export function getCreate(req, res) {
  res.render('medicos/create', {
    title: 'Cadastrar Médico',
    errors: {},
    form: {},
    editing: false   
  });
}


export async function postCreate(req, res) {
  const form = { ...req.body };
  const errors = {};

  if (!form.nome) errors.nome = 'Informe o nome';
  if (!form.crm) errors.crm = 'Informe o CRM';
  if (!form.especialidade) errors.especialidade = 'Informe a especialidade';

  if (Object.keys(errors).length) {
    return res.status(400).render('medicos/create', {
      title: 'Cadastrar Médico',
      errors,
      form
    });
  }

  try {
    await createMedico(form);
    res.redirect('/medicos');
  } catch (err) {
    let msg = err.message;
    if (msg.includes('Duplicate') && msg.includes('crm')) msg = 'CRM já cadastrado.';
    res.status(400).render('medicos/create', {
      title: 'Cadastrar Médico',
      errors: { geral: msg },
      form
    });
  }
}

export async function getEdit(req, res) {
  try {
    const medico = await getMedicoById(req.params.id);
    if (!medico) return res.status(404).send('Médico não encontrado');

    res.render('medicos/create', {
      title: 'Editar Médico',
      errors: {},
      form: medico,
      editing: true
    });
  } catch (err) {
    res.status(500).send('Erro ao carregar médico: ' + err.message);
  }
}

export async function postEdit(req, res) {
  const id = req.params.id;
  const form = { ...req.body, idMedico: id };
  const errors = {};

  if (!form.nome) errors.nome = 'Informe o nome';
  if (!form.crm) errors.crm = 'Informe o CRM';
  if (!form.especialidade) errors.especialidade = 'Informe a especialidade';

  if (Object.keys(errors).length) {
    return res.status(400).render('medicos/create', {
      title: 'Editar Médico',
      errors,
      form,
      editing: true
    });
  }

  try {
    await updateMedico(id, form);
    res.redirect('/medicos');
  } catch (err) {
    let msg = err.message;
    if (msg.includes('Duplicate') && msg.includes('crm')) msg = 'CRM já cadastrado.';
    res.status(400).render('medicos/create', {
      title: 'Editar Médico',
      errors: { geral: msg },
      form,
      editing: true
    });
  }
}

export async function getDelete(req, res) {
  try {
    await deleteMedico(req.params.id);
    res.redirect('/medicos');
  } catch (err) {
    res.status(500).send('Erro ao excluir médico: ' + err.message);
  }
}
