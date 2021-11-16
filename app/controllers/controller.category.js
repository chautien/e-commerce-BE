const categoryModel = require('../models/model.category');
const productModel = require('../models/model.product');

class CategoryController {
  async index(req, res) {
    try {
      const categories = await categoryModel.find();
      res.status(200).json({ status: true, categories });
    } catch (error) {
      res.status(400).json({ status: false, error });
    }
  }
  async detail(req, res) {
    const { id: categoryId } = req.params;
    try {
      const products = await productModel.find({ category: categoryId });
      if (!products.length) {
        res.status(400).json({
          status: false,
          message: 'No product founded by category id!',
        });
      }
      res.status(200).json({
        status: true,
        message: 'Get category detail successfully!',
        products,
      });
    } catch (error) {
      res
        .status(400)
        .json({ status: false, message: 'Error when get category detail!' });
    }
  }
}

module.exports = new CategoryController();
