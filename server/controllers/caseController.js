const Case = require('../models/Case');
const cloudinary = require("cloudinary");

const createCase = async (req, res) => {
  try {
    const { name, color, phoneId, description, image, price } = req.body;

    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: 'Cases',
    });

    const newCase = new Case({
      name,
      color,
      phoneId,
      description,
      image: {
        publicId: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      },
      price, // Add price to the new case
    });

    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const caseToUpdate = await Case.findById(id);
    if (!caseToUpdate) {
      return res.status(404).json({ message: 'Case not found' });
    }

    let updatedImage = caseToUpdate.image;
    if (req.body.image) {
      const uploadedImage = await cloudinary.uploader.upload(req.body.image, {
        folder: 'Cases',
      });

      updatedImage = {
        publicId: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      };
    }

    const updatedFields = {
      name: req.body.name || caseToUpdate.name,
      color: req.body.color || caseToUpdate.color,
      phoneId: req.body.phoneId || caseToUpdate.phoneId,
      description: req.body.description || caseToUpdate.description,
      image: updatedImage,
      price: req.body.price || caseToUpdate.price, // Add price to the updated fields
    };

    const updatedCase = await Case.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCases = async (req, res) => {
  try {
    const cases = await Case.find().populate("phoneId");
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const singleCase = await Case.findById(id).populate("phoneId");
    if (!singleCase) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.status(200).json(singleCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCaseByPhoneID = async (req, res) => {
  const { phoneId } = req.params;

  try {
    const cases = await Case.find({ phoneId: phoneId });

    console.log(cases);

    if (!cases || cases.length === 0) {
      return res.status(404).json({ message: 'Cases not found for this phone ID' });
    }

    res.status(200).json({ cases });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCaseById = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCase = await Case.findByIdAndDelete(id);
      if (!deletedCase) {
        return res.status(404).json({ message: 'Case not found' });
      }
      
      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(deletedCase.image.publicId);
      
      res.status(200).json({ message: 'Case deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};  

module.exports = {
  createCase,
  getAllCases,
  getCaseById,
  getCaseByPhoneID,
  updateCaseById,
  deleteCaseById,
};
