const mongoose = require('mongoose');
require('dotenv').config();

try {
  mongoose.connect(process.env.DB_HOST);
  console.log('Connect successfully😊');
} catch (error) {
  console.log('Connect failure😢', error);
}

module.exports = { connect: mongoose };
