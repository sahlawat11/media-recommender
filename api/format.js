const omdb = require("./omdb");
const spotify = require("./spotify");

/**
 * Example to use the functions in omdb.js
 */
const omdbRunner = async () => {
  const res = await omdb.getByName("House");
  // Grab the first show of the list
  console.log(res.Search[0]);
  const id = await omdb.getByIdByName("House", 0);
  console.log(id);
};

/**
 * Example to use the Spotify functions in spotify.js
 * @param {function} res 
 */
const trackCallback = async res => {
  console.log(res.tracks.items[0]);
};

/**
 * Example to use the Spotify functions in spotify.js
 * @param {function} res 
 */
const artistCallback = async res => {
    console.log(res.artists.items[0])
}

// Runner for the Spotify and IMDB APIs
const main = async () => {
  //const res = await spotify.searchByTrack("Nonstop", trackCallback);
  //const spot = await spotify.searchByArtist("Drake", artistCallback);
  //omdbRunner();
};

module.exports = {
  main
};
