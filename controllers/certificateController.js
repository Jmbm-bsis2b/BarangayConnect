const Certificate = require('../models/certificateModel');
const User = require('../models/userModel');

// Create certificate request
const createCertificate = async (req, res) => {
  try {
    const { certificateType, purpose } = req.body;

    const certificate = new Certificate({
      resident: req.user._id,
      certificateType,
      purpose,
      status: 'pending'
    });

    await certificate.save();
    await certificate.populate('resident', 'name email zone');

    res.status(201).json({ message: 'Certificate request created successfully', certificate });
  } catch (error) {
    res.status(500).json({ message: 'Error creating certificate request', error: error.message });
  }
};

// Get all certificates
const getCertificates = async (req, res) => {
  try {
    const { status, certificateType } = req.query;
    const filter = {};

    // Residents can only see their own certificates
    if (req.user.role === 'resident') {
      filter.resident = req.user._id;
    }

    // Admins can filter by status and type
    if (status) filter.status = status;
    if (certificateType) filter.certificateType = certificateType;

    const certificates = await Certificate.find(filter)
      .populate('resident', 'name email zone')
      .populate('issuedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificates', error: error.message });
  }
};

// Get certificate by ID
const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('resident', 'name email zone')
      .populate('issuedBy', 'name email');

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Check if resident is viewing their own certificate or is admin
    if (req.user.role === 'resident' && 
        certificate.resident._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificate', error: error.message });
  }
};

// Update certificate status (Admin only)
const updateCertificateStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;

    const updateData = {
      status,
      updatedAt: Date.now()
    };

    if (status === 'approved' || status === 'issued') {
      updateData.issuedBy = req.user._id;
      if (status === 'issued') {
        updateData.issuedAt = Date.now();
      }
    }

    if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('resident', 'name email zone')
      .populate('issuedBy', 'name email');

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.json({ message: 'Certificate status updated successfully', certificate });
  } catch (error) {
    res.status(500).json({ message: 'Error updating certificate', error: error.message });
  }
};

// Delete certificate
const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Check if resident is deleting their own certificate or is admin
    if (req.user.role === 'resident' && 
        certificate.resident.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting certificate', error: error.message });
  }
};

module.exports = {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificateStatus,
  deleteCertificate
};

