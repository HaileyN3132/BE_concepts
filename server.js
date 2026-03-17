const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 3500;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
//Router Import
const movies = require("./routes/movies");
app.use("/movies", movies);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
