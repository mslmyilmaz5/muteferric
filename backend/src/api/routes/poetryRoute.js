const express = require('express');



const validation = require("../middlewares/validationMiddleware")
const poetrySchema = require('../validations/PoetryValidation')
const poetryController = require('../controllers/poetryController');
const requireAuth = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/son-yazilar', poetryController.getLatestPoetries);
router.get('/son-siirler', poetryController.getLatestEssays);
router.get('/ara', poetryController.searchPoems);
router.get('/',poetryController.getPoetries);
router.get('/gorunur-siirler',poetryController.getVisiblePoetries);
router.get('/database-bilgi',poetryController.getDatabaseInfo);
router.get('/:id',poetryController.getPoetry);

router.use(requireAuth); 
router.post('/paylas', validation(poetrySchema), poetryController.registerPoetry);
router.delete('/:id', poetryController.deletePoetry);
router.put('/guncelle/:id', validation(poetrySchema), poetryController.updatePoetry);


module.exports = router;