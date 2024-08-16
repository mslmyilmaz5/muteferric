const express = require('express');
const router = express.Router();
const userSchema = require('../validations/UserValidation');
const userController = require('../controllers/userController');



router.get('/:id', userController.getUser);
router.get('/userAbouts/:id', userController.getUserAbouts);
router.put('/update/aboutOne/:id', userController.updateAboutOne);
router.put('/update/aboutTwo/:id', userController.updateAboutTwo);

module.exports = router;

