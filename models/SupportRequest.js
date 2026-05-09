const mongoose = require("mongoose");

const supportRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "User ID is required"]
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [200, "Title cannot exceed 200 characters"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    maxlength: [2000, "Description cannot exceed 2000 characters"]
  },
  category: {
    type: String,
    enum: ["Bug/Error", "Code not working", "Concept doubt", "Logic help", "Assignment help", "Project guidance", "Other"],
    required: [true, "Category is required"]
  },
  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending"
  },
  mentorResponse: {
    type: String,
    default: "",
    maxlength: [2000, "Response cannot exceed 2000 characters"]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("SupportRequest", supportRequestSchema);
