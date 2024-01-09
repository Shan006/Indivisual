const express = require('express');
const router = express.Router();
const {
    createCompany,
    getAllCompanies,
    getCompanyById,
    deleteCompanyById,
} = require("../controllers/companyController")

router.post('/createCompany', createCompany);

router.get('/getCompanies', getAllCompanies);

router.get('/getcompany/:id', getCompanyById);

router.delete('/deleteCompany/:id', deleteCompanyById);

module.exports = router;
