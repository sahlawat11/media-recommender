const express = require("express");
const router = express.Router();
const data = require("../data");

router.get("/my-profile", async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(403).render("unauthorized")
    return;
  } else {
      console.log('THIS IS ANOTHER TEST:',req.session.userData);
    res.render("profile", {
      userData: req.session.userData
    });
  }
});

router.get("/:id", async (req, res) => {
    console.log('THIS HAS BEEN CALLED HERE', req.params);
    if (!req.session.loggedIn) {
      res.status(403).render("unauthorized")
      return;
    } else {
        const users = data.users;
        let userData;
        for(i=0; i<users.length; i++) {
            if(users[i]._id.toString() === req.params.id.toString()) {
                userData = users[i];
            }
        }
        console.log('THIS IS THE USER DATA:', userData);
      res.render("profile", {
        userData: userData
      });
    }
  });

module.exports = router;
