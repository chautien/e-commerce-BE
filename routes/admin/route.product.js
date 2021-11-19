const express = require('express');
const productController = require('../../app/controllers/controller.product');
const router = express.Router();
const upload = require('../../utils/storage');

router.get('/list', productController.adminGetList);
router.get('/add', productController.adminGetAdd);
router.post(
  '/add',
  upload.fields([
    { name: 'thumbnail' },
    { name: 'banner' },
    { name: 'product-image' },
  ]),
  productController.adminAddNew
);

module.exports = router;
