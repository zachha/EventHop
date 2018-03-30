const express = require('express');
const route = express.Router();
const udb = require('../../userController');
const gdb = require('../../groupController')

/* GET users listing. */
route.get('/', (req, res, next) => {
  res.send('welcome!!');
});

/* GET user profile. */
route.get('/profile', (req, res, next) => {
    let user = req.user;
    let groups = gdb;  
    res.json({user:req.user, groups:gdb.findGroup([
            user.user_route_one,
            user.user_route_two,
            user.user_route_three
    	])});
});

route.post('/create-group',(req,data,res) =>{
    gdb.createGrouup(data,user.id);
});

module.exports = route;
