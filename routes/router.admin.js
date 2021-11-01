const Router = require('express').Router();

Router.get('/', (req, res) => {
  res
    .status(200)
    .json({ status: true, message: 'Welcome to admin', user: req.user });
});

module.exports = Router;
