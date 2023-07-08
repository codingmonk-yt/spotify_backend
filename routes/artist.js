const router = require("express").Router();

const authController = require("../controllers/authController");

const artistController = require("../controllers/artistController");

router.use(authController.gaurd);
router.use(authController.refreshToken);

router.get("/:artist_id", artistController.getArtist);
router.get("/artists/:ids/", artistController.getArtists);
router.get(
  "/albums-by-artist/:artist_id/:limit/:offset",
  artistController.getAlbumsByArtist
);
router.get(
  "/top-tracks-by-artist/:artist_id/:market",
  artistController.topTracksByArtist
);

router.get(
  "/get-related-artists/:artist_id",
  artistController.getRelatedArtists
);

module.exports = router;
