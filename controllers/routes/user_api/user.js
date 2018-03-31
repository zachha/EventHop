const express = require('express');
const route = express.Router();
const udb = require('../../userController');
const gdb = require('../../groupController')

/* GET users listing. */
route.get('/', (req, res, next) => {
  res.json(req.user);
});

/* GET user profile. */
route.get('/profile', (req, res, next) => {
    let user = req.user;
    let groups = gdb;  
    /*let userData = {user:req.user, groups:gdb.findGroup([
            user.user_route_one,
            user.user_route_two,
            user.user_route_three
    	]).get({plain:true})}*/

    //send object containing
    res.render('index',{user:true});
});

route.post('/create-group',(req,data,res) =>{
    gdb.createGroup(data, 1);
});

module.exports = route;
