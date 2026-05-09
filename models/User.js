const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  role: {
    type: String,
    enum: ["learner", "mentor", "admin"],
    default: "learner",
  },
  bio: {
    type: String,
    default: "",
    trim: true,
  },
  points: {
    type: Number,
    default: 0,
    min: 0,
  },
  level: {
    type: Number,
    default: 1,
    min: 1,
  },
  solvedProblems: {
    type: Number,
    default: 0,
    min: 0,
  },
  completedTutorials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial'
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);