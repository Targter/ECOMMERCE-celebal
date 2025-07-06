const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    console.log("dbUri:", process.env.DB_URI);
    const connectionInstance = await mongoose.connect(process.env.DB_URI);

    console.log(
      `✅ MongoDB connected! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
