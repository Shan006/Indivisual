const mongoose = require('mongoose');

const stickerSchema = new mongoose.Schema({
    fileName: String,
});

module.exports = mongoose.model('Sticker', stickerSchema);
