route = require('express').Router();

const express = require('express');
const router  = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require('passport');
require('../../.auth/passport');
/* POST login. */
route.post('/', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        
        if (err || !user) {
          console.log('<>-----------------<>'+err+'<>-----------------<>');

            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            console.log("-------"+user.id+"-------")
            const token = jwt.sign(user.id, 'secret');

            return res.json({user:user,token: token});
        });
    })
    (req, res);
});

module.exports = route;
