const cloudinary = require("cloudinary");
const Phone = require('../models/Phone');

const createPhone = async (req, res) => {
  try {
    const { name, companyId, images } = req.body;

    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const uploaded = await cloudinary.uploader.upload(image.file, {
          folder: 'phone_images'
        });
        return { publicId: uploaded.public_id, url: uploaded.secure_url };
      })
    );

    const newPhone = new Phone({ name, companyId, images: uploadedImages });
    const savedPhone = await newPhone.save();
    res.status(201).json(savedPhone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePhoneById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, companyId, images } = req.body;

    let uploadedImages = [];

    if (images && images.length > 0) {
      uploadedImages = await Promise.all(
        images.map(async (image) => {
           // If there's a file, upload it to Cloudinary
          if (image.file) {
            const uploaded = await cloudinary.uploader.upload(image.file, {
              folder: 'phone_images'
            });
            return { publicId: uploaded.public_id, url: uploaded.secure_url };
          }else{
            // If there's no file, use the existing dimension data
            return {
              publicId: image.publicId,
              url: image.url
            }
          }
        })
      );
    }

    const updateData = { name, companyId };
    if (uploadedImages.length > 0) {
      updateData.images = uploadedImages;
    }

    const updatedPhone = await Phone.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedPhone) {
      return res.status(404).json({ message: 'Phone not found' });
    }

    res.status(200).json(updatedPhone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPhones = async (req, res) => {
  try {
    const phones = await Phone.find().populate('companyId');
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPhoneById = async (req, res) => {
  try {
    const { id } = req.params;
    const phone = await Phone.findById(id).populate('companyId');
    if (!phone) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    res.status(200).json(phone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPhoneByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;

    const phones = await Phone.find({ companyId });

    if (!phones || phones.length === 0) {
      return res.status(404).json({ message: 'No phones found for this company' });
    }

    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getImagesById = async (req, res) => {
  try {
    const { phoneId } = req.params;

    if (!phoneId) {
      return res.status(400).json({ message: 'Invalid phone ID' });
    }

    const phone = await Phone.findById(phoneId);

    if (!phone) {
      return res.status(404).json({ message: 'Phone not found' });
    }

    const images = phone.images;

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deletePhoneById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPhone = await Phone.findByIdAndDelete(id);
    if (!deletedPhone) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    res.status(200).json({ message: 'Phone deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPhone,
  getAllPhones,
  getPhoneById,
  getPhoneByCompanyId,
  updatePhoneById,
  getImagesById,
  deletePhoneById,
};

