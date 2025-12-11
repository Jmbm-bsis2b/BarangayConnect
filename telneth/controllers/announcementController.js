const Announcement = require('../models/announcementModle');

// Create announcement (Admin only)
const createAnnouncement = async (req, res) => {
  try {
    const { title, content, zone, priority, status } = req.body;

    const announcement = new Announcement({
      title,
      content,
      author: req.user._id,
      zone: zone || [],
      priority: priority || 'medium',
      status: status || 'draft'
    });

    await announcement.save();
    await announcement.populate('author', 'name email');

    res.status(201).json({ message: 'Announcement created successfully', announcement });
  } catch (error) {
    res.status(500).json({ message: 'Error creating announcement', error: error.message });
  }
};

// Get all announcements
const getAnnouncements = async (req, res) => {
  try {
    const { status, zone, priority } = req.query;
    const filter = {};

    // Filter by status (default: published)
    if (status) {
      filter.status = status;
    } else {
      filter.status = 'published';
    }

    // Filter by zone if user is resident
    if (req.user.role === 'resident' && req.user.zone.length > 0) {
      filter.$or = [
        { zone: { $in: req.user.zone } },
        { zone: { $size: 0 } } // Empty zone means all zones
      ];
    }

    // Filter by priority
    if (priority) {
      filter.priority = priority;
    }

    const announcements = await Announcement.find(filter)
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements', error: error.message });
  }
};

// Get announcement by ID
const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('author', 'name email');

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcement', error: error.message });
  }
};

// Update announcement (Admin only)
const updateAnnouncement = async (req, res) => {
  try {
    const { title, content, zone, priority, status } = req.body;

    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, content, zone, priority, status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('author', 'name email');

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json({ message: 'Announcement updated successfully', announcement });
  } catch (error) {
    res.status(500).json({ message: 'Error updating announcement', error: error.message });
  }
};

// Delete announcement (Admin only)
const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting announcement', error: error.message });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement
};

