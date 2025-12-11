const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Public to authenticated users
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Admin only routes
router.post('/', roleMiddleware('admin'), createProject);
router.put('/:id', roleMiddleware('admin'), updateProject);
router.delete('/:id', roleMiddleware('admin'), deleteProject);

module.exports = router;

