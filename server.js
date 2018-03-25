const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const PORT = process.env.PORT || 8080;

const app = express();

// serves static content/files for the app from the public directory
app.use(express.static("public"));

// parse app and www-forms that are encoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse app and json
app.use(bodyParser.json());

// handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import routes and gives server access
require("./controllers/UserController.js")(app);
require("./controllers/GroupController.js")(app);


db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
