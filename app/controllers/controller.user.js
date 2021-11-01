require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/model.user');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        res
          .status(400)
          .json({ status: false, message: 'All input is required!' });
      }

      const user = await userModel.findOne({ email });

      if (!user) {
        res
          .status(400)
          .json({ status: false, message: 'Email is not existed!' });
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          {
            user_id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email,
            role: user.role,
            image: user.image,
          },
          process.env.TOKEN_KEY,
          { expiresIn: '2h' }
        );
        user.token = token;
        res.status(200).json({ status: true, user });
      }
      res.status(400).json({ status: false, message: 'Invalid Credentials' });
    } catch (error) {
      res.status(400).json({ status: false, error });
    }
  }
  async register(req, res) {
    try {
      const { firstName, lastName, email, password, role, image } = req.body;

      if (!(firstName && lastName && email && password && role && image)) {
        res.status(400).json({ message: 'All input is required!' });
      }
      const existUser = await userModel.findOne({ email });
      if (existUser) {
        res.status(400).json({ message: 'User email already exist!' });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await userModel.create({
        firstName,
        lastName,
        email,
        password: encryptedPassword,
        role,
        image,
      });
      const token = jwt.sign(
        {
          user_id: user._id,
          firstName,
          lastName,
          email,
          role,
          image,
        },
        process.env.TOKEN_KEY,
        { expiresIn: '2h' }
      );
      user.token = token;
      res.status(200).json({ status: true, user });
    } catch (error) {
      res.status(400).json({ status: false, error });
    }
  }
}

module.exports = new AuthController();
