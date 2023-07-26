const mongoose = require("mongoose");

require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

const connectDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Database connected successfully!");

  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = connectDatabase;