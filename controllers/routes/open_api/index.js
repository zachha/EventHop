module.exports = app => {
	app.get("/", (req,res) => res.render("index"));
	app.get('/nav', (req,res) => res.render('partials/default_nav',{layout:false}));
};