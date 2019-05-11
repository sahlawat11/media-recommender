const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const guid = require("guid")
const static = express.static(__dirname + "/views");
const configRoutes = require("./routes");

const exphbs = require("express-handlebars");

app.set('trust proxy', 1)
app.use(session({
  name: 'AuthCookie',
  secret: 'This is a secret string.',
  resave: false,
  saveUninitialized: true
}))

app.use("/views", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});