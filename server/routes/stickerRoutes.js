const express = require('express');
const router = express.Router();
const { addStickers , getAllStickers } = require('../controllers/stickersController');

router.post('/addStickers', addStickers);
router.get('/stickers', getAllStickers);


module.exports = router;
