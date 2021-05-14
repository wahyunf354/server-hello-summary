const express = require("express");
const router = express.Router();
const PatnerController = require("../Controller/PatnerController");
const ProductController = require("../Controller/ProductController");
const AdminController = require("../Controller/AdminController");
const TypeBundleController = require("../Controller/TypeBundleController");
const MaterialDrinkController = require("../Controller/MaterialDrinkController");
const SocialMediaController = require("../Controller/SocialMediaController");
const TypeController = require("../Controller/TypeController");
const { upload } = require("../middleware/multer");

/* GET Dashboard page. */
router.get("/", AdminController.index);
router.get("/login", AdminController.login);

// Patner Page
router.get("/patner", PatnerController.index);
router.post("/patner", upload, PatnerController.addData);
router.put("/patner", upload, PatnerController.editProfilePatner);
router.put("/patner/resetpassowrd", PatnerController.resetPasswordPatner);
router.get("/patner/add", PatnerController.displayformAdd);
router.get("/patner/edit/:id", PatnerController.displayformEdit);
router.get("/patner/:id", PatnerController.detailPatner);
router.delete("/patner/:id", PatnerController.deletePatner);

// Product Page
router.get("/product", ProductController.index);

// Type Page / Category Page
router.get("/type", TypeController.index);
router.post("/type", TypeController.addData);

// TypeBundle Page
router.get("/type_bundle", TypeBundleController.index);
router.post("/type_bundle", upload, TypeBundleController.addData);
router.put("/type_bundle", upload, TypeBundleController.editData);
router.get("/type_bundle/:id", upload, TypeBundleController.detailData);
router.delete("/type_bundle/:id", TypeBundleController.deleteData);

// Material Drink Page
router.get("/material_drink", MaterialDrinkController.index);
router.post("/material_drink", MaterialDrinkController.addData);
router.put("/material_drink", MaterialDrinkController.editData);
router.delete("/material_drink/:id", MaterialDrinkController.deleteData);

// Social Media Page
router.get("/social_media", SocialMediaController.index);
router.post("/social_media", SocialMediaController.addData);
router.put("/social_media", SocialMediaController.editData);
router.delete("/social_media/:id", SocialMediaController.deleteData);

module.exports = router;
