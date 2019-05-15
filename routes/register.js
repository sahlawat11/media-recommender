const express = require("express");
const router = express.Router();
const data = require("../data");
const bcrypt = require("bcryptjs");
const xss = require("xss");

router.get("/", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/profile/my-profile");
  } else {
    res.render("register", {
      isNotLoggedIn: true
    });
  }
});

router.post("/", async (req, res) => {
  let registrationData = req.body;
  let error;
  let hashedPass;
  let hasEmailError = false;
  let hasPasswordMismatch = false;
  const users = await data.users.getAllUsers();
  registrationData.password1 = xss(registrationData.password1);
  registrationData.password2 = xss(registrationData.password2);
  if (registrationData.password1 !== registrationData.password2) {
    error = "Passwords do not match. Please enter again."
    hasPasswordMismatch = true;
  }
  if(typeof error === 'undefined') {
    registrationData.email = xss(registrationData.email);
  for(i=0; i<users.length; i++) {
    if(users[i].Email === registrationData.email) {
      error = "User with this email already exist";
      hasEmailError = true;
    }
  }
  }
  if(typeof error === 'undefined') {
  bcrypt.hash(registrationData.password1, 8, async function(err, hash) {
    hashedPass = hash;
    if(registrationData.gender === 'on') {
      registrationData.gender = 'Male';
    } else {
      registrationData.gender = 'Female';
    }
    if(typeof registrationData.musicGenre === 'undefined') {
      registrationData.musicGenre = [ 'death-metal', 'edm', 'electronic', 'rock', 'techno' ]
    }
    if(typeof registrationData.movieGenre === 'undefined') {
      registrationData.movieGenre = [ 'animation',
      'adventure',
      'crime',
      'comedy',
      'drama',
      'mystery',
      'romantic',
      'thriller',
      'horror',
      'music',
      'family',
      'fantasy',
      'sci-fi' ];
    }
    if(registrationData.musicGenre)
    registrationData.fname = xss(registrationData.fname);
    registrationData.lname = xss(registrationData.lname);
    registrationData.location = xss(registrationData.location);
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
    res.status(401).render("register",
      {
        error: error,
        hasErrors: true,
        hasEmailError: hasEmailError,
        hasPasswordMismatch: hasPasswordMismatch,
        isNotLoggedIn: true
      });
    return;
  }
});

module.exports = router;
