const Router = require('express').Router();
const productController = require('../app/controllers/controller.product');

Router.get('/product', productController.index);
Router.get('/product/:id', productController.detail);

module.exports = Router;
