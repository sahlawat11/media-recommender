const omdb = require("./omdb");
const spotify = require("./spotify");

/**
 * Example to use the functions in omdb.js
 */
const omdbRunner = async () => {
  // Grab the first show of the list
  const id = await omdb.getByIdByName("House", 0);
  console.log(id);
};

const trackIdCallback = async res => {
  console.log(res);
};

/**
 * Example to use the Spotify functions in spotify.js
 * @param {function} res
 */
const trackCallback = async res => {
  console.log(res.tracks.items);
  const trackId = res.tracks.items[0].id;
  console.log(trackId);
  const trackInfo = await spotify.getByTrackId(trackId, trackIdCallback);
};

const artistIdCallback = async res => {
  console.log(res);
};

/**
 * Example to use the Spotify functions in spotify.js
 * @param {function} res
 */
const artistCallback = async res => {
  const artistId = res.artists.items[0].id;
  console.log(artistId);
  const artistInfo = await spotify.getByArtistId(artistId, artistIdCallback);
};

/**
 * Example to use the Spotify functions in spotify.js
 * @param {function} res
 */
const recsCallback = async res => {
  console.log(res);
};

// Runner for the Spotify and IMDB APIs
const main = async () => {
  //const res = await spotify.searchByTrack("Nonstop", trackCallback);
  //const spot = await spotify.searchByArtist("Drake", artistCallback);
  //omdbRunner();
  const recs = await spotify.getRecs(recsCallback, "EDm");
};

module.exports = {
  main
};
