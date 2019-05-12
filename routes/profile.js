const express = require("express");
const router = express.Router();
const data = require("../data");

router.get("/my-profile", async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(403).render("unauthorized")
    return;
  } else {
      console.log('THIS IS ANOTHER TEST:',req.session.userData);
    res.render("profile", {
      userData: req.session.userData,userPlaylist:req.session.userPlaylist
    });
  }
});

router.get("/:id", async (req, res) => {
    console.log('THIS HAS BEEN CALLED HERE', req.params);
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
        const playlists = data.playlists;
        let userPlaylist=userData.musicLists.concat(movieLists);
        for(i=0; i<userPlaylist.length; i++) {
          
          userPlaylist[i] = playlists.getPlaylistById(userPlaylist[i]);
          
      }
        console.log('THIS IS THE USER DATA:', userData);
      res.render("profile", {
        userData: userData,userPlaylist:userPlaylist
      });
    }
  });

module.exports = router;
