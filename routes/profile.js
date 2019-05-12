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
        const users = data.users;
        let userData;
        for(i=0; i<users.length; i++) {
            if(users[i]._id.toString() === req.params.id.toString()) {
                userData = users[i];
            }
        }
      //   const playlists = data.playlists;
      //   let userPlaylist=userData.musicLists.concat(movieLists);
      //   for(i=0; i<userPlaylist.length; i++) {
          
      //     userPlaylist[i] = playlists.getPlaylistById(userPlaylist[i]);
          
      // }
        console.log('THIS IS THE USER DATA:', userData);
        const selectedUser = await data.users.getUserById(req.params.id);
        res.render("profile", {
          userData: selectedUser,
          isLoggedInUserProfile: false
      });
    }
  });

module.exports = router;
