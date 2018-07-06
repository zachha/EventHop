const express = require("express");
const route = express.Router();
const udb = require("../../userController");
const gdb = require("../../groupController");

/* GET users listing. */
route.get("/", (req, res, next) => {
  res.json(udb.findUser(req.user.id));
});

route.get("/nav", (req, res, next) => {
  //send tiny partial to get appended to navbar
  res.render("partials/user_nav", { layout: false });
});

// creates group event
route.post("/api/group/create-group", (req, data, res) => {
  gdb.createGroup(data, req.user.id);
});

// allows user to join group/event
route.put("/api/group/:id/join", (req, data, res) => {
  gdb.joinGroup(req.user.id, data);
});

// allows user to leave group/event
route.put("/api/group/:id/leave", (req, data, res) => {
  gdb.leaveGroup(req.user.id, data);
});

module.exports = route;
