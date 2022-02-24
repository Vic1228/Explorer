var express = require("express");
var vic_spotinfo_router = express.Router();

vic_spotinfo_router.get("/", (req, res) => {
  res.render("vic_spotInfo.ejs");
});
vic_spotinfo_router.get("/", function (req, res) {
  res.render("vic_spotInfo.ejs");
});

module.exports = vic_spotinfo_router;
