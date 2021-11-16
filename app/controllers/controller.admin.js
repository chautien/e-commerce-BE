const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/model.user');

class AdminController {
  async getHome(req, res) {
    res.status(200).render('template/');
  }
  async getLogin(req, res) {
    if (req.cookies.access_token) {
      try {
        const decoded = jwt.verify(
          req.cookies.access_token,
          process.env.TOKEN_KEY
        );
        if (decoded) return res.status(200).redirect('/');
      } catch (error) {
        return res.status(200).render('template/auth/login', {
          message:
            'Token đã hết hạn hoặc đã bị chỉnh sửa, vui lòng đăng nhập lại!',
        });
      }
    } else {
      res.status(200).render('template/auth/login', { message: '' });
    }
  }
  async getRegister(req, res) {
    res.status(200).render('template/auth/register');
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        return res.status(400).render('template/auth/login', {
          message: 'Vui lòng điền đầy đủ các trường',
        });
      }

      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(400).render('template/auth/login', {
          message: 'Username hoặc password không đúng!',
        });
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
        return res
          .cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          })
          .redirect('/');
      }
      return res.status(400).render('template/auth/login', {
        message: 'Username hoặc password không đúng!',
      });
    } catch (error) {
      return res.status(400).render('template/auth/login', {
        message: error.message,
      });
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
    return res.status(200).clearCookie('access_token').redirect('/');
  }
}

module.exports = new AdminController();
