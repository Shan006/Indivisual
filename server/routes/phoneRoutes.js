const express = require('express');
const router = express.Router();
const {
  createPhone,
  getAllPhones,
  getPhoneById,
  getPhoneByCompanyId,
  updatePhoneById,
  getImagesById,
  deletePhoneById,
} = require('../controllers/phoneController');

router.post('/createPhone', createPhone);

router.put('/updatePhone/:id', updatePhoneById);

router.get('/getPhones', getAllPhones);

router.get('/getPhone/:id', getPhoneById);

router.get('/getPhoneByCompany/:companyId', getPhoneByCompanyId);

router.get('/getImages/:phoneId', getImagesById);

router.delete('/deletePhone/:id', deletePhoneById);

module.exports = router;
