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
    let mediaObj;
    if(typeof req.body.name !== 'undefined') {
        mediaObj = {
            name: req.body.name,
            artist: req.body.artistName,
            artistUrl: req.body.artistUrl,
            previewUrl: req.body.previewUrl
        }
    } else if(typeof req.body.title !== 'undefined') {
        mediaObj = {
            poster: req.body.poster,
            title: req.body.title,
            year: req.body.year,
            director: req.body.director,
            rating: req.body.imdbRating,
            actors: req.body.actors
        }
    }
    console.log('THE MOVIE HAS BEEN ADDED:', mediaObj, req.body);

    newObj = await data.playlists.addToPlaylist(mediaObj, req.params.id);
    newObj.Media = newObj.Media.reverse();
    res.render("playlist", {
        playlistInfo: newObj
    });
  });

module.exports = router;
