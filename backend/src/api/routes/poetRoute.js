const express = require('express');
const router = express.Router();

const poetController = require("../controllers/poetController");

router.get('/getAllPoets', poetController.getAllPoets);
router.get('/getLastPoets', poetController.getLastPoets);
router.get('/dbinfo',poetController.getDatabaseInfo);
router.get('/:id', poetController.getPoet);
router.put('/update/aboutOne/:id', poetController.updateAboutOne);
router.post('/registerPoet', poetController.registerPoet);
router.post('/registerPoem', poetController.registerPoem)

module.exports = router;