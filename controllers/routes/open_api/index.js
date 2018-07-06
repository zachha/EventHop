gdb = require("../../groupController");
module.exports = app => {
  app.get("/", (req, res) => gdb.searchPopularGroups(res));

  app.get("/nav", (req, res) =>
    res.render("partials/default_nav", { layout: false })
  );
  app.get("/top5", (req, res) => {
    res.render("partials/top5", { dataOut, layout: false });
  });
};

