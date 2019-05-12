const express = require("express");
const router = express.Router();
const path = require("path")
const data = require("../data")
const bcrypt = require("bcryptjs");
const { ObjectId } = require('mongodb')

router.get("/", async (req, res) => {
    res.render("register");
  });


  router.post("/", async (req, res) => {
    let registrationData = req.body;
    let error;
    let hashedPass;
    console.log('THIS IS THE REGISTRATION FOR DATA:', req.body);

    if(registrationData.password1.toLowerCase() !== registrationData.password2.toLowerCase()) {
      console.log("Passwords do not match.");
      return;
    }
    
    bcrypt.hash(registrationData.password1, 8, async function(err, hash) {
      hashedPass = hash;

      console.log('THIS IS THE HASHED PASSWORD:', hashedPass);

    const newUserObj = {
      FirstName: registrationData.fname,
      LastName: registrationData.lname,
      Email: registrationData.email,
      Gender: registrationData.gender,
      Location: registrationData.location,
      Age: registrationData.age,
      HashedPassword: hashedPass,
      FavoriteMusicGenres: [],
      FavoriteMovieGenres: [],
      Favorites: "",
      MusicLists: [],
      MovieLists: [],
      WatchLater: []
    }

    const createdUser = await data.users.registration(newUserObj);
    console.log("PLEASE CONFIRM THIS INFORMATION FOR THE USER CREATED:", createdUser)
    newUser = Object.assign({}, createdUser);
    req.session.loggedIn = true;
    
        const tmp_user_obj = newUser;
        delete tmp_user_obj.hashedPassword;
        req.session.userData = tmp_user_obj;
        console.log('BEFORE REDIERCTING:', req.session.userData);
    res.redirect("/profile/my-profile");
  });

    
    // console.log(
    //   "this is the data:",
    //   req.body,
    //   loginData.userEmail,
    //   loginData.password
    // );
    // if (!loginData.userEmail) {
    //   error = "The email or the password is not correct.";
    // }
    // if (!loginData.password) {
    //   error = "The email or the password is not correct.";
    // }
  
    // for (i = 0; i < users.length; i++) {
    //   if (loginData.userEmail === users[i].userEmail) {
    //     selectedUser = Object.assign({}, users[i]);
    //   }
    // }
    // console.log("this is the selected user:", selectedUser);
  
    // if (typeof selectedUser === "undefined") {
    //   error = "The email or the password is not correct.";
    // } else {
    //   const isMatch = await bcrypt.compare(
    //     loginData.password,
    //     selectedUser.hashedPassword
    //   );
    //   console.log("THIS IS A MATCH", isMatch);
    //   if (isMatch) {
    //     try {
    //       req.session.loggedIn = true;
    //       const tmp_user_obj = selectedUser;
    //       delete tmp_user_obj.hashedPassword;
    //       req.session.userData = tmp_user_obj;
  
    //       res.redirect("/profile/my-profile");
    //     } catch (e) {
    //       console.log("Error.", e);
    //     }
    //   } else {
    //     error = "The email or the password is not correct.";
    //   }
    // }
  
    // if (error) {
    //   res.status(401).render("login"),
    //     {
    //       error: error,
    //       hasErrors: true,
    //       data: loginData
    //     };
    //   return;
    // }
  });

module.exports = router;
