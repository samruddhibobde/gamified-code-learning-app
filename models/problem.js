const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  difficulty: {
    type: String,
    required: [true, "Difficulty is required"],
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy",
  },
  xp: {
    type: Number,
    required: [true, "XP is required"],
    default: 100,
  },
  tags: {
    type: [String],
    required: [true, "Tags are required"],
  },
  starterCode: {
    python: String,
    javascript: String,
    cpp: String,
    java: String,
    c: String,
  },
  testCases: [{
    input: String,
    expectedOutput: String,
  }],
  attempts: {
    type: Number,
    default: 0,
  },
  successRate: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Problem", problemSchema);
