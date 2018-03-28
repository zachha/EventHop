const express = require('express');
const route = express.Router();
const db = require('../../userController');

/* GET users listing. */
route.get('/', (req, res, next) => {
  res.send('welcome!!');
});

/* GET user profile. */
route.get('/profile', (req, res, next) => {    
    res.send(req.user);
});

module.exports = route;
