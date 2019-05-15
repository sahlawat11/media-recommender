const rootRoutes = require("./root");
const loginRoutes = require("./login");
const registerRoutes = require("./register");
const homeRoutes = require("./home");
const myProfileRoutes = require("./profile");
const searchRoutes = require("./search");
const playlistRoutes = require("./playlist");

const constructorMethod = app => {
  app.use("/", rootRoutes);
  app.use("/login", loginRoutes);
  app.use("/register", registerRoutes);
  app.use("/home", homeRoutes);
  app.use("/profile", myProfileRoutes);
  app.use("/search", searchRoutes);
  app.use("/playlist", playlistRoutes);
  app.use("*", (req, res) => {
    res.status(404).render("page-not-found", {
      isNotLoggedIn: true
    });
    return;
  });
};

module.exports = constructorMethod;
