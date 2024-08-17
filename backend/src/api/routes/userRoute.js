const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/getLastUsers', userController.getLastUsers);
router.get('/dbinfo',userController.getDatabaseInfo);
router.get('/:id', userController.getUser);

router.get('/userAbouts/:id', userController.getUserAbouts);
router.put('/update/aboutOne/:id', userController.updateAboutOne);
router.put('/update/aboutTwo/:id', userController.updateAboutTwo);

module.exports = router;

