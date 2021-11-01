const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
    image: String,
    token: String,
  },
  { timestamps: { createdAt: 'created_at' }, collection: 'user' }
);

module.exports = model('user', userSchema);
