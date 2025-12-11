const express = require('express');
const router = express.Router();
const {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificateStatus,
  deleteCertificate
} = require('../controllers/certificateController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Public to authenticated users
router.post('/', createCertificate);
router.get('/', getCertificates);
router.get('/:id', getCertificateById);
router.delete('/:id', deleteCertificate);

// Admin only routes
router.put('/:id/status', roleMiddleware('admin'), updateCertificateStatus);

module.exports = router;

