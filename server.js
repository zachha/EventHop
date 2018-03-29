const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const socket = require('socket.io');
const PORT = process.env.PORT || 8080;

const app = express();
// requires models to sync database
const db = require('./models');

// parse app and www-forms that are encoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse app and json
app.use(bodyParser.json());

// static directory
app.use('/public',express.static(path.join(__dirname+'/public')));

// handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require('./controllers/routes/html_routes')(app);
require('./controllers/routes/user_api')(app);

// sets up routes and controllers with the express app
/*
require("./controllers/userController.js")(app);
require("./controllers/groupController.js")(app);
*/

// syncs the database !!! CHANGE FORCE TO FALSE BEFORE DEPLOYMENT !!! and starts the server
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});


