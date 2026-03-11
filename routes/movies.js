const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();

//These 2 lines below are require to parse data in the request body
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//DataPath
const dataPath = path.join(__dirname, "../data/movies.json");

//GET
router.get("/", (req, res) => {
  fs.readFile(dataPath, "utf-8", (err, data) => {
    res.send(JSON.parse(data));
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(`ID = ${id}`);
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

//POST
router.post("/", (req, res) => {
  const movieId = crypto.randomUUID();
  const movieName = req.body.name;

  // Read from DB
  fs.readFile(dataPath, (err, data) => {
    const movieList = JSON.parse(data);
    // Add new movie into array movies
    movieList.push({ id: movieId, name: movieName });

    fs.writeFile(dataPath, JSON.stringify(movieList), () => {
      res.send("Successfully added new movie!");
    });
  });
});

//PUT
router.put("/:id", (req, res) => {
  const targetId = req.params.id;
  // Get newName from request body
  const newName = req.body.name;

  fs.readFile(dataPath, (err, data) => {
    const movieList = JSON.parse(data);
    const index = movieList.findIndex((movie) => movie.id === targetId);
    //Modify the movie data
    movieList[index] = { ...movieList[index], name: newName };
    fs.writeFile(dataPath, JSON.stringify(movieList), () => {
      res.send(`Movie with id ${targetId} has change its name to ${newName}`);
    });
  });
});

// DELETE

// Only use for testing purpose
router.delete("/1stMovie", (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    const moviesList = JSON.parse(data);
    const movieRemoved = moviesList.shift();

    fs.writeFile(dataPath, JSON.stringify(moviesList), () => {
      res.send(`Movie ${movieRemoved.name} removed!`);
    });
  });
});

router.delete("/:id", (req, res) => {
  const idRemove = req.params.id;
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

// Must export to be use !!!
module.exports = router;
