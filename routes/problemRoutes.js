const express = require("express");
const router = express.Router();
const Problem = require("../models/problem");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/problems - Get all problems
router.get("/", authMiddleware, async (req, res) => {
  try {
    console.log("Fetching all problems");
    
    const problems = await Problem.find().sort({ createdAt: 1 });
    
    res.json({
      message: "Problems fetched successfully",
      problems,
      count: problems.length
    });
  } catch (error) {
    console.error("Fetch problems error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/problems/:id - Get single problem
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    console.log(`Fetching problem with ID: ${req.params.id}`);
    
    const problem = await Problem.findById(req.params.id);
    
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    
    res.json({
      message: "Problem fetched successfully",
      problem
    });
  } catch (error) {
    console.error("Fetch problem error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/problems - Create new problem
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("Creating new problem");
    
    const { title, description, difficulty, tags } = req.body;
    
    // Validate required fields
    if (!title || !description || !difficulty || !tags) {
      return res.status(400).json({ 
        message: "Title, description, difficulty, and tags are required" 
      });
    }
    
    const problem = new Problem({
      title,
      description,
      difficulty,
      tags,
      starterCode: req.body.starterCode || {},
      testCases: req.body.testCases || [],
      xp: req.body.xp || 100
    });
    
    await problem.save();
    
    console.log(`Problem "${problem.title}" created successfully`);
    
    res.status(201).json({
      message: "Problem created successfully",
      problem
    });
  } catch (error) {
    console.error("Create problem error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
