const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Ensure you use async/await correctly
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

connectDB();
