const productRouter = require('./router.product');
const authRouter = require('./router.user');
const adminRouter = require('./router.admin');
const auth = require('../middlewares/auth');
const categoryRouter = require('./router.category');
const commentRouter = require('./router.comment');

const initialApp = (app) => {
  // User router
  app.use('/', authRouter);

  // Product router
  app.use('/api', productRouter);
  app.use('/api/category', categoryRouter);

  // Admin router
  app.use('/admin', auth, adminRouter);

  // Comment router

  app.use('/api/comment', commentRouter);
};

module.exports = { init: initialApp };
