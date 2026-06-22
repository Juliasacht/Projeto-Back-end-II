import { Router } from 'express';
import { getLogin, postLogin, getDashboard } from '../controllers/adminController.js';
import { ensureAdmin } from '../middlewares/auth.js';

const router = Router();

router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/dashboard', ensureAdmin, getDashboard);

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
});

export default router;
