const spotifyRecommender = require("../external-api/spotify");

async function getRecommendedMusic(genres) {
    const recommenderSongs = await spotifyRecommender.getRecs(genres);

    // console.log('THESE ARE THE SONGS RECEIVED:', recommenderSongs);
    setTimeout(() => {
      testitem = window.localStorage.getItem("testItem");
      console.log('THESE ARE THE SONGS RECEIVED:', testitem);
      
    }, 2000);
    const resultingTrack = {
      name: recommenderSongs[0].name,
      artist: {
        name: recommenderSongs[0].artist[0].name,
        artistUrl: recommenderSongs[0].artist[0].external_urls.spotify
      },
      previewUrl: recommenderSongs[0].preview_url
    }
    
}

module.exports={
  getRecommendedMusic
}
