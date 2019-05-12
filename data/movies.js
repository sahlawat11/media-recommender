const mongoCollections = require("../databaseConfig/mongoCollection");
const movies = mongoCollections.movies;

async function addMovies(info){
    const movieCollection = await movies();
        return movieCollection.insert(info);
  }  

  module.exports={
      addMovies
  }