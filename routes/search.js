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


router.post("/", async (req, res) => {
    let keyword = req.body.keyword;
    let searchType = req.body.searchType;
    let result = [];
    console.log(keyword)
    switch(searchType){
      case "User":
        result.push(await users.getUserByName(keyword));
        hasResult = (result.length!=0)
          res.render("search", {
            hasResults: hasResult,
            resultList: result,
            searchType: searchType,
            user: true
          });
        break;

      case "Music":
        console.log(keyword);
        spotify.search(keyword,async function(body){
          result = []
          //console.log(body)
          
          console.log("------------------------------------------------");
          body.tracks.items.forEach(element => {
            let temp = {
              Name:element.name,
              Link:element.external_urls.spotify,
              //Preview: element.preview_url,
              Artist: element.artists[0].name,
              ArtistLink: element.artists[0].external_urls.spotify
            }
            result.push(temp)
          });
          console.log(result)
          hasResult = (result.length!=0)
          res.render("search", {
            hasResults: hasResult,
            resultList: result,
            searchType: searchType,
            music: true
          });
        })

        break;

      case "Movie":
        console.log(keyword)
        try{
          result =[];
          result.push(await movies.searchMovieByName(keyword));
          hasResult = true;
        }catch(e){
          hasResult = false;
        }

        console.log(result)
        console.log(hasResult)
        
        res.render("search", {
          hasResults: hasResult,
          resultList: result,
          searchType: searchType,
          movie: true
        })
        break;

      default:
        break;
    }
    console.log("***********:", result);
    console.log("------------------------------------------------");
  });

  router.post("/music", async (req, res) => {
    const searchQuery = req.body['keyword'];
    const result = await data.recommender.getSearchedMusic(searchQuery);
       
  });


module.exports = router;
