const commentModel = require('../models/model.comment');

class CommentController {
  // [GET] get all comments
  index = async (req, res) => {
    try {
      const comment = await commentModel.find();
      res.status(200).json({ status: false, comment });
    } catch (error) {
      res.status(502).json({ status: false, error });
    }
  };

  detail = async (req, res) => {
    try {
      const { id: productId } = req.params;
      const productComment = await commentModel.find({ product: productId });
      res.status(200).json({ message: true, productComment });
    } catch (error) {
      res.status(502).json({ status: false, error });
    }
  };
}

module.exports = new CommentController();
