require('../models/model.category');
require('../models/model.user');
require('../models/model.replyComment');
const ProductModel = require('../models/model.product');
const CommentModel = require('../models/model.comment');

class ProductController {
  async apiGetList(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const totalRows = await ProductModel.count();
      const totalPages = Math.ceil(totalRows / limit);

      const products = await ProductModel.find()
        .populate([
          {
            path: 'category',
            select: 'name',
          },
        ])
        .skip(Number.parseInt(page * limit - limit))
        .limit(Number.parseInt(limit));
      if (products.length > 0) {
        return res
          .status(200)
          .json({ paginate: { totalRows, page, limit, totalPages }, products });
      } else {
        return res.status(400).json({
          paginate: { totalRows, page, limit, totalPages },
          message: 'Not found!',
        });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
  async apiGetOne(req, res) {
    const { id } = req.params;
    if (!id) return;

    try {
      const product = await ProductModel.findById(id);
      const comments = await CommentModel.find({ product: id }).populate([
        { path: 'user', select: 'firstName lastName email image' },
        { path: 'replyComment' },
      ]);
      res.status(200).json({ status: true, product, comments });
    } catch (error) {
      res.status(400).json({ status: false, error });
    }
  }
  async adminGetList(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const totalRows = await ProductModel.count();
      const totalPages = Math.ceil(totalRows / limit);

      const products = await ProductModel.find()
        .populate([
          {
            path: 'category',
            select: 'name',
          },
        ])
        .skip(Number.parseInt(page * limit - limit))
        .limit(Number.parseInt(limit));
      if (products.length > 0) {
        return res.status(200).render('template/product/productList', {
          paginate: {
            totalRows: Number.parseInt(totalRows),
            page: Number.parseInt(page),
            limit: Number.parseInt(limit),
            totalPages: Number.parseInt(totalPages),
          },
          products,
          message: '',
        });
      } else {
        return res.status(400).render('template/product/productList', {
          paginate: { totalRows, page, limit, totalPages },
          products,
          message: 'Không tìm thấy sản phẩm',
        });
      }
    } catch (error) {
      res.status(400).json({ error: 'error' });
    }
  }
  async adminGetAdd(req, res) {
    res.status(200).render('template/product/productAdd');
  }
}

module.exports = new ProductController();
