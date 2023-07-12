const router = require("express").Router();

const authController = require("../controllers/authController");

const playlistController = require("../controllers/playlistController");

router.use(authController.gaurd);
router.use(authController.refreshToken);

router.get("/:playlist_id", playlistController.getPlaylist);
router.put("/:playlist_id", playlistController.updatePlaylistDetails);
router.get("/items/:playlist_id", playlistController.getPlaylistItems);
router.post("/items/:playlist_id", playlistController.addItemToPlaylist);
router.delete("/items/:playlist_id", playlistController.removePlaylistItems);
router.get("/me/", playlistController.getMyPlaylists);
router.get("/user/:user_id", playlistController.getUsersPlaylists);
router.post("/create/:user_id", playlistController.createPlaylist);
router.post("/featured", playlistController.getFeaturedPlaylists);
router.get("/category/:category_id", playlistController.getCategoriesPlaylists);
router.get("/cover/", playlistController.getPlaylistCoverImage);
router.put("/cover/:playlist_id", playlistController.addCustomPlaylistCoverImage);

module.exports = router;