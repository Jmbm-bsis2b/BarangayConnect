const Project = require('../models/projectModel');

// Create project (Admin only)
const createProject = async (req, res) => {
  try {
    const { title, description, zone, status, budget, startDate, endDate, assignedTo } = req.body;

    const project = new Project({
      title,
      description,
      zone: zone || [],
      status: status || 'planning',
      budget: budget || 0,
      startDate,
      endDate,
      createdBy: req.user._id,
      assignedTo: assignedTo || []
    });

    await project.save();
    await project.populate('createdBy', 'name email');
    await project.populate('assignedTo', 'name email');

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const { status, zone } = req.query;
    const filter = {};

    if (status) filter.status = status;

    // Filter by zone if user is resident
    if (req.user.role === 'resident' && req.user.zone.length > 0) {
      filter.$or = [
        { zone: { $in: req.user.zone } },
        { zone: { $size: 0 } } // Empty zone means all zones
      ];
    }

    if (zone) filter.zone = { $in: [zone] };

    const projects = await Project.find(filter)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// Get project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};

// Update project (Admin only)
const updateProject = async (req, res) => {
  try {
    const { title, description, zone, status, budget, startDate, endDate, assignedTo } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, zone, status, budget, startDate, endDate, assignedTo, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project updated successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

// Delete project (Admin only)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};

