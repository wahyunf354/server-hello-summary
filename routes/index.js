const express = require("express");
const router = express.Router();
const AdminController = require("../Controller/AdminController");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Hello Summer | Home" });
});

module.exports = router;
