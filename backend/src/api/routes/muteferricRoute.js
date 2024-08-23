const express = require('express');
const router = express.Router();

const muteferricController = require("../controllers/muteferricController");

router.get('/getGeneralInfo', muteferricController.getGeneralInfo);
router.get('/getImage/:id', muteferricController.getImage);
router.post('/uploadImage', muteferricController.uploadImage);
router.put('/updateHomeText', muteferricController.updateHomeText);

module.exports = router;