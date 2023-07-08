const router = require("express").Router();

const authController = require("../controllers/authController");

const genreController = require("../controllers/genreController");

router.use(authController.gaurd);
router.use(authController.refreshToken);

router.get("/", genreController.getAvailableGenreSeeds);

module.exports = router;