const express = require('express');
const router = express.Router();
const { addStickers , getAllStickers, deleteAll } = require('../controllers/stickersController');

router.post('/addStickers', addStickers);
router.get('/stickers', getAllStickers);
router.delete("/stickers",deleteAll)


module.exports = router;
