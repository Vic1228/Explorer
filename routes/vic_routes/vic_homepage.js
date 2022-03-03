var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.render("vic_homepage.ejs");
});

module.exports = router;
