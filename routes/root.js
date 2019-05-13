const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", async (req, res) => {
  res.render("root");
  // Test email
  res.mailer.send(
    "email", //template goes here
    {
      to: "justinwestley11@gmail.com", // Send to. This can be a comma delimited string just like a normal email to field.
      subject: "We have a new recommendation for you!", // Email subject
      otherProperty: "Other Property" // All additional properties are also passed to the template as local variables.
    },
    function(err) {
      if (err) {
        // handle error
        console.log(err);
        return;
      }
    }
  );
  // End test email, move this block as necessary
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.render("logout");
  });
});

module.exports = router;
