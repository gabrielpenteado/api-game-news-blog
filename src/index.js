const express = require("express");
const app = express();

require('dotenv').config();

const router = require("./routes/router")

const cors = require("cors");

app.use(cors());

app.use(express.json());

// DB Connection
const connectDatabase = require("./database/db");
connectDatabase();

// Routes
app.use("/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})