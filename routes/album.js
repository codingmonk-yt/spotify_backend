const router = require("express").Router();

const authController = require("../controllers/authController");

const albumController = require("../controllers/albumController");

router.use(authController.gaurd);
router.use(authController.refreshToken);

router.get("/:album_id", albumController.getAlbum);
router.get("/albums/:ids", albumController.getAlbums);
router.get(
  "/tracks/:album_id/:limit/:offset",
  albumController.getTracksByAlbum
);
router.get("/my-saved-albums/:limit/:offset", albumController.getMySavedAlbums);
router.put("/save/:id", albumController.saveAlbum);
router.delete("/remove/:id", albumController.removeAlbum);
router.get("/check-saved-album/:id", albumController.checkSavedAlbum);
router.get(
  "/new-releases/:limit/:offset/:country",
  albumController.getNewReleases
);

module.exports = router;
