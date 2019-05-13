const express = require("express");
const router = express.Router();
const data = require("../data");

router.get("/my-profile", async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(403).render("unauthorized")
    return;
  } else {
      userData = req.session.userData;
      console.log('THIS IS THE USER DATA:', userData);

      // initializing user playlists to show on the profile
      userPlaylists = [];
      let favPlayListTmpObj = await data.playlists.getPlaylistById(userData.Favorites)
      let watchLaterPlayListTmpObj = await data.playlists.getPlaylistById(userData.WatchLater)
      userPlaylists.push(favPlayListTmpObj);
      userPlaylists.push(watchLaterPlayListTmpObj);

      // generating the recommendation
      let songs = await data.recommender.getRecommendedMusic(userData.FavoriteMusicGenres)

    console.log('RENDERING THIS PAGE:', songs);
    res.render("profile", {
      userData: req.session.userData,
      userPlaylists: userPlaylists,
      isLoggedInUserProfile: true
    });
  }
});

router.get("/:id", async (req, res) => {
    if (!req.session.loggedIn) {
      res.status(403).render("unauthorized")
      return;
    } else {
        const selectedUser = await data.users.getUserById(req.params.id);
      res.render("profile", {
        userData: selectedUser,
        isLoggedInUserProfile: false
      });
    }
  });

module.exports = router;
