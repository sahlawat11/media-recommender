const express = require("express");
const router = express.Router();
const data = require("../data");

router.get("/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(403).render("unauthorized")
    return;
  } else {
      console.log('THIS IS THE PLAYLIST:', req.params.id);
      playlistInfo = await data.playlists.getPlaylistById(req.params.id);
      console.log('THIS IS THE DATA:', playlistInfo);
      playlistInfo.Media = playlistInfo.Media.reverse();
      res.render("playlist", {
          playlistInfo: playlistInfo
      });
  }
});

router.post("/:id", async (req, res) => {
    let registrationData = req.body;
    let error;
    let hashedPass;

    songObj = {
        name: req.body.name,
        artist: req.body.artistName,
        artistUrl: req.body.artistUrl,
        previewUrl: req.body.previewUrl
    }

    newObj = await data.playlists.addToPlaylist(songObj, req.params.id);
    newObj.Media = newObj.Media.reverse();
    res.render("playlist", {
        playlistInfo: newObj
    });
  });

module.exports = router;
