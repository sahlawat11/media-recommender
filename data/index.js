const userRoutes = require("./users");

let constructorMethod = app => {
  app.use("/user", userRoutes);
};

module.exports = {
  users: require("./users"),
};
