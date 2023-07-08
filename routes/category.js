const router = require("express").Router();

const authController = require("../controllers/authController");

const categoryController = require("../controllers/categoryController");

router.use(authController.gaurd);
router.use(authController.refreshToken);

router.get("/browse-categories", categoryController.getBrowseCategories);
router.get("/browse/:category", categoryController.getBrowseCategory);

module.exports = router;