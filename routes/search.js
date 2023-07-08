const router = require("express").Router();

const authController = require("../controllers/authController");

const searchController = require("../controllers/searchController");

router.use(authController.gaurd);
router.use(authController.refreshToken);

router.get("/", searchController.search);

module.exports = router;