const router = require("express").Router();

const authController = require("../controllers/authController");

const episodeController = require("../controllers/episodeController");

router.use(authController.gaurd);
router.use(authController.refreshToken);

router.get("/get-one/:episode_id", episodeController.getOne);
router.get("/get-several", episodeController.getSeveral);
router.get("/get-saved", episodeController.getSavedEpisodes);
router.put("/save", episodeController.saveEpisodes);
router.delete("/remove", episodeController.removeSavedEpisodes);
router.get("/check-saved-episodes", episodeController.checkMySavedEpisodes);

module.exports = router;
