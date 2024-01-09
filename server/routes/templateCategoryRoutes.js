const express = require('express');
const router = express.Router();
const {
    addTemplateCategory,
    getAllTemplateCategories,
    getTemplateCategoryById,
    deleteTemplateCategoryById,
  } = require('../controllers/templateCategoryController');

router.post('/createCategory', addTemplateCategory);
router.get('/getCategories', getAllTemplateCategories);
router.get('/getCategory/:id', getTemplateCategoryById);
router.delete('/deleteCategory/:id', deleteTemplateCategoryById);

module.exports = router;
