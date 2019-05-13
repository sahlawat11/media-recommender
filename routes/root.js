const express = require("express");
const router = express.Router();
const path = require("path")


router.get("/", async (req, res) => {
    res.render("root");
  });

  router.get("/logout", async (req, res) => {
    req.session.destroy(() => {
      res.render("logout");
    });
  });


module.exports = router;
