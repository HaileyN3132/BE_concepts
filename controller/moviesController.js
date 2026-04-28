const handleResponse = require("../utils/response");
const Movie = require("../model/Movie");
const API_KEY = process.env.TMDB_API_KEY;

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
    tmdb: req.body.tmdb,
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

exports.updateMovieById = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const result = await Movie.findByIdAndUpdate(id, updatedData);

    handleResponse.sendSuccess(res, 200, result, "OK");
  } catch (error) {
    console.error(error);
  }
};

exports.deleteMovie = async (req, res) => {
  const result = await Movie.deleteOne({ _id: req.body.id }).exec();
  res.json(result);
};

exports.suggestMovie = async (req, res) => {
  const query = req.query.title;
  const response = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );

  const result = await response.json();
  console.log(result); // Testing
  res.send(result.results);
};
