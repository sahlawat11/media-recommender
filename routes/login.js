const express = require("express");
const router = express.Router();
const path = require("path")
const bcrypt = require("bcryptjs");
const data = require("../data");

router.get("/", async (req, res) => {
    res.render("login");
  });

  router.post("/", async (req, res) => {
    let loginData = req.body;
    let error;
    let selectedUser;
    const users = data.users;
  
    if (!loginData.userEmail) {
      error = "The email or the password is not correct.";
    }
    if (!loginData.password) {
      error = "The email or the password is not correct.";
    }
    
    for(i=0; i<users.length; i++) {
        if(loginData.userEmail === users[i].userEmail) {
            selectedUser = Object.assign({}, users[i]);
        }
    }
    if(typeof selectedUser === 'undefined') {
        error = "The email or the password is not correct."
    } else {
        const isMatch = await bcrypt.compare(loginData.password, selectedUser.hashedPassword)
        if(isMatch) {
            try {
                req.session.loggedIn = true;
                const tmp_user_obj = selectedUser;
                delete tmp_user_obj.hashedPassword;
                req.session.userData = tmp_user_obj;
  
          res.redirect("/my-profile");
            } catch(e) {
                console.log("Error.", e)
            }
        } else {
          error = "The email or the password is not correct.";
        }
      }
  
    if (error) {
      res.status(401).render(path.join(__dirname, "../views", "login.html"), {
        error: error,
        hasErrors: true,
        data: loginData
      });
      return;
    }
  });

module.exports = router;
