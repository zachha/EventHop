const passport = require('passport');
const user = require('./user');
const auth = require('./auth');
require('../../.auth/passport');

module.exports = (app) => {	
	app.use('/auth', auth);
    app.use('/user', passport.authenticate('jwt', {session: false}), user);
};