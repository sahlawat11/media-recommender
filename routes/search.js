const express = require("express");
const router = express.Router();
const data = require("../data");
const songsRecommender = require("../data/recommendation-generator");

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
    
      let loggedInUserId = req.session.userData._id;
      for(i=0; i<users.length; i++) {
        if(users[i]._id == loggedInUserId) {
          users.splice(i, 1);
          break;
        }
      }
      res.render("search", {
          isUser: true,
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
          isMusic: true
      });
    }
  });

  router.get("/movies", async (req, res) => {
    if (!req.session.loggedIn) {
      res.status(403).render("unauthorized")
      return;
    } else {
      res.render("search", {
          isMovie: true
      });
    }
  });


router.post("/user", async (req, res) => {
    const searchQuery = req.body['keyword'];
    let result = [];
    const users = await data.users.getAllUsers();
    for(i=0; i<users.length; i++) {
      if(users[i].FirstName.toLowerCase().includes(searchQuery.toLowerCase()) || users[i].LastName.toLowerCase().includes(searchQuery.toLowerCase()) || users[i].Email.toLowerCase().includes(searchQuery.toLowerCase())) {
        if(result.indexOf(users[i]) < 0) {
          result.push(users[i]);
        }
      }
    }
    
    res.render("search", {
        hasResults: true,
        resultList: result,
        searchType: "User",
        isUser: true
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

  

  router.post("/music", async (req, res) => {
    const searchQuery = req.body['keyword'];
    const result = await data.recommender.getSearchedMusic(searchQuery);
    setTimeout(() => {
      console.log('THIS IS IT:',  songsRecommender.globalSongSearchObj, result);
    });    
  });


module.exports = router;
