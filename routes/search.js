const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;
const movies = data.movies;
const spotify = require("../external-api/spotify");

router.get("/", async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(403).render("unauthorized")
    return;
  } else {
    res.render("search");
  }
});

router.get("/user", async (req, res) => {
    if (!req.session.loggedIn) {
      res.status(403).render("unauthorized")
      return;
    } else {
    const users = await data.users.getAllUsers();
      res.render("search", {
          searchType: "User",
          userList: users
      });
    }
  });

  router.get("/music", async (req, res) => {
    if (!req.session.loggedIn) {
      res.status(403).render("unauthorized")
      return;
    } else {
      res.render("search", {
          searchType: "Music"
      });
    }
  });

  router.get("/movies", async (req, res) => {
    if (!req.session.loggedIn) {
      res.status(403).render("unauthorized")
      return;
    } else {
      res.render("search", {
          searchType: "Movie"
      });
    }
  });


router.post("/", async (req, res) => {
    let keyword = req.body.keyword;
    let searchType = req.body.searchType;
    let result;
    console.log(searchType)
    switch(searchType){
      case "User":
        result = await users.getUserByName(keyword);
        break;

      case "Music":
        console.log(keyword);
        spotify.search(keyword,async function(body){
//          console.log(body)

          body.artists.items.forEach(element => {
            console.log(element)
          });

          body.tracks.items.forEach(element => {
            console.log(element)
          });
        })

        break;

      case "Movie":
        console.log(keyword)
        result = await movies.searchMovieByName(keyword);
        break;

      default:
        break;
    }
    /*
    if(searchType==="User"){
      console.log("serch a user")
      result = await users.getUserByName(keyword)
    }
    else{
      console.log("search a media")
      result = await playlists.search(keyword,searchType);
    }
    */

/*
    const users = data.users;
    const searchQuery = req.body['keyword'];
    let result = [];
    for(i=0;i<users.length;i++) {
        if(users[i].firstName.toLowerCase().includes(searchQuery.toLowerCase()) || users[i].lastName.toLowerCase().includes(searchQuery.toLowerCase())) {
            if(result.indexOf(users[i]) < 0) {
                result.push(users[i]);
            }
        }
    }*/
    console.log("***********:", result);
    console.log("------------------------------------------------");
    res.render("search", {
      hasResults: true,
      resultList: result,
      searchType: searchType
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
  
    //       res.redirect("/my-profile");
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
