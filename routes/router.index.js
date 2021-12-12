const productRouter = require('./api/router.product');
const categoryRouter = require('./api/router.category');
const commentRouter = require('./api/router.comment');
const userRouter = require('./api/router.user');
const adminRootRouter = require('./admin/router.admin');
const adminProductRouter = require('./admin/route.product');
const orderRouter = require('./api/router.order');
const orderAdminRouter = require('./admin/router.order');
const adminCategoryRouter = require('./admin/route.category');
const adminBrandRouter = require('./admin/route.brand');

const initialApp = (app) => {
  // *** Site Route ***
  // User route
  app.use('/api/auth', userRouter);
  // Product route
  app.use('/api', productRouter);
  // Category route
  app.use('/api/category', categoryRouter);
  // Comment route
  app.use('/api/comment', commentRouter);

  // *** Admin Route ***
  app.use('/', adminRootRouter);

  // Dashboard Product
  app.use('/product-manager', adminProductRouter);

  // Dashboard category
  app.use('/category-manager', adminCategoryRouter);

  // Dashboard brand
  app.use('/brand-manager', adminBrandRouter);

  // Dashboard Order
  app.use('/api/order', orderRouter);
  app.use('/order', orderAdminRouter);
};

module.exports = { init: initialApp };
