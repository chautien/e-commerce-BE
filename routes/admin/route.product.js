const express = require('express');
const productController = require('../../app/controllers/controller.product');
const router = express.Router();

router.get('/list', productController.adminGetList);
router.get('/add', productController.adminGetAdd);

module.exports = router;
