const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  videoUrl: {
    type: String,
    required: [true, "Video URL is required"],
    trim: true,
  },
  duration: {
    type: String,
    required: [true, "Duration is required"],
    trim: true,
  },
  level: {
    type: String,
    required: [true, "Level is required"],
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Tutorial", tutorialSchema);
