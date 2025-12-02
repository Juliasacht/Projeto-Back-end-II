import { Router } from 'express';
import { ensureAdmin } from '../middlewares/auth.js';
import {
  getList,
  getCreate,
  postCreate,
  getEdit,
  postEdit,
  getDelete,
} from '../controllers/medicoController.js';

const router = Router();

router.use(ensureAdmin);

router.get('/', getList);
router.get('/novo', getCreate);
router.post('/novo', postCreate);
router.get('/editar/:id', getEdit);
router.post('/editar/:id', postEdit);
router.get('/excluir/:id', getDelete);

export default router;
