export function ensureAdmin(req, res, next) {
  // aqui você usa o mesmo nome salvo no login: req.session.admin
  if (req.session && req.session.admin) {
    // deixa o admin disponível nas views
    res.locals.admin = req.session.admin;
    return next();
  }

  // não logado: manda pro login de admin
  return res.redirect('/admin/login');
}
