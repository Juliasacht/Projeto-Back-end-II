import {
  createConsulta,
  listConsultas,
  getConsultaById,
  updateConsulta,
  deleteConsulta
} from '../models/consultaModel.js';
import { listPacientes } from '../models/pacienteModel.js';
import { listMedicos } from '../models/medicoModel.js';

export async function getList(req, res) {
  try {
    const q = req.query.q;
    const consultasRaw = await listConsultas({ search: q });

    const consultas = consultasRaw.map((c) => {
      let dataFormatada;
      if (c.data instanceof Date) {
        dataFormatada = c.data.toLocaleDateString('pt-BR');
      } else {
        dataFormatada = c.data;
      }

      const status = c.status || '';
      const statusSlug = status.toLowerCase().replace(/\s+/g, '-');

      return {
        ...c,
        dataFormatada,
        status,
        statusSlug,
      };
    });

    res.render('consultas/index', {
      title: 'Consultas',
      consultas,
      q,
    });
  } catch (err) {
    res.status(500).send('Erro ao listar consultas: ' + err.message);
  }
}

export async function getCreate(req, res) {
  try {
    const pacientes = await listPacientes();
    const medicos = await listMedicos();
    res.render('consultas/create', {
      title: 'Agendar Consulta',
      errors: {},
      form: {},
      pacientes,
      medicos,
      editing: false   // <<< AQUI
    });
  } catch (err) {
    res.status(500).send('Erro ao carregar formulário: ' + err.message);
  }
}

export async function postCreate(req, res) {
  const form = { ...req.body };
  const errors = {};

  if (!form.data) errors.data = 'Informe a data';
  if (!form.horario) errors.horario = 'Informe o horário';
  if (!form.idPaciente) errors.idPaciente = 'Selecione o paciente';
  if (!form.idMedico) errors.idMedico = 'Selecione o médico';

  try {
    const pacientes = await listPacientes();
    const medicos = await listMedicos();

    if (Object.keys(errors).length) {
      return res.status(400).render('consultas/create', {
        title: 'Agendar Consulta',
        errors,
        form,
        pacientes,
        medicos
      });
    }

    await createConsulta(form);
    res.redirect('/consultas');
  } catch (err) {
    res.status(500).send('Erro ao salvar consulta: ' + err.message);
  }
}

export async function getEdit(req, res) {
  try {
    const consulta = await getConsultaById(req.params.id);
    if (!consulta) return res.status(404).send('Consulta não encontrada');

    const pacientes = await listPacientes();
    const medicos = await listMedicos();

    res.render('consultas/create', {
      title: 'Editar Consulta',
      errors: {},
      form: consulta,
      pacientes,
      medicos,
      editing: true
    });
  } catch (err) {
    res.status(500).send('Erro ao carregar consulta: ' + err.message);
  }
}

export async function postEdit(req, res) {
  const id = req.params.id;
  const form = { ...req.body };

  try {
    await updateConsulta(id, form);
    res.redirect('/consultas');
  } catch (err) {
    res.status(500).send('Erro ao atualizar consulta: ' + err.message);
  }
}

export async function getDelete(req, res) {
  try {
    await deleteConsulta(req.params.id);
    res.redirect('/consultas');
  } catch (err) {
    res.status(500).send('Erro ao excluir consulta: ' + err.message);
  }
}
