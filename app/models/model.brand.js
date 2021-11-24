const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const brandSchema = new Schema(
  {
    _id: { type: ObjectId },
    name: String,
    slug: String,
    image: String,
  },
  { timestamps: { createdAt: 'created_at' }, collection: 'brand' }
);

module.exports = model('brand', brandSchema);
