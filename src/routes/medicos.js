import { Router } from 'express';
import { getList, getCreate, postCreate } from '../controllers/medicoController.js';

const router = Router();
router.get('/', getList);
router.get('/novo', getCreate);
router.post('/novo', postCreate);

export default router;
