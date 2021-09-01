const productRouter = require('./product.router');
const authRouter = require('./auth.router');
const adminRouter = require('./admin.router');
const auth = require('../middlewares/auth');

const initialApp = (app) => {
  app.use('/api', productRouter);
  app.use('/', authRouter);
  app.use('/admin', auth, adminRouter);
};

module.exports = { init: initialApp };
