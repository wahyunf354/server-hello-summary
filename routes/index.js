const express = require("express");
const router = express.Router();
const AdminController = require("../Controller/AdminController");
/* GET Dashboard page. */
router.get("/", function (req, res, next) {
  res.render("admin/dashboard", { title: "Hello Summary | Dashboard" });
});

// Patner Page
router.get("/patner", AdminController.index);

module.exports = router;
