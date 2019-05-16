const express = require("express");
const router = express.Router();
const data = require("../data");
const xss = require("xss");
const spotify = require("../external-api/spotify");
const omdb = require("../external-api/omdb");

router.get("/", async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(403).render("unauthorized", {
      isNotLoggedIn: true
    })
    return;
  } else {
    res.render("search",{
        isUser:true
    });
  }
});

router.get("/user", async (req, res) => {
    if (!req.session.loggedIn) {
      res.status(403).render("unauthorized", {
        isNotLoggedIn: true
      });
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
      res.status(403).render("unauthorized", {
        isNotLoggedIn: true
      })
      return;
    } else {
      res.render("search", {
          isMusic: true
      });
    }
  });

  router.get("/movies", async (req, res) => {
    if (!req.session.loggedIn) {
      res.status(403).render("unauthorized", {
        isNotLoggedIn: true
      })
      return;
    } else {
      res.render("search", {
          isMovie: true
      });
    }
  });

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
        user: true,
        isUser: true
    });
  });

  
  router.post("/music", async (req, res) => {
    const searchQuery = xss(req.body.keyword);
    spotify.search(searchQuery,async function(body) {
      result = []
      body.tracks.items.forEach(element => {
        let temp = {
          Name:element.name,
          Link:element.external_urls.spotify,
          PreviewUrl: element.preview_url,
          Artist: element.artists[0].name,
          ArtistLink: element.artists[0].external_urls.spotify
        }
        result.push(temp)
      });
      hasResult = result.length !== 0
      res.render("search", {
        hasResults: hasResult,
        resultList: result,
        music: true,
        isMusic: true
      });
    })
  });

  router.post("/movie", async (req, res) => {
    const searchQuery = xss(req.body.keyword);
    try {
      const result = await omdb.getByName(searchQuery);
      hasResult = true;
      res.render("search", {
        hasResults: hasResult,
        resultList: result.Search,
        searchType: 'movie',
        movie: true,
        isMovie: true
      });
    } catch(e) {
      hasResult = false;
    }    
  });


module.exports = router;
