const Router = require('express').Router();
const CommentController = require('../../app/controllers/controller.comment');

Router.get('/', CommentController.index);
Router.get('/:id', CommentController.detail);

module.exports = Router;
