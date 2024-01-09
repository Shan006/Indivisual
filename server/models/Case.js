const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: String, required: true },
  phoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phone',
    required: true,
  },
  description: { type: String, required: true },
  image: {
    publicId: String, // Public ID from Cloudinary
    url: String,     // URL of the image
  },
});

module.exports = mongoose.model('Case', caseSchema);
