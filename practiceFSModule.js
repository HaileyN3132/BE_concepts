//const express = require("express");
//const app = express();

const path = require("path");
const fs = require("fs");
const { error } = require("console");

const PORT = 3500;

const moviesPath = path.join(__dirname, "data", "movies.json");

fs.readFile(moviesPath, "utf-8", (err, data) => {
  //Handle file error
  if (err) {
    console.error("Error READING FILE:", err);
    return;
  }
  console.log(JSON.parse(data));
});

fs.writeFile("./moviesData.txt", "TEsting writeFile", () => {
  console.log("Finish writing! Now executing appendFile()");
  fs.appendFile("./moviesData.txt", "\nAppending  new information", () => {
    console.log("Finished whole process !!!");
  });
});

// Testing Express

//app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
