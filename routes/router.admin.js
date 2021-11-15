const Router = require('express').Router();
const adminController = require('../app/controllers/controller.admin');
const adminAuth = require('../middlewares/adminAuth');

Router.get('/', adminAuth, (req, res) => {
  res.status(200).render('template/index.ejs');
});
Router.get('/login', (req, res) => {
  res.status(200).render('template/auth/login.ejs');
});
Router.get('/logout', adminController.logout);
Router.post('/login', adminController.login);

module.exports = Router;
