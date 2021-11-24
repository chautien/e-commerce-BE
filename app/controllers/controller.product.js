require('../models/model.user');
require('../models/model.replyComment');
const CategoryModel = require('../models/model.category');
const ProductModel = require('../models/model.product');
const CommentModel = require('../models/model.comment');
const BrandModal = require('../models/model.brand');
const { SPECS_KEYS } = require('../../constant');
const { slugify } = require('../../utils/slugify');
const { getS3ResponsenEntity } = require('../../utils/getS3ReponseEntity');
class ProductController {
  async apiGetList(req, res) {
    try {
      const { page = 1, limit = 10, category, sort } = req.query;

      const totalRows = category
        ? await ProductModel.find({ ...(category && { category }) }).count()
        : await ProductModel.count();
      const totalPages = Math.ceil(totalRows / limit);

      const filter = {
        ...(category && { category }),
      };
      console.log(sort && { view: sort });
      const products = await ProductModel.find(filter)
        .populate([
          {
            path: 'category',
          },
        ])
        .skip(Number.parseInt(page * limit - limit))
        .limit(Number.parseInt(limit))
        .sort({ ...(sort && { view: sort }) });

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
          },
        ])
        .skip(Number.parseInt(page * limit - limit))
        .limit(Number.parseInt(limit));
      if (products.length > 0) {
        // return res.status(200).render('template/product/productList', {
        //   paginate: {
        //     totalRows: Number.parseInt(totalRows),
        //     page: Number.parseInt(page),
        //     limit: Number.parseInt(limit),
        //     totalPages: Number.parseInt(totalPages),
        //   },
        //   products,
        //   message: '',
        // });
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
    const category = await CategoryModel.find();
    const brand = await BrandModal.find();

    res
      .status(200)
      .render('template/product/productAdd', { message: '', category, brand });
  }
  async adminAddNew(req, res, next) {
    let {
      category,
      brand,
      discount,
      flashsale,
      flashsale_end_date,
      name,
      slug,
      specs,
      content,
      price_option,
      color_option,
      amount,
    } = req.body;

    if (!slug) {
      slug = slugify(name);
    }
    if (flashsale === 'on') {
      flashsale = true;
    } else {
      flashsale = false;
    }

    const option = price_option.reduce((prev, _, index, arr) => {
      if (index % 2 === 0 || index === 0) {
        if (!(arr[index] || arr[index + 1])) {
          return prev;
        }
        const newObj = {
          price: parseInt(arr[index].split(',').join('')),
          value: arr[index + 1],
        };
        return [...prev, newObj];
      }
      return prev;
    }, []);

    const color = color_option.reduce((prev, curr) => {
      if (curr) {
        return [...prev, { name: curr }];
      }
      return prev;
    }, []);

    const specification = specs.reduce((prev, curr, index, arr) => {
      return [...prev, [SPECS_KEYS[index], curr]];
    }, []);
    const thumbnail = getS3ResponsenEntity({ ...req.files['thumbnail'][0] });
    const banner_image = getS3ResponsenEntity({ ...req.files['banner'][0] });
    const product_image = req.files['product-image'].map((entity) =>
      getS3ResponsenEntity(entity)
    );

    const product = new ProductModel({
      name,
      option,
      color,
      discount,
      flash_sale: flashsale,
      thumbnail,
      product_image,
      banner_image,
      specification,
      article: content,
      slug,
      amount,
    });

    const categoryData = await CategoryModel.find();
    const brandData = await BrandModal.find();

    try {
      await ProductModel.create(product);
      return res.status(200).render('template/product/productAdd', {
        message: 'Thêm sản phẩm thành công',
        category: categoryData,
        brand: brandData,
      });
    } catch (error) {
      return res.status(505).render('template/product/productAdd', {
        message: 'Thêm sản phẩm thất bại',
        category: categoryData,
        brand: brandData,
      });
    }
  }
}

module.exports = new ProductController();
