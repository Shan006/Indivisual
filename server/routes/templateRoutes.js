const express = require('express');
const router = express.Router();
const {
    createTemplate,
    getAllTemplates,
    getTemplateById,
    getTemplatesByCategory,
    updateTemplateById,
    deleteTemplateById,
    } = require('../controllers/templateController');

router.post('/createTemplate', createTemplate);

router.get('/getTemplates', getAllTemplates);

router.get('/getTemplate/:id', getTemplateById);

router.get('/getTemplateByCategory/:categoryId', getTemplatesByCategory);

router.put('/updateTemplate/:id', updateTemplateById);

router.delete('/deleteTemplate/:id', deleteTemplateById);

module.exports = router;
