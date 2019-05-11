const express = require("express");
const app = express();
app.use(express.json())
const static = express.static(__dirname + "/views");
const configRoutes = require("./routes");
const omdb = require("./api/omdb")

app.use("/views", static);

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});

console.log(omdb.getById('tt0412142'));