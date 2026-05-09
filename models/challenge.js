const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
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
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  starterCode: {
    type: String,
    required: [true, "Starter code is required"],
  },
  correctAnswer: {
    type: String,
    required: [true, "Correct answer is required"],
  },
  testCases: [{
    input: String,
    output: String,
  }],
  language_id: {
    type: Number,
    required: [true, "Language ID is required"],
    default: 71, // Python 3
  },
  points: {
    type: Number,
    required: [true, "Points is required"],
    default: 10,
    min: 1,
  },
  hints: [{
    text: String,
    cost: Number,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model("Challenge", challengeSchema);
