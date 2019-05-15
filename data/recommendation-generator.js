const spotifyRecommender = require("../external-api/spotify");
const omdbRecommender = require("../external-api/omdb");

let globalRecommendedSongObj;
let globalRecommendedMovieObj;
let globalSongSearchObj;

async function recommendedMusicCallback(body) {
  globalRecommendedSongObj = body;
}

async function getRecommendedMusic(genres) {
  const recommenderSongs = await spotifyRecommender.getRecs(
    genres,
    recommendedMusicCallback
  );
  let resultingTrack;
  let promise = new Promise(function(resolve, reject) {
    setInterval(() => {
      if (typeof globalRecommendedSongObj !== "undefined") {
        resultingTrack = {
          name: globalRecommendedSongObj.tracks[0].name,
          artist: {
            name: globalRecommendedSongObj.tracks[0].artists[0].name,
            artistUrl:
              globalRecommendedSongObj.tracks[0].artists[0].external_urls
                .spotify
          },
          previewUrl: globalRecommendedSongObj.tracks[0].preview_url
        };
        resolve(resultingTrack);
      }
    }, 2000);
  });
  return promise;
}

async function recommendedSearchMusicCallback(body) {
  globalSongSearchObj = body.tracks;
}

async function getSearchedMusic(searchQuery) {
  const searchedSongs = await spotifyRecommender.searchByTrack(
    searchQuery,
    recommendedSearchMusicCallback
  );
  let resultingTracks;
  let result;
  let promise = new Promise(function(resolve, reject) {
    setInterval(() => {
      if (typeof globalSongSearchObj !== "undefined") {
        for (i = 0; i < globalSongSearchObj.length; i++) {
          track = {
            name: globalSongSearchObj[i].name,
            previewUrl: globalSongSearchObj[i].previewUrl,
            artist: {
              name: globalSongSearchObj[i].artists[0].name,
              artistUrl: globalSongSearchObj[i].artists[0].external_urls.spotify
            }
          };
          if (typeof result === "undefined") {
            result = [];
          }
          resultingTracks = resultingTracks.concat([track]);
        }
        result = resultingTracks;
        resolve(result);
      }
    }, 2000);
  });
  return promise;
}

async function getRecommendedMovie(genres) {
  const recommendedMovie = await omdbRecommender.getRecs(genres);
  return recommendedMovie;
}

async function sendRecommendationEmail(response, recommendationObj, email, mediaType) {
  if(typeof email === 'undefined') {
    return;
  }
  let emailBodyOptions;
  if(mediaType === 'Music') {
    emailBodyOptions = {
      to: email, // Send to. This can be a comma delimited string just like a normal email to field.
      subject: "We have a new recommendation for you!", // Email subject
      isMusic: true,
      Title: recommendationObj.name,
      Artist: recommendationObj.artist.name,
      ArtistLink: recommendationObj.artist.artistUrl
    }
  } else {
    console.log(recommendationObj)
    emailBodyOptions = {
      to: email, // Send to. This can be a comma delimited string just like a normal email to field.
      subject: "We have a new recommendation for you!", // Email subject
      isMusic: false,
      Title: recommendationObj.title + ', ' + recommendationObj.year,
      Director: recommendationObj.Director,
      IMDBRating: recommendationObj.imdbRating + '/10', //5 or 10
      Actors: recommendationObj.Actors
    }
  }

  response.mailer.send(
    "email",
    emailBodyOptions,
    function(err) {
      if (err) {
        return;
      }
    }
  );
}

module.exports = {
  getRecommendedMusic,
  getRecommendedMovie,
  getSearchedMusic,
  globalSongSearchObj,
  sendRecommendationEmail
};
