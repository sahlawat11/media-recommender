const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", async (req, res) => {
  if(req.session.loggedIn) {
    res.redirect("/profile/my-profile");
  } else {
  res.render("root");
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.render("logout", {
      isNotLoggedIn: true
    });
  });
});

module.exports = router;