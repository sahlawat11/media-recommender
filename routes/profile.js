const express = require("express");
const router = express.Router();
const data = require("../data");

router.get("/my-profile", async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(403).render("unauthorized")
    return;
  } else {
      userData = req.session.userData;

      // initializing user playlists to show on the profile
      userPlaylists = [];
      const favPlayListTmpObj = await data.playlists.getPlaylistById(userData.Favorites);
      const watchLaterPlayListTmpObj = await data.playlists.getPlaylistById(userData.WatchLater);
      userPlaylists.push(favPlayListTmpObj);
      userPlaylists.push(watchLaterPlayListTmpObj);
      // generating the recommendation
      const recommendedSong = await data.recommender.getRecommendedMusic(userData.FavoriteMusicGenres);
      const recommendedMovie = await data.recommender.getRecommendedMovie(userData.FavoriteMovieGenres);

      if(req.session.userData.sendEmail) {
        req.session.userData.sendEmail = false;
        await data.recommender.sendRecommendationEmail(res, recommendedSong, userData.Email, "Music");
        await data.recommender.sendRecommendationEmail(res, recommendedMovie, userData.Email, "Movie");
      }

    res.render("profile", {
      userData: req.session.userData,
      userPlaylists: userPlaylists,
      recommendedSong: recommendedSong,
      recommendedMovie: recommendedMovie,
      isLoggedInUserProfile: true
    });
  }
});

router.get("/:id", async (req, res) => {
    if (!req.session.loggedIn) {
      res.status(403).render("unauthorized")
      return;
    } else {
      let userPlaylists = [];
        const selectedUser = await data.users.getUserById(req.params.id);
        const favPlayListTmpObj = await data.playlists.getPlaylistByObjectId(selectedUser.Favorites);
      const watchLaterPlayListTmpObj = await data.playlists.getPlaylistByObjectId(selectedUser.WatchLater);
      userPlaylists.push(favPlayListTmpObj);
      userPlaylists.push(watchLaterPlayListTmpObj);
      res.render("profile", {
        userData: selectedUser,
        isLoggedInUserProfile: false,
        userPlaylists: userPlaylists
      });
    }
  });

module.exports = router;
