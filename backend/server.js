require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const searchedList = require("./routes/trending.route");

const conn = mongoose.connect(process.env.MONGODB_URI);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Routes
app.use("/trending", searchedList);

app.listen(port, (req, res) => {
  console.log(`Backend is running on port: ${port}`);
});
