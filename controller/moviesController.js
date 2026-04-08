const handleResponse = require("../utils/response");
const Movie = require("../model/Movie");

exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  if (movies.length === 0) {
    handleResponse.sendSuccess(res, 200, movies, "Movie list is empty!");
  } else {
    handleResponse.sendSuccess(res, 200, movies);
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const targetId = req.params.id;
    const movie = await Movie.findById(targetId).exec();
    handleResponse.sendSuccess(res, 200, movie);
  } catch (error) {
    console.log(` ${error}`);
  }
};

exports.createMovie = async (req, res) => {
  const newMovie = {
    isFavorite: req.body.isFavorite,
    title: req.body.title,
    titleCustom: req.body.titleCustom,
    personalRating: Number(req.body.personalRating),
    note: req.body.note,
  };

  try {
    const movie = await Movie.create(newMovie);
    handleResponse.sendSuccess(res, 201, movie, `Movie "${movie}" added!`);
  } catch (error) {
    if (newMovie.title === "") {
      handleResponse.sendError(
        res,
        400,
        undefined,
        error.name,
        "Title cannot be empty",
      );
    }
  }
};

exports.updateMovie = async (req, res) => {
  const result = Movie.findOneAndUpdate(
    { title: req.body.title },
    { title: req.body.newTitle },
  ).exec();
  res.send(result);
};

exports.deleteMovie = async (req, res) => {
  const result = await Movie.deleteOne({ _id: req.body.id }).exec();
  res.json(result);
};
