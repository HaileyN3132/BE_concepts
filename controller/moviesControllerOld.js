const path = require("path");
const fs = require("fs");

// Data file - represent database
const dataPath = path.join(__dirname, "../data/movies.json");

exports.getMovies = (req, res) => {
  fs.readFile(dataPath, "utf-8", (err, data) => {
    res.send(JSON.parse(data));
  });
};

exports.getMovieById = (req, res) => {
  const id = req.params.id;
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
};

exports.createMovie = (req, res) => {
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
};

exports.updateMovie = (req, res) => {
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
};

exports.deleteMovie = (req, res) => {
  const idRemove = req.params.id;
  fs.readFile(dataPath, (err, data) => {
    const moviesList = JSON.parse(data);
    const index = moviesList.findIndex((element) => element.id === idRemove);

    // Perform remove
    const removeArr = moviesList.splice(index, 1);

    fs.writeFile(dataPath, JSON.stringify(moviesList), () => {
      res.send(`Movie ${removeArr[0].name} removed!`);
    });
  });
};
