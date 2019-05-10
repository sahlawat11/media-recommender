const express = require("express");
const router = express.Router();
const data = require("../data");

router.get("/", async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(403).render("not-allowed/index")
    return;
  } else {
    res.render("profile/index", {
      userData: req.session.userData
    });
  }
});

module.exports = router;
