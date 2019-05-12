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
 * Gets music from the Spotify API by track and artist
 * @param {string} query string to search for
 * @param {function} callback
 * @returns JSON of most relevant search results
 */
const search = async (query, callback) => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url:
          "https://api.spotify.com/v1/search?q=" +
          query +
          "&type=track%2Cartist&market=US&limit=10",
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
          "&type=track&market=US&limit=10",
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
          "&type=artist&market=US&limit=10",
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

/**
 * Gets music recommendations from the Spotify API by genres
 * @param {function} callback
 * @param {string} genres genres to search for recommendations
 * @returns JSON of artist info
 */
const getRecs = async (callback, ...genres) => {
  if (typeof genres === undefined) throw `Undefined argument`;
  if (!(genres instanceof Array)) throw `Invalid argument`;
  if (genres.length < 1 || genres.length > 10)
    throw `Wrong number of arguments`;

  // List of viable genres to search, provided by Spotify API
  const genreObj = {
    genres: [
      "acoustic",
      "afrobeat",
      "alt-rock",
      "alternative",
      "ambient",
      "anime",
      "black-metal",
      "bluegrass",
      "blues",
      "bossanova",
      "brazil",
      "breakbeat",
      "british",
      "cantopop",
      "chicago-house",
      "children",
      "chill",
      "classical",
      "club",
      "comedy",
      "country",
      "dance",
      "dancehall",
      "death-metal",
      "deep-house",
      "detroit-techno",
      "disco",
      "disney",
      "drum-and-bass",
      "dub",
      "dubstep",
      "edm",
      "electro",
      "electronic",
      "emo",
      "folk",
      "forro",
      "french",
      "funk",
      "garage",
      "german",
      "gospel",
      "goth",
      "grindcore",
      "groove",
      "grunge",
      "guitar",
      "happy",
      "hard-rock",
      "hardcore",
      "hardstyle",
      "heavy-metal",
      "hip-hop",
      "holidays",
      "honky-tonk",
      "house",
      "idm",
      "indian",
      "indie",
      "indie-pop",
      "industrial",
      "iranian",
      "j-dance",
      "j-idol",
      "j-pop",
      "j-rock",
      "jazz",
      "k-pop",
      "kids",
      "latin",
      "latino",
      "malay",
      "mandopop",
      "metal",
      "metal-misc",
      "metalcore",
      "minimal-techno",
      "movies",
      "mpb",
      "new-age",
      "new-release",
      "opera",
      "pagode",
      "party",
      "philippines-opm",
      "piano",
      "pop",
      "pop-film",
      "post-dubstep",
      "power-pop",
      "progressive-house",
      "psych-rock",
      "punk",
      "punk-rock",
      "r-n-b",
      "rainy-day",
      "reggae",
      "reggaeton",
      "road-trip",
      "rock",
      "rock-n-roll",
      "rockabilly",
      "romance",
      "sad",
      "salsa",
      "samba",
      "sertanejo",
      "show-tunes",
      "singer-songwriter",
      "ska",
      "sleep",
      "songwriter",
      "soul",
      "soundtracks",
      "spanish",
      "study",
      "summer",
      "swedish",
      "synth-pop",
      "tango",
      "techno",
      "trance",
      "trip-hop",
      "turkish",
      "work-out",
      "world-music"
    ]
  };

  // Build string from inputs
  let genreString = "";
  for (let i = 0; i < genres.length - 1; i++) {
    if (genreObj.genres.includes(genres[i])) {
      genreString += genres[i] + "%2C";
    }
  }
  genreString += genres[genres.length - 1];

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url:
          "https://api.spotify.com/v1/recommendations?limit=10&market=US&seed_genres=" +
          genreString,
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
  search,
  searchByTrack,
  searchByArtist,
  getByTrackId,
  getByArtistId,
  getRecs
};
