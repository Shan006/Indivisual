const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  images: [{
    publicId: String, // Public ID from Cloudinary
    url: String,     // URL of the image
  }],
});

module.exports = mongoose.model('Phone', phoneSchema);
