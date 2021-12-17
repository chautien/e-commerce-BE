const Router = require('express').Router();
const CommentController = require('../../app/controllers/controller.comment');

Router.get('/', CommentController.index);
Router.get('/:id', CommentController.detail);
Router.post('/add', CommentController.add);

module.exports = Router;
