const express = require("express");
const router = express.Router();
const data = require("../data");

router.get("/", async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(403).render("unauthorized")
    return;
  } else {
    res.render("profile", {
      userData: req.session.userData
    });
  }
});

module.exports = router;
