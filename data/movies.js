const mongoCollections = require("../databaseConfig/mongoCollection");
const movies = mongoCollections.movies;

async function addMovies(info){
    const movieCollection = await movies();
        return movieCollection.insert(info);
}

async function searchMovieByName(name){
    return movies().then(movieCollection => {
        return movieCollection.findOne({ Name: name }).then(movie => {
          if (!movie) throw "Movie "+name+" not found";
          return movie;
        });
      });
}

module.exports={
      addMovies,
      searchMovieByName
}