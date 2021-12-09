const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    name: String,
    phone: String,
    address: String,
    email: String,
    node: String,
    cart: Array,
    priceTotal: Number,
    status: {type: String, default: "Chưa giao"}
  },
  { timestamps: true, collection: 'order' }
);

module.exports = model('order', orderSchema);
