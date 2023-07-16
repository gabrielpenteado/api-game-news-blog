const mongoose = require("mongoose");

require('dotenv').config();

const DATABASE_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@api.yvicmai.mongodb.net/?retryWrites=true&w=majority`

const connectDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Database connected successfully!");

  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = connectDatabase;