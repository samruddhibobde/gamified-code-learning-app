const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("REGISTER REQUEST BODY:", req.body);

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "learner",
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", email);

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: "User not found" });
    }

    // 🔥 IMPORTANT DEBUG
    console.log("Entered password:", password);
    console.log("Stored password:", user.password);

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Match result:", isMatch);

    if (!isMatch) {
      console.log("❌ Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("✅ Login success");
    console.log("🔥 User role from database:", user.role);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// ================= PROFILE =================
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    console.error("Profile error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// ================= ADD POINTS =================
router.post("/add-points", authMiddleware, async (req, res) => {
  try {
    const { points } = req.body;

    if (!points || typeof points !== "number") {
      return res.status(400).json({ message: "Invalid points" });
    }

    const user = await User.findById(req.user.id);

    user.points += points;
    user.solvedProblems += 1;
    user.level = Math.floor(user.points / 100) + 1;

    await user.save();

    res.json({
      message: "Points added",
      points: user.points,
      level: user.level,
      solvedProblems: user.solvedProblems,
    });

  } catch (error) {
    console.error("Points error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ================= LEADERBOARD =================
router.get("/leaderboard", authMiddleware, async (req, res) => {
  try {
    const users = await User.find()
      .select("name points level solvedProblems")
      .sort({ points: -1 })
      .limit(10);

    res.json({ message: "Leaderboard fetched", leaderboard: users });
  } catch (error) {
    console.error("Leaderboard error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ================= MY RANK =================
router.get("/rank", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const rank = await User.countDocuments({ points: { $gt: user.points } });
    res.json({ rank: rank + 1, points: user.points });
  } catch (error) {
    console.error("Rank error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ================= QUEST PROGRESS =================
router.get("/quest-progress", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const questProgress = [
      {
        id: 1,
        title: "First Steps",
        description: "Complete your first tutorial",
        type: "solo",
        difficulty: "Easy",
        xp: 50,
        progress: Math.min((user.completedTutorials?.length ?? 0) >= 1 ? 100 : 0, 100),
        completed: (user.completedTutorials?.length ?? 0) >= 1,
        unlocked: true,
      },
      {
        id: 2,
        title: "Problem Solver",
        description: "Solve your first coding challenge",
        type: "solo",
        difficulty: "Easy",
        xp: 100,
        progress: Math.min((user.solvedProblems ?? 0) >= 1 ? 100 : 0, 100),
        completed: (user.solvedProblems ?? 0) >= 1,
        unlocked: true,
      },
      {
        id: 3,
        title: "Tutorial Warrior",
        description: "Complete 5 tutorials",
        type: "solo",
        difficulty: "Medium",
        xp: 200,
        progress: Math.min(((user.completedTutorials?.length ?? 0) / 5) * 100, 100),
        completed: (user.completedTutorials?.length ?? 0) >= 5,
        unlocked: (user.completedTutorials?.length ?? 0) >= 1,
      },
      {
        id: 4,
        title: "Challenge Accepted",
        description: "Solve 5 coding challenges",
        type: "boss",
        difficulty: "Medium",
        xp: 300,
        progress: Math.min(((user.solvedProblems ?? 0) / 5) * 100, 100),
        completed: (user.solvedProblems ?? 0) >= 5,
        unlocked: (user.solvedProblems ?? 0) >= 1,
      },
      {
        id: 5,
        title: "Point Collector",
        description: "Earn 500 points",
        type: "solo",
        difficulty: "Medium",
        xp: 250,
        progress: Math.min(((user.points ?? 0) / 500) * 100, 100),
        completed: (user.points ?? 0) >= 500,
        unlocked: (user.points ?? 0) >= 100,
      },
      {
        id: 6,
        title: "Level Up!",
        description: "Reach level 5",
        type: "boss",
        difficulty: "Hard",
        xp: 500,
        progress: Math.min(((user.level ?? 1) / 5) * 100, 100),
        completed: (user.level ?? 1) >= 5,
        unlocked: (user.level ?? 1) >= 2,
      },
      {
        id: 7,
        title: "Tutorial Master",
        description: "Complete 10 tutorials",
        type: "solo",
        difficulty: "Hard",
        xp: 400,
        progress: Math.min(((user.completedTutorials?.length ?? 0) / 10) * 100, 100),
        completed: (user.completedTutorials?.length ?? 0) >= 10,
        unlocked: (user.completedTutorials?.length ?? 0) >= 5,
      },
      {
        id: 8,
        title: "Champion Coder",
        description: "Solve 10 coding challenges",
        type: "boss",
        difficulty: "Hard",
        xp: 600,
        progress: Math.min(((user.solvedProblems ?? 0) / 10) * 100, 100),
        completed: (user.solvedProblems ?? 0) >= 10,
        unlocked: (user.solvedProblems ?? 0) >= 5,
      },
    ];

    res.json({
      message: "Quest progress fetched",
      quests: questProgress,
      summary: {
        total: questProgress.length,
        completed: questProgress.filter(q => q.completed).length,
        totalXpAvailable: questProgress.reduce((sum, q) => sum + q.xp, 0),
        xpEarned: questProgress.filter(q => q.completed).reduce((sum, q) => sum + q.xp, 0),
      }
    });
  } catch (error) {
    console.error("Quest progress error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ================= MENTOR STATS =================
router.get("/mentor-stats", authMiddleware, async (req, res) => {
  try {
    const mentor = await User.findById(req.user.id).select("-password");
    if (!mentor) return res.status(404).json({ message: "User not found" });

    // Count all learners
    const totalStudents = await User.countDocuments({ role: "learner" });

    // Get top learners by points
    const topStudents = await User.find({ role: "learner" })
      .select("name points level solvedProblems completedTutorials createdAt")
      .sort({ points: -1 })
      .limit(10);

    // Get all tutorials from Tutorial model
    const Tutorial = require("../models/tutorial");
    const tutorials = await Tutorial.find().sort({ createdAt: -1 });

    res.json({
      message: "Mentor stats fetched",
      mentor: {
        name: mentor.name,
        email: mentor.email,
        role: mentor.role,
        bio: mentor.bio,
      },
      stats: {
        totalStudents,
        totalTutorials: tutorials.length,
        activeSessions: 0,
      },
      topStudents,
      tutorials,
    });
  } catch (error) {
    console.error("Mentor stats error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ================= SESSIONS =================
// In-memory sessions store (simple approach, no new model needed)
let sessions = [];

router.get("/sessions", authMiddleware, async (req, res) => {
  try {
    res.json({ message: "Sessions fetched", sessions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/sessions", authMiddleware, async (req, res) => {
  try {
    const { title, student, time } = req.body;
    if (!title || !student || !time) {
      return res.status(400).json({ message: "Title, student, and time are required" });
    }
    const session = {
      id: Date.now().toString(),
      title,
      student,
      time,
      status: "Scheduled",
      mentorId: req.user.id,
      createdAt: new Date().toISOString(),
    };
    sessions.push(session);
    res.status(201).json({ message: "Session created", session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/sessions/:id/complete", authMiddleware, async (req, res) => {
  try {
    const session = sessions.find(s => s.id === req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    session.status = "Completed";
    res.json({ message: "Session completed", session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;