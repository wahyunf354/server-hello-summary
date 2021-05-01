const express = require("express");
const router = express.Router();
const PatnerController = require("../Controller/PatnerController");
const ProductController = require("../Controller/ProductController");
const AdminController = require("../Controller/AdminController");
const TypeBundleController = require("../Controller/TypeBundleController");
const MaterialDrinkController = require("../Controller/MaterialDrinkController");

/* GET Dashboard page. */
router.get("/", AdminController.index);
router.get("/login", AdminController.login);

// Patner Page
router.get("/patner", PatnerController.index);

// Product Page
router.get("/product", ProductController.index);

// TypeBundle Page
router.get("/type_bundle", TypeBundleController.index);

// Material Drink Page
router.get("/material_drink", MaterialDrinkController.index);

module.exports = router;
