const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/library-management';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      family: 4,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error(' MongoDB connection error:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;