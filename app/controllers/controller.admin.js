require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/model.user');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        return res
          .status(400)
          .json({ status: false, message: 'All input is required!' });
      }

      const user = await userModel.findOne({ email });

      if (!user) {
        return res
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
        console.log(
          '🚀 ~ file: controller.admin.js ~ line 46 ~ AuthController ~ login ~ user',
          user
        );
        return res
          .cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          })
          .redirect('/');
      }
      return res
        .status(400)
        .json({ status: false, message: 'Invalid Credentials' });
    } catch (error) {
      res.status(400).json({ status: false, error });
    }
  }
  async register(req, res) {
    try {
      const { firstName, lastName, email, password, role, image } = req.body;

      if (!(firstName && lastName && email && password && role && image)) {
        return res.status(400).json({ message: 'All input is required!' });
      }
      const existUser = await userModel.findOne({ email });
      if (existUser) {
        return res.status(400).json({ message: 'User email already exist!' });
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
      return res.status(200).json({ status: true, user });
    } catch (error) {
      return res.status(400).json({ status: false, error });
    }
  }
  async logout(req, res) {
    return res.clearCookie('access_token').redirect('/');
  }
}

module.exports = new AuthController();
