require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = 3500;

//Connect to MongoDB
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// ✅ MUST be here (before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Router Import
//const movies = require("./routes/moviesOld");  /* OLD */
const movies = require("./routes/movies");
app.use("/movies", movies);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
  });
});
