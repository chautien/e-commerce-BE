const router = require('express').Router();
const adminController = require('../../app/controllers/controller.admin');
const adminAuth = require('../../middlewares/adminAuth');

// Get method
router.get('/', adminAuth, adminController.getHome);
router.get('/login', adminController.getLogin);
router.get('/register', adminController.getRegister);
router.get('/logout', adminController.logout);

// Post method
router.post('/login', adminController.login);
router.post('/register', adminController.register);

// Put method

// Delete method

module.exports = router;
