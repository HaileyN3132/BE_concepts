const moviesController = require("../controller/moviesController");
const express = require("express");
const router = express.Router();

router.get("/", moviesController.getAllMovies);

router.post("/create", moviesController.createMovie);

router.put("/update", moviesController.updateMovie);

router.delete("/delete", moviesController.deleteMovie);

module.exports = router;
