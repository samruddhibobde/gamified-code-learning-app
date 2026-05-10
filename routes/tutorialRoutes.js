const express = require("express");
const router = express.Router();
const Tutorial = require("../models/tutorial");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/tutorials - Get all tutorials
router.get("/", async (req, res) => {
  try {

    console.log("Fetching all tutorials");
    console.log("MONGOOSE DB NAME:", Tutorial.db.name);
    console.log("MONGOOSE COLLECTION:", Tutorial.collection.name);
    const tutorials = await Tutorial.find().sort({ createdAt: 1 });

    console.log("TUTORIAL COUNT:", tutorials.length);
    console.log("TUTORIAL DATA:", tutorials);

    res.json({
      message: "Tutorials fetched successfully",
      tutorials,
      count: tutorials.length
    });

  } catch (error) {
    console.error("Fetch tutorials error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tutorials/complete - Mark tutorial as completed
router.post("/complete", authMiddleware, async (req, res) => {
  try {
    const { tutorialId } = req.body;
    
    // Validate tutorialId
    if (!tutorialId) {
      return res.status(400).json({ message: "Tutorial ID is required" });
    }

    console.log(`User ${req.user.id} completing tutorial: ${tutorialId}`);

    // Check if tutorial exists
    const tutorial = await Tutorial.findById(tutorialId);
    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" });
    }

    // Use $addToSet to add tutorialId to user.completedTutorials (avoids duplicates)
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { completedTutorials: tutorialId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`Tutorial "${tutorial.title}" marked as completed by user ${user.email}`);

    res.json({
      message: "Tutorial marked as completed",
      tutorialId,
      tutorialTitle: tutorial.title,
      completedTutorials: user.completedTutorials,
      totalCompleted: user.completedTutorials.length
    });
  } catch (error) {
    console.error("Complete tutorial error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
