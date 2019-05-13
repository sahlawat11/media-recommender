const express = require("express");
const router = express.Router();
const data = require("../data");


router.get("/:id", async (req, res) => {
    if (!req.session.loggedIn) {
      res.status(403).render("unauthorized")
      return;
    } else {
        const playlist =await data.playlists.getPlaylistById(req.params.id);
       
        // for(i=0; i<playlist.Media.length; i++) {
        //     if(users[i]._id.toString() === req.params.id.toString()) {
        //         userData = users[i];
        //     }
        // }
       // console.log('THIS IS THE Playlist DATA:', playlist.Media);
        res.render("playlist", {PlaylistName:playlist.Name,
          Media: playlist.Media,
          isLoggedInUserProfile: true
      });
    }
  });

module.exports = router;
