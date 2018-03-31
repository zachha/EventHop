const express = require('express');
const route = express.Router();
const mdb = require('../../messageController');

route.get('/messages/:group/:n'(req,res,next) => {
	mdb.findn(req.params.group,req.params.n.then(data => res.json(data.get{plain:true}));
});