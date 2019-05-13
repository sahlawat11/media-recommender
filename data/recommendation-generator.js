const spotifyRecommender = require("../external-api/spotify");
const omdbRecommender = require("../external-api/omdb");

let globalRecommendedSongObj;
let globalRecommendedMovieObj;

async function recommendedMusicCallback(body) {
  globalRecommendedSongObj = body;
}

async function recommendedMovieCallback(body) {
  globalRecommendedMovieObj = body;
}

async function getRecommendedMusic(genres) {
    const recommenderSongs = await spotifyRecommender.getRecs(genres, recommendedMusicCallback);
    let resultingTrack;
  let promise = new Promise(function(resolve, reject) {
    setInterval(() => {
      if(typeof globalRecommendedSongObj !== 'undefined') {
        resultingTrack = {
          name: globalRecommendedSongObj.tracks[0].name,
          artist: {
            name: globalRecommendedSongObj.tracks[0].artists[0].name,
            artistUrl: globalRecommendedSongObj.tracks[0].artists[0].external_urls.spotify
          },
          previewUrl: globalRecommendedSongObj.tracks[0].preview_url
        }
        resolve(resultingTrack)
      }
    }, 2000);
  });
  return promise;    
}

async function getRecommendedMovie(genres) {
  const recommendedMovie = await omdbRecommender.getRecs(genres);
  console.log('********* movies:', recommendedMovie);
  return recommendedMovie;
}

module.exports={
  getRecommendedMusic,
  getRecommendedMovie
}
