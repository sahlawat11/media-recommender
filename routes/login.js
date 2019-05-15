const express = require("express");
const router = express.Router();
const xss = require("xss");
const bcrypt = require("bcryptjs");
const data = require("../data");

router.get("/", async (req, res) => {
  if(req.session.loggedIn) {
    res.redirect("/profile/my-profile");
  } else {
  res.render("login");
  }
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

  if(typeof error === 'undefined') {
  loginData.userEmail = xss(loginData.userEmail);
  loginData.password = xss(loginData.password);
  try {
  selectedUser = await data.users.getUserByEmail(loginData.userEmail);
  } catch {
    console.log('User not found.');
    error = "The email or the password is not correct."
  }


  if (typeof error !== 'undefined' || typeof selectedUser === "undefined") {
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
        tmp_user_obj.sendEmail = true;
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
}

  if (error) {
    res.status(401).render("login",
      {
        error: error,
        hasErrors: true
      });
    return;
  }
});

module.exports = router;
