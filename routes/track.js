const router = require("express").Router();

const authController = require("../controllers/authController");

const trackController = require("../controllers/trackController");

router.use(authController.gaurd);
router.use(authController.refreshToken);

router.get("/one/:id", trackController.getTrack);
router.get("/several/", trackController.getSeveralTracks);
router.get("/saved/", trackController.getSavedTracks);
router.put("/save/", trackController.saveTracks);
router.delete("/remove", trackController.removeSavedTracks);
router.get("/check/saved/", trackController.checkSavedTracks);
router.get("/recommendations", trackController.getRecommendations);

module.exports = router;