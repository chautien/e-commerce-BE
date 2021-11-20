const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const productSchema = new Schema(
  {
    _id: { type: ObjectId, auto: true },
    name: String,
    option: [
      {
        _id: { type: String },
        price: { type: Number },
        unit: { type: String },
        value: { type: String },
      },
    ],
    color: [
      {
        _id: { type: String },
        name: { type: String },
      },
    ],
    discount: { type: Number, default: 0 },
    flash_sale: { type: Boolean, default: false },
    flash_sale_until: { type: Date, default: Date.now() },
    view: { type: Number, default: 0 },
    brand: { type: String },
    category: {
      type: String,
    },
    thumbnail: { type: String },
    product_image: [String],
    banner_image: { type: String },
    specification: [[String]],
    article: { type: String },
    slug: { type: String },
  },
  { timestamps: { createdAt: 'created_at' }, collection: 'product' }
);

module.exports = model('product', productSchema);
