var express = require("express");
var vic_homepage_router = express.Router();

vic_homepage_router.get("/", function (req, res) {
  res.render("vic_homepage.ejs");
});

module.exports = vic_homepage_router;
