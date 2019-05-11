const keys = require("./keys/keys");
const request = require("request");

// Needed to fetch a Spotify API token
let authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(keys.spotifyId + ":" + keys.spotifySecret).toString(
        "base64"
      )
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
};

/**
 * Gets music from the Spotify API by song title
 * @param {string} title song title
 * @param {function} callback
 * @returns JSON of most relevant search results
 */
const searchByTrack = async (track, callback) => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url:
          "https://api.spotify.com/v1/search?q=" +
          track +
          "&type=track&market=US&limit=10&offset=5",
        headers: {
          Authorization: "Bearer " + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        callback(body);
      });
    }
  });
  return;
};

/**
 * Gets music from the Spotify API by song artist
 * @param {string} artist song artist
 * @param {function} callback
 * @returns JSON of most relevant search results
 */
const searchByArtist = async (artist, callback) => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url:
          "https://api.spotify.com/v1/search?q=" +
          artist +
          "&type=artist&market=US&limit=10&offset=5",
        headers: {
          Authorization: "Bearer " + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        callback(body);
      });
    }
  });
  return;
};

/**
 * Gets music from the Spotify API by artist ID
 * @param {string} artist song artist
 * @param {function} callback
 * @returns JSON of most relevant search results
 */
const getByTrackId = async (trackId, callback) => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: "https://api.spotify.com/v1/tracks/" + trackId,
        headers: {
          Authorization: "Bearer " + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        callback(body);
      });
    }
  });
  return;
};

/**
 * Gets music from the Spotify API by artist ID
 * @param {string} artistId song artist ID
 * @param {function} callback
 * @returns JSON of artist info
 */
const getByArtistId = async (artistId, callback) => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: "https://api.spotify.com/v1/artists/" + artistId,
        headers: {
          Authorization: "Bearer " + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        callback(body);
      });
    }
  });
  return;
};

module.exports = {
  searchByTrack,
  searchByArtist,
  getByTrackId,
  getByArtistId
};
