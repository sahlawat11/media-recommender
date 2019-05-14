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
  async function getAllMovies(){
    return movies().then(movieCollection => {
      return movieCollection.find({}).toArray();
    });
  }

  async function getMovieByImdbId(id) {
    return movies().then(movieCollection => {
        return movieCollection.find({ MovieId: id });
      });
  }

  module.exports={
      addMovies,
      searchMovieByName,
      getAllMovies,
      getMovieByImdbId
  }
