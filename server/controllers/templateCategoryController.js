const TemplateCategory = require('../models/TemplateCategory');

const addTemplateCategory = async (req, res) => {
  const { categoryName } = req.body;
  try {
    const newCategory = new TemplateCategory({ categoryName });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTemplateCategories = async (req, res) => {
  try {
    const categories = await TemplateCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTemplateCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await TemplateCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTemplateCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await TemplateCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addTemplateCategory,
  getAllTemplateCategories,
  getTemplateCategoryById,
  deleteTemplateCategoryById,
};
