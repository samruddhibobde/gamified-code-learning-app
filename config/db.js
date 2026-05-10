const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Debug: MONGO_URI =", process.env.MONGO_URI);

  if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
    console.log("CONNECTED DATABASE NAME:", mongoose.connection.name);

  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;