const Router = require('express').Router();
const productController = require('../../app/controllers/controller.product');

Router.get('/product', productController.apiGetList);
Router.get('/product/:id', productController.apiGetOne);

module.exports = Router;
