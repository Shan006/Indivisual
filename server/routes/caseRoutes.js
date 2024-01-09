const express = require('express');
const router = express.Router();
const {
    createCase,
    getAllCases,
    getCaseById,
    getCaseByPhoneID,
    updateCaseById,
    deleteCaseById,
  } = require('../controllers/caseController');

router.post('/createCase', createCase);

router.get('/getCases', getAllCases);

router.get('/getCase/:id', getCaseById);

router.get('/getPhoneCase/:phoneId', getCaseByPhoneID);

router.put('/updateCase/:id', updateCaseById);

router.delete('/deleteCase/:id', deleteCaseById);

module.exports = router;
