const moviesController = require("../controller/moviesController");
const express = require("express");
const router = express.Router();

router.get("/", moviesController.getAllMovies);
router.get("/suggest", moviesController.suggestMovie);
router.get("/:id", moviesController.getMovieById);

router.post("/create", moviesController.createMovie);

router.patch("/update/:id", moviesController.updateMovieById);

router.delete("/delete", moviesController.deleteMovie);

module.exports = router;
