const express = require("express");
const router = express.Router();
const data = require("../data");
const xss = require("xss");

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

  function getUnique(arr, comp) {
    const unique = arr
         .map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e]).map(e => arr[e]);
     return unique;
  }

router.post("/user", async (req, res) => {
  req.body['keyword'] = xss(req.body['keyword']);
    const searchQuery = req.body['keyword'];
    let result = [];
    const users = await data.users.getAllUsers();
    const loggedInUserId = req.session.userData._id;
    for(i=0; i<users.length; i++) {
      if(users[i].FirstName.toLowerCase().includes(searchQuery.toLowerCase()) || users[i].LastName.toLowerCase().includes(searchQuery.toLowerCase()) || users[i].Email.toLowerCase().includes(searchQuery.toLowerCase())) {
        if(users[i]._id != loggedInUserId) {
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
  });

  

  router.post("/music", async (req, res) => {
    req.body['keyword'] = xss(req.body['keyword']);
    const searchQuery = req.body['keyword'];
    const result = await data.recommender.getSearchedMusic(searchQuery);
       
  });


module.exports = router;
