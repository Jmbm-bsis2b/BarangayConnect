const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  zone: { type: [String], default: [] }, // If empty, applies to all zones
  status: { 
    type: String, 
    enum: ["planning", "ongoing", "completed", "cancelled"], 
    default: "planning" 
  },
  budget: { type: Number, default: 0 },
  startDate: { type: Date },
  endDate: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);

