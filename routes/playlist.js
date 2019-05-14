const express = require("express");
const router = express.Router();
const data = require("../data");

async function isLoggedInUser(userData, playlistInfo) {
    let isLoggedInUser;
    if(playlistInfo.Owner === userData.Email) {
        isLoggedInUser = true;
    } else {
        isLoggedInUser = false;
    }
    return isLoggedInUser;
}

router.get("/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(403).render("unauthorized");
    return;
  } else {
    playlistInfo = await data.playlists.getPlaylistById(req.params.id);
    playlistInfo.Media = playlistInfo.Media.reverse();
    isPlaylistPublic = playlistInfo.Status === "public";
    isLoggedInUserObj = await isLoggedInUser(req.session.userData, playlistInfo);
    const hidePlaylist = !isPlaylistPublic && !isLoggedInUserObj;
    const isMusicPlaylist = playlistInfo.Type === 'music';
    res.render("playlist", {
      playlistInfo: playlistInfo,
      isPublic: isPlaylistPublic,
      isLoggedInUser: isLoggedInUserObj,
      hidePlaylist: hidePlaylist,
      isMusicPlaylist: isMusicPlaylist
    });
  }
});

router.get("/:id/import/favorites", async (req, res) => {
    if (!req.session.loggedIn) {
        res.status(403).render("unauthorized");
        return;
      } else {
        playlistInfo = await data.playlists.getPlaylistById(req.params.id);
        loggedInUserPlaylist = await data.playlists.getPlaylistById(req.session.userData.Favorites);
        loggedInUserPlaylistId = loggedInUserPlaylist._id.toString();
        updatedPlaylist = await data.playlists.addToPlaylist(playlistInfo.Media, loggedInUserPlaylistId);
        res.redirect("/playlist/"+loggedInUserPlaylistId);
      }
});

router.get("/:id/import/watchlater", async (req, res) => {
    if (!req.session.loggedIn) {
        res.status(403).render("unauthorized");
        return;
      } else {
        playlistInfo = await data.playlists.getPlaylistById(req.params.id);
        loggedInUserPlaylist = await data.playlists.getPlaylistById(req.session.userData.WatchLater);
        loggedInUserPlaylistId = loggedInUserPlaylist._id.toString();
        updatedPlaylist = await data.playlists.addToPlaylist(playlistInfo.Media, loggedInUserPlaylistId);
        res.redirect("/playlist/"+loggedInUserPlaylistId);
      }
});

router.get("/:id/private", async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(403).render("unauthorized");
    return;
  } else {
    let playlistStatus = await data.playlists.setPlaylistStatus(
      req.params.id,
      "private"
    );
    res.redirect("/playlist/"+req.params.id);
  }
});

router.get("/:id/public", async (req, res) => {
    if (!req.session.loggedIn) {
        res.status(403).render("unauthorized");
        return;
      } else {
        let playlistStatus = await data.playlists.setPlaylistStatus(
          req.params.id,
          "public"
        );
        res.redirect("/playlist/"+req.params.id);
      }
});

router.post("/:id", async (req, res) => {
  let mediaObj;
  if (typeof req.body.name !== "undefined") {
    mediaObj = {
      name: req.body.name,
      artist: req.body.artistName,
      artistUrl: req.body.artistUrl,
      previewUrl: req.body.previewUrl
    };
  } else if (typeof req.body.title !== "undefined") {
    mediaObj = [{
      poster: req.body.poster,
      title: req.body.title,
      year: req.body.year,
      director: req.body.director,
      rating: req.body.imdbRating,
      actors: req.body.actors
    }];
  }

  newObj = await data.playlists.addToPlaylist(mediaObj, req.params.id);
  newObj.Media = newObj.Media.reverse();

  console.log(newObj)
  res.render("playlist", {
    playlistInfo: newObj
  });
});

module.exports = router;
