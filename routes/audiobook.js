const router = require("express").Router();

const authController = require("../controllers/authController");

const audiobookController = require("../controllers/audiobookController");

router.use(authController.gaurd);
router.use(authController.refreshToken);

router.get("/get-one/:audiobook_id", audiobookController.getOne);
router.get("/get-several", audiobookController.getSeveral);
router.get(
  "/audiobook-chapters/:audiobook_id",
  audiobookController.audiobookChapters
);
router.get("saved-audiobooks", audiobookController.getMySavedAudiobooks);
router.put("/save/:ids", audiobookController.saveAudiobooks);
router.delete("/remove/:ids", audiobookController.removeSavedAudiobooks);
router.get(
  "/check-saved-audiobooks/:ids",
  audiobookController.checkSavedAudiobooks
);

module.exports = router;
