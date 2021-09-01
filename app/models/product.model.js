const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const productSchema = new Schema(
  {
    name: String,
    category: {
      type: ObjectId,
      ref: 'category',
    },
    code: String,
    rating: Number,
    price: Number,
    description: String,
    image: String,
  },
  { timestamps: { createdAt: 'created_at' }, collection: 'product' }
);

module.exports = model('product', productSchema);
