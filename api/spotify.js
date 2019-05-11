const keys = require("./keys/keys");
const request = require("request");

// Needed to fetch a Spotify API token
let authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(keys.spotifyId + ":" + keys.spotifySecret).toString("base64")
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
};

/**
 * Gets music from the Spotify API by song title
 * @param {string} title song title
 * @returns JSON of most relevant search results
 */
const getByTitle = async title => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: "https://api.spotify.com/v1/search?q=" + title + "&type=track&market=US&limit=10&offset=5",
        headers: {
          Authorization: "Bearer " + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log(body);
      });
    }
  });
};

/**
 * Gets music from the Spotify API by song artist
 * @param {string} artist song artist
 * @returns JSON of most relevant search results
 */
const getByArtist = async artist => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: "https://api.spotify.com/v1/users/jmperezperez",
        headers: {
          Authorization: "Bearer " + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log(body);
      });
    }
  });
};

module.exports = {
  getByTitle,
  getByArtist
};
