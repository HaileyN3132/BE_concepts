const express = require("express");
const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");
const app = express();
const PORT = 3500;

//These 2 lines below are require to parse data in the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DataPath
const dataPath = path.join(__dirname, "data", "movies.json");

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});

app.get("/", (req, res) => {
  console.log("Access Home page");
  res.send("Response from Home Page");
});

app.get("/movies", (req, res) => {
  fs.readFile(dataPath, "utf-8", (err, data) => {
    res.send(JSON.parse(data));
  });
});

app.get("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  fs.readFile(dataPath, "utf-8", (err, data) => {
    const movies = JSON.parse(data);

    const target = movies.find((movie) => movie.id === id);
    if (target) {
      res.send(target);
      return;
    }
    // Handle error
    res.send("Error! Invalid id !!!");
  });
});

/* POST */
app.post("/movies", (req, res) => {
  const movieId = req.body.id;
  const movieName = req.body.name;

  // Read from DB
  fs.readFile(dataPath, (err, data) => {
    const movieList = JSON.parse(data);
    // Add new movie into array movies
    movieList.push({ id: Number(movieId), name: movieName });

    fs.writeFile(dataPath, JSON.stringify(movieList), () => {
      res.send("Successfully added new movie!");
    });
  });
});

/* DELETE */
app.delete("/movies/:id", (req, res) => {
  const idRemove = Number(req.params.id);
  console.log(idRemove);
  fs.readFile(dataPath, (err, data) => {
    const moviesList = JSON.parse(data);
    const index = moviesList.findIndex((element) => element.id === idRemove);
    console.log(index);
    // perform remove
    const removeArr = moviesList.splice(index, 1);

    fs.writeFile(dataPath, JSON.stringify(moviesList), () => {
      res.send(`Movie ${removeArr[0].name} removed!`);
    });
  });
});
