import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import medicoRouter from './routes/medicos.js';
import pacienteRouter from './routes/pacientes.js';
import consultaRouter from './routes/consultas.js';
import adminRouter from './routes/admin.js';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'troque-este-segredo-em-producao',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

app.use((req, res, next) => {
  res.locals.admin = req.session?.admin || null;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.get('/', (req, res) => {
  res.render('home', { title: 'Clínica - Início', active: 'home' });
});

app.use('/medicos', medicoRouter);
app.use('/pacientes', pacienteRouter);
app.use('/consultas', consultaRouter);
app.use('/admin', adminRouter);

app.use((req, res) => {
  res.status(404).render('404', { title: 'Não encontrado' });
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
