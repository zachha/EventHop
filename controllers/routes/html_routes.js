const path = require('path');
module.exports = (app) => {
	app.get("/",(req,res) => {
		res.sendfile(path.join(__dirname+'../../../test.html'));
	});
};