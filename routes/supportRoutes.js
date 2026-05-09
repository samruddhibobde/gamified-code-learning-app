const express = require("express");
const router = express.Router();
const SupportRequest = require("../models/SupportRequest");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

console.log("Support routes loaded successfully");

// ================= GET REQUEST INFO (for debugging) =================
router.get("/request", (req, res) => {
  res.json({
    message: "This endpoint only accepts POST requests",
    usage: "POST /api/support/request with body: { title: 'string', description: 'string', category: 'Bug/Error' }",
    categories: ["Bug/Error", "Code not working", "Concept doubt", "Logic help", "Assignment help", "Project guidance", "Other"],
    requiredHeaders: ["Authorization: Bearer <token>"]
  });
});

// ================= CREATE REQUEST =================
router.post("/request", authMiddleware, async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ 
        message: "All fields are required",
        required: ["title", "description", "category"]
      });
    }

    const supportRequest = new SupportRequest({
      userId: req.user.id,
      title,
      description,
      category,
      status: "pending"
    });

    await supportRequest.save();

    res.status(201).json({
      message: "Support request created successfully",
      request: supportRequest
    });

  } catch (error) {
    console.error("Create support request error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ================= GET MY REQUESTS =================
router.get("/my-requests", authMiddleware, async (req, res) => {
  try {
    const requests = await SupportRequest.find({ userId: req.user.id })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      message: "My requests fetched",
      requests
    });

  } catch (error) {
    console.error("Get my requests error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ================= GET ALL REQUESTS (MENTOR/ADMIN ONLY) =================
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user || (user.role !== "mentor" && user.role !== "admin")) {
      return res.status(403).json({ message: "Access denied. Mentor or Admin required." });
    }

    const requests = await SupportRequest.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      message: "All support requests fetched",
      requests
    });

  } catch (error) {
    console.error("Get all requests error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ================= RESOLVE REQUEST (MENTOR ONLY) =================
router.patch("/resolve/:id", authMiddleware, async (req, res) => {
  try {
    const { response } = req.body;
    const { id } = req.params;

    if (!response) {
      return res.status(400).json({ message: "Response is required" });
    }

    const user = await User.findById(req.user.id);
    
    if (!user || user.role !== "mentor") {
      return res.status(403).json({ message: "Access denied. Mentor required." });
    }

    const supportRequest = await SupportRequest.findById(id);

    if (!supportRequest) {
      return res.status(404).json({ message: "Support request not found" });
    }

    supportRequest.status = "resolved";
    supportRequest.mentorResponse = response;

    await supportRequest.save();

    res.json({
      message: "Support request resolved successfully",
      request: supportRequest
    });

  } catch (error) {
    console.error("Resolve request error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
