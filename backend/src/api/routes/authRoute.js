const express = require('express');
const router = express.Router();

const requireAuth = require("../middlewares/authMiddleware");
const validation = require("../middlewares/validationMiddleware");
const userSchema = require('../validations/UserValidation');
const authController = require('../controllers/authController');

router.get('/signup', authController.signup_get);
router.post('/signup', validation(userSchema), authController.signup_post);
router.get('/login', requireAuth, authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout);


module.exports = router;