const mongoCollections = require("../databaseConfig/mongoCollection");
const movies = mongoCollections.movies;

async function addMovies(info){
    const movieCollection = await movies();
        return movieCollection.insert(info);
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
      getAllMovies,
      getMovieByImdbId
  }