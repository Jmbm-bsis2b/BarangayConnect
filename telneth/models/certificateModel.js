const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  resident: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  certificateType: { 
    type: String, 
    enum: ["barangay_clearance", "indigency", "residency", "business_permit", "other"],
    required: true 
  },
  purpose: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected", "issued"], 
    default: "pending" 
  },
  issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  issuedAt: { type: Date },
  rejectionReason: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Certificate", certificateSchema);

