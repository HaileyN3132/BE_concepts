const Movie = require("../model/Movie");

exports.getAllMovies = async (req, res) => {
  const movie = await Movie.find();
  res.json(movie);
};

exports.createMovie = async (req, res) => {
  await Movie.create({ title: req.body.title });
  res.send(`Movie  added!`);
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
