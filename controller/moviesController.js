const handleResponse = require("../utils/response");
const Movie = require("../model/Movie");

exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  if (movies.length === 0)
    handleResponse.sendSuccess(res, 200, movies, "Movie list is empty!");
  handleResponse.sendSuccess(res, 200, movies);
};

exports.createMovie = async (req, res) => {
  const newMovie = {
    isFavorite: req.body.isFavorite,
    title: req.body.title,
    titleCustom: req.body.titleCustom,
    personalRating: Number(req.body.personalRating),
    note: req.body.note,
  };
  // Perform validation
  if (newMovie.title === "") {
    handleResponse.sendError(
      res,
      400,
      undefined,
      "INPUT_ERROR",
      "Title cannot be empty",
    );
  }

  if (newMovie.personalRating < 0 || newMovie.personalRating > 5) {
    handleResponse.sendError(
      res,
      400,
      undefined,
      "INPUT_ERROR",
      "Invalid rating, enter number (0-5)",
    );
  }

  const movie = await Movie.create(newMovie);
  handleResponse.sendSuccess(res, 201, movie, `Movie "${movie}" added!`);
};

exports.updateMovie = async (req, res) => {
  const result = Movie.findOneAndUpdate(
    { title: req.body.title },
    { title: req.body.newTitle },
  ).exec();
  res.send(result);
};

exports.deleteMovie = async (req, res) => {
  const result = await Movie.deleteOne({ title: req.body.title }).exec();
  res.json(result);
};
