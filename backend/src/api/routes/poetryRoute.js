const express = require('express');



const validation = require("../middlewares/validationMiddleware")
const poetrySchema = require('../validations/PoetryValidation')
const poetryController = require('../controllers/poetryController');
const requireAuth = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/getLastPoems', poetryController.getLatestPoetries);
router.get('/getLastEssays', poetryController.getLatestEssays);
router.get('/search', poetryController.searchPoems);
router.get('/',poetryController.getPoetries);
router.get('/v',poetryController.getVisiblePoetries);
router.get('/dbinfo',poetryController.getDatabaseInfo);
router.get('/:id',poetryController.getPoetry);

router.use(requireAuth); // use this middleware before all routes below
router.post('/post', validation(poetrySchema), poetryController.registerPoetry);
router.delete('/:id', poetryController.deletePoetry);
router.put('/update/:id', validation(poetrySchema), poetryController.updatePoetry);


module.exports = router;