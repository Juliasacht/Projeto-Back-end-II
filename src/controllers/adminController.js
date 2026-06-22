import { findAdminByLogin } from '../models/adminModel.js';
import { countPacientes } from '../models/pacienteModel.js';
import { countMedicos } from '../models/medicoModel.js';
import { countConsultasHoje } from '../models/consultaModel.js';

export function getLogin(req, res) {
  if (req.session && req.session.admin) {
    return res.redirect('/admin/dashboard');
  }

  return res.render('admin/login', {
    title: 'Login Admin',
    active: 'admin',
    errors: {},
    form: {},
  });
}

export async function postLogin(req, res) {
  const form = { ...req.body };
  const errors = {};

  if (!form.login) errors.login = 'Informe o login';
  if (!form.senha) errors.senha = 'Informe a senha';

  if (Object.keys(errors).length) {
    return res.status(400).render('admin/login', {
      title: 'Login Admin',
      active: 'admin',
      errors,
      form,
    });
  }

  try {
    const admin = await findAdminByLogin(form.login);

    if (!admin || admin.senha !== form.senha) {
      return res.status(400).render('admin/login', {
        title: 'Login Admin',
        active: 'admin',
        errors: { geral: 'Login ou senha inválidos' },
        form,
      });
    }

    req.session.admin = {
      id: admin.idAdmin,
      nome: admin.nome,
      login: admin.login,
    };
    res.locals.admin = req.session.admin;

    return res.redirect('/admin/dashboard');
  } catch (err) {
    return res.status(500).send('Erro ao autenticar: ' + err.message);
  }
}

export async function getDashboard(req, res) {
  try {
    const admin = req.session.admin;

    const [totalPacientes, totalMedicos, consultasHoje] = await Promise.all([
      countPacientes(),
      countMedicos(),
      countConsultasHoje(),
    ]);

    return res.render('admin/dashboard', {
      title: 'Dashboard Admin',
      active: 'admin',
      admin,
      stats: { totalPacientes, totalMedicos, consultasHoje },
    });
  } catch (err) {
    return res.status(500).send('Erro ao carregar dashboard: ' + err.message);
  }
}
