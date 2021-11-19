const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const productSchema = new Schema(
  {
    _id: ObjectId,
    name: String,
    option: [
      {
        _id: { type: ObjectId },
        price: { type: Number },
        unit: { type: String },
        value: { type: String },
      },
    ],
    color: [{ id: { type: ObjectId }, name: { type: String } }],
    discount: { type: Number, default: 0 },
    flash_sale: { type: Boolean, default: false },
    flash_sale_until: { type: Date, default: Date.now() },
    view: { type: Number, default: 0 },
    brand: { type: ObjectId, ref: 'brand' },
    category: {
      type: ObjectId,
      ref: 'category',
    },
    thumbnail: { type: String },
    product_image: [],
    banner_image: { type: String },
    specification: { type: ObjectId, ref: 'specification' },
    article: { type: String },
  },
  { timestamps: { createdAt: 'created_at' }, collection: 'product' }
);

module.exports = model('product', productSchema);
