const express = require('express');
const route = express.Router();
<<<<<<< HEAD
const db = require('../../userController');
const google = require('google')
=======
const udb = require('../../userController');
const gdb = require('../../groupController')
>>>>>>> 032f07a4ec235e514860b400078de909ad3f53f1

/* GET users listing. */
route.get('/', (req, res, next) => {
  res.send('welcome!!');
});

/* GET user profile. */
<<<<<<< HEAD
route.get('/profile', (req, res, next) => {    
    res.send(req.user);

=======
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
>>>>>>> 032f07a4ec235e514860b400078de909ad3f53f1
});

module.exports = route;
