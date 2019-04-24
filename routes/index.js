const rootRoutes = require("./root")
const loginRoutes = require("./login")
// const postsRoutes = require("./posts")

const constructorMethod = app => {
  app.use("/", rootRoutes);
  app.use("/login", loginRoutes);
//   app.use("/login", postsRoutes);
//   app.use("/sign-up", animalRoutes);
//   app.use("/home", postsRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
