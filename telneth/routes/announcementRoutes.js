const express = require('express');
const router = express.Router();
const {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement
} = require('../controllers/announcementController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Public to authenticated users
router.get('/', getAnnouncements);
router.get('/:id', getAnnouncementById);

// Admin only routes
router.post('/', roleMiddleware('admin'), createAnnouncement);
router.put('/:id', roleMiddleware('admin'), updateAnnouncement);
router.delete('/:id', roleMiddleware('admin'), deleteAnnouncement);

module.exports = router;

