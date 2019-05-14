const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcryptjs");
const data = require("../data");

router.get("/", async (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  let loginData = req.body;
  let error;
  let selectedUser;

  if (!loginData.userEmail) {
    error = "The email or the password is not correct.";
  }
  if (!loginData.password) {
    error = "The email or the password is not correct.";
  }

  selectedUser = await data.users.getUserByEmail(loginData.userEmail);


  if (typeof selectedUser === "undefined") {
    error = "The email or the password is not correct.";
  } else {
    const isMatch = await bcrypt.compare(
      loginData.password,
      selectedUser.HashedPassword
    );
    if (isMatch) {
      try {
        req.session.loggedIn = true;
        const tmp_user_obj = selectedUser;
        delete tmp_user_obj.HashedPassword;
        req.session.userData = tmp_user_obj;

        res.redirect("/profile/my-profile");
      } catch (e) {
        console.log("Error.", e);
      }
    } else {
      error = "The email or the password is not correct.";
    }
  }

  console.log(loginData)
  if (error) {
    res.status(401).render("login",{
      error: error,
      hasErrors: true,
      data: loginData
    });
    return;
  }
});

module.exports = router;
