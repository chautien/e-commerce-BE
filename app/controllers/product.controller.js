const ProductModel = require('../models/product.model');
const CategoryModel = require('../models/category.model');
const CommentModel = require('../models/comment.model');
const UserModel = require('../models/user.model');

class HomeController {
  async index(req, res) {
    try {
      const products = await ProductModel.find().populate([
        {
          path: 'category',
          select: 'name',
        },
      ]);
      res.status(200).json({ status: true, products });
    } catch (error) {
      res.status(400).json({ status: false, error });
    }
  }
  async detail(req, res) {
    const { id } = req.params;
    if (!id) return;

    try {
      const product = await ProductModel.findById(id);
      const comments = await CommentModel.find({ product: id }).populate([
        { path: 'user', select: 'firstName lastName email image' },
      ]);
      res.status(200).json({ status: true, product, comments });
    } catch (error) {
      res.status(400).json({ status: false, error });
    }
  }
}

module.exports = new HomeController();
