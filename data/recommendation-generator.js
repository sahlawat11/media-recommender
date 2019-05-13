const spotifyRecommender = require("../external-api/spotify");

async function getRecommendedMusic(genres) {
    const recommenderSongs = await spotifyRecommender.getRecs(genres);
    console.log('THESE ARE THE SONGS RECEIVED:', recommenderSongs);
}

module.exports={
  getRecommendedMusic
}
