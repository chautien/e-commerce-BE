const jwt = require('jsonwebtoken');
const config = process.env;

const adminAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(
    '🚀 ~ file: adminAuth.js ~ line 6 ~ adminAuth ~ req.cookies',
    req.cookies
  );
  if (!token) {
    return res.redirect('/login');
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    console.log(
      '🚀 ~ file: adminAuth.js ~ line 11 ~ adminAuth ~ decoded',
      decoded
    );
    req.user = decoded;
    next();
  } catch {
    res.redirect('/login');
  }
};
module.exports = adminAuth;
