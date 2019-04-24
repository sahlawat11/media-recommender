const animalRoutes = require("./animals")
const postsRoutes = require("./posts")

const constructorMethod = app => {
  app.use("/", animalRoutes);
  app.use("/login", postsRoutes);
  app.use("/sign-up", animalRoutes);
  app.use("/home", postsRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
