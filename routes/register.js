const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/profile/my-profile");
  } else {
    res.render("register");
  }
});

router.post("/", async (req, res) => {
  let registrationData = req.body;
  let error;
  let hashedPass;
  const users = await data.users.getAllUsers();

  if (registrationData.password1 !== registrationData.password2) {
    return;
  }

  for(i=0; i<users.length; i++) {
    console.log('this is it:', users[i]);
    if(users[i].Email === registrationData.email) {
      error = "User with this email already exist";
    }
  }
  if(typeof error !== 'undefined') {
  bcrypt.hash(registrationData.password1, 8, async function(err, hash) {
    hashedPass = hash;

    const newUserObj = {
      FirstName: registrationData.fname,
      LastName: registrationData.lname,
      Email: registrationData.email,
      Gender: registrationData.gender,
      Location: registrationData.location,
      Age: registrationData.age,
      HashedPassword: hashedPass,
      FavoriteMusicGenres:
        typeof registrationData.musicGenre === "undefined"
          ? []
          : [].concat(registrationData.musicGenre),
      FavoriteMovieGenres:
        typeof registrationData.movieGenre === "undefined"
          ? []
          : [].concat(registrationData.movieGenre),
      Favorites: "",
      MusicLists: [],
      MovieLists: [],
      WatchLater: ""
    };

    const newFavPlaylistObj = {
      Name: "Favorites",
      Type: "music",
      Owner: registrationData.email,
      Status: "public",
      Media: []
    };
    const newWatchLaterPlaylistObj = {
      Name: "Watch Later",
      Type: "movies",
      Owner: registrationData.email,
      Status: "public",
      Media: []
    };
    const newFavsPlaylist = await data.playlists.addPlayList(newFavPlaylistObj);
    const newWatchLaterPlaylist = await data.playlists.addPlayList(
      newWatchLaterPlaylistObj
    );
    newUserObj.Favorites = newFavsPlaylist._id;
    newUserObj.WatchLater = newWatchLaterPlaylist._id;
    const createdUser = await data.users.registration(newUserObj);
    newUser = Object.assign({}, createdUser);
    req.session.loggedIn = true;
    const tmp_user_obj = newUser;
    delete tmp_user_obj.hashedPassword;
    req.session.userData = tmp_user_obj;
    res.redirect("/profile/my-profile");
  });
}

  if (error) {
    res.status(401).render("register"),
      {
        error: error,
        hasErrors: true,
      };
    return;
  }
});

module.exports = router;
