var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("vic_spotInfo.ejs");
});
router.get("/", function (req, res) {
  res.render("vic_spotInfo.ejs");
});

module.exports = router;
