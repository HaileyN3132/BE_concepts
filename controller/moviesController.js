const Movie = require("../model/Movie");

exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  const code = 200;

  res.status(code).json(movies);
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
    res.status(404).json({ message: "ERROR: Movie title CAN'T  EMPTY " });
  }

  if (newMovie.personalRating < 0 || newMovie.personalRating > 5) {
    res.status(404).json({ message: "ERROR: Invalid rating  " });
  }

  const movie = await Movie.create(newMovie);
  res.status(201).json(movie);
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
