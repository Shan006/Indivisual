const mongoose = require('mongoose');

const templateCategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
});

module.exports = mongoose.model('TemplateCategory', templateCategorySchema);
