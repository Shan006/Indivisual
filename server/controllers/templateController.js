const Template = require('../models/Template');
const cloudinary = require("cloudinary");

const createTemplate = async (req, res) => {
  try {
    const { category, dimensions, snapshot } = req.body;

    const uploadedSnapshot = await cloudinary.uploader.upload(snapshot, {
      folder: 'snapshot'
    });

    const uploadedDimensions = await Promise.all(
      dimensions.map(async (dimension) => {
        const uploaded = await cloudinary.uploader.upload(dimension.file, {
          folder: 'template_images'
        });

        return {
          publicId: uploaded.public_id,
          url: uploaded.secure_url,
          height: dimension.height,
          width: dimension.width,
          left: dimension.left,
          top: dimension.top,
          rotation: dimension.rotation
        };
      })
    );

    const newTemplate = new Template({
      category,
      dimensions: uploadedDimensions,
      snapshot: {
        publicId: uploadedSnapshot.public_id,
        url: uploadedSnapshot.secure_url
      }
    });

    const savedTemplate = await newTemplate.save();
    res.status(201).json(savedTemplate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find().populate('category');
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findById(id).populate('category');
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTemplatesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const templates = await Template.find({ category: categoryId });

    if (!templates || templates.length === 0) {
      return res.status(404).json({ message: 'No templates found for this category' });
    }

    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, dimensions, snapshot } = req.body;

    let updatedSnapshot = {};
    if (snapshot) {
      const uploadedSnapshot = await cloudinary.uploader.upload(snapshot, {
        folder: 'snapshot'
      });

      updatedSnapshot = {
        publicId: uploadedSnapshot.public_id,
        url: uploadedSnapshot.secure_url
      };
    }

    const updatedDimensions = await Promise.all(
      dimensions.map(async (dimension) => {
        if (dimension.file) {
          const uploaded = await cloudinary.uploader.upload(dimension.file, {
            folder: 'template_images'
          });

          return {
            publicId: uploaded.public_id,
            url: uploaded.secure_url,
            height: dimension.height,
            width: dimension.width,
            left: dimension.left,
            top: dimension.top,
            rotation: dimension.rotation
          };
        }

        return {
          publicId: dimension.publicId,
          url: dimension.url,
          height: dimension.height,
          width: dimension.width,
          left: dimension.left,
          top: dimension.top,
          rotation: dimension.rotation
        };
      })
    );

    const updatedTemplate = await Template.findByIdAndUpdate(
      id,
      { category, dimensions: updatedDimensions, snapshot: updatedSnapshot },
      { new: true }
    ).populate('category');

    if (!updatedTemplate) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.status(200).json(updatedTemplate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTemplate = await Template.findByIdAndDelete(id);
    if (!deletedTemplate) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  getTemplatesByCategory,
  updateTemplateById,
  deleteTemplateById,
};
