const productRouter = require('./api/router.product');
const categoryRouter = require('./api/router.category');
const commentRouter = require('./api/router.comment');
const userRouter = require('./api/router.user');
const adminRootRouter = require('./admin/router.admin');
const adminProductRouter = require('./admin/route.product');

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
  app.use('/product-manager', adminProductRouter);
};

module.exports = { init: initialApp };
