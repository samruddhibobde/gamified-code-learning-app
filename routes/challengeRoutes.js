const express = require("express");
const router = express.Router();
const Challenge = require("../models/challenge");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const { executeCode } = require("../services/judge0Service");

// POST /api/challenges/run - Execute code
router.post("/run", async (req, res) => {
  try {
    const { source_code, language_id, stdin } = req.body;

    // Validate input
    if (!source_code || !language_id) {
      return res.status(400).json({ 
        message: "source_code and language_id are required" 
      });
    }

    // Execute code using Judge0 service
    const result = await executeCode(source_code, language_id, stdin);

    res.json({
      stdout: result.stdout || "",
      stderr: result.stderr || "",
      compile_output: result.compile_output || "",
      status: {
        id: result.status?.id,
        description: result.status?.description,
      },
      time: result.time,
      memory: result.memory,
    });
  } catch (error) {
    console.error("Code execution error:", error.message);
    res.status(500).json({ 
      message: "Failed to execute code",
      error: error.message 
    });
  }
});

// POST /api/challenges/submit - Submit challenge solution
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { challengeId, source_code, language_id, stdin } = req.body;

    // Validate input
    if (!challengeId || !source_code || !language_id) {
      return res.status(400).json({ 
        message: "challengeId, source_code, and language_id are required" 
      });
    }

    console.log(`User ${req.user.id} submitting challenge: ${challengeId}`);

    // Find challenge
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    // Execute code using Judge0 service
    const result = await executeCode(source_code, language_id, stdin);

    // Check if answer is correct
    const userOutput = (result.stdout || "").trim();
    const correctOutput = (challenge.correctAnswer || "").trim();
    const isCorrect = userOutput === correctOutput;

    let pointsEarned = 0;
    let message = "";

    if (isCorrect) {
      // Add points to user
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.points += challenge.points;
      user.solvedProblems += 1;
      user.level = Math.floor(user.points / 100) + 1;
      await user.save();

      pointsEarned = challenge.points;
      message = "Challenge completed successfully!";
      
      console.log(`User ${user.email} earned ${pointsEarned} points. Total: ${user.points}`);
    } else {
      message = "Incorrect answer. Try again!";
    }

    res.json({
      correct: isCorrect,
      output: userOutput,
      expectedOutput: correctOutput,
      pointsEarned,
      message,
      status: {
        id: result.status?.id,
        description: result.status?.description,
      },
      time: result.time,
      memory: result.memory,
    });
  } catch (error) {
    console.error("Challenge submission error:", error.message);
    res.status(500).json({ 
      message: "Failed to submit challenge",
      error: error.message 
    });
  }
});

// GET /api/challenges - Get all challenges
router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find().sort({ createdAt: 1 });
    res.json({
      message: "Challenges fetched successfully",
      challenges,
      count: challenges.length,
    });
  } catch (error) {
    console.error("Fetch challenges error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/challenges/:id - Get specific challenge
router.get("/:id", async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    res.json({
      message: "Challenge fetched successfully",
      challenge,
    });
  } catch (error) {
    console.error("Fetch challenge error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
