const mongoose = require('mongoose');

const dimensionSchema = new mongoose.Schema({
    publicId: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        required: true,
    },
    left: {
        type: String,
        required: true,
    },
    top: {
        type: String,
        required: true,
    },
    rotation: {
        type: String,
        required: true,
    },
});

const templateSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TemplateCategory',
        required: true,
    },
    dimensions: [dimensionSchema],
    snapshot : {
        publicId: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }
});

module.exports = mongoose.model('Template', templateSchema);
