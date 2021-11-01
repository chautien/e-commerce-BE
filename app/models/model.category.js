const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    name: String,
  },
  { timestamps: { createdAt: 'created_at' }, collection: 'category' }
);

module.exports = model('category', categorySchema);
