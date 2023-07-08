const router = require("express").Router();

const authController = require("../controllers/authController");

const marketController = require("../controllers/marketController");

router.use(authController.gaurd);
router.use(authController.refreshToken);

router.get("/", marketController.getAvailableMarkets);

module.exports = router;