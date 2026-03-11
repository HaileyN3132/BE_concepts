const moviesController = require("../controller/moviesController");

const fs = require("fs");
const express = require("express");
const router = express.Router();

//These 2 lines below are require to parse data in the request body
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//GET

router.get("/", moviesController.getMovies);

router.get("/:id", moviesController.getMovieById);

//POST
router.post("/", moviesController.createMovie);

//PUT
router.put("/:id", moviesController.updateMovie);

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

router.delete("/:id", moviesController.deleteMovie);

// Must export to be use !!!
module.exports = router;
