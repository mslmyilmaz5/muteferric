const express = require('express');
const router = express.Router();

const poetController = require("../controllers/poetController");

router.get('/getAllPoets', poetController.getAllPoets); // Correct route
router.get('/:id', poetController.getPoet);
router.post('/registerPoet', poetController.registerPoet);
router.post('/registerPoem', poetController.registerPoem)

module.exports = router;