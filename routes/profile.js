const express = require("express");
const router = express.Router();
const data = require("../data");

router.get("/my-profile", async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(403).render("unauthorized")
    return;
  } else {
      userData = req.session.userData;
      userPlaylists = [];
      let favPlayListTmpObj = await data.playlists.getPlaylistById(userData.Favorites)
      let watchLaterPlayListTmpObj = await data.playlists.getPlaylistById(userData.WatchLater)
      userPlaylists.push(favPlayListTmpObj);
      userPlaylists.push(watchLaterPlayListTmpObj);

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
