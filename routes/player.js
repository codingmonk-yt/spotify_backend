const router = require("express").Router();

const authController = require("../controllers/authController");

const playerController = require("../controllers/playerController");

router.use(authController.gaurd);
router.use(authController.refreshToken);

router.get("/playback-state", playerController.getPlaybackState);
router.put("/transfer-playback/:device_id", playerController.transferPlayback);
router.get("/available-devices", playerController.getAvailableDevices);
router.get("/currently-playing", playerController.getCurrentlyPlayingTrack);
router.put("/start-resume", playerController.startResumePlayback);
router.put("/pause", playerController.pausePlayback);
router.post("/next", playerController.skipToNext);
router.put("/previous", playerController.skipToPrevious);
router.put("/seek-to-position/:positionMs", playerController.seekToPosition);
router.put("/repeat/:state", playerController.setRepeatMode);
router.put("/set-volume/:volumePercent", playerController.setPlaybackVolume);
router.put("/toggle-shuffle/:state", playerController.togglePlaybackShuffle);
router.get("/recently-played", playerController.getRecentlyPlayed);
router.get("/queue", playerController.getQueue);
router.post("/add-to-queue/:uri", playerController.addToQueue);


module.exports = router;