const router = require("express").Router();

const authController = require("../controllers/authController");

const userController = require("../controllers/userController");

router.use(authController.gaurd);
router.use(authController.refreshToken);

router.get("/me", userController.getMe);

router.get(
  "/top-items/:type/:limit/:offset/:time_range",
  userController.getTopItems
);

router.get("/get-user/:user_id", userController.getUser);

router.put(
  "/follow-playlist/:playlist_id/:public",
  userController.followPlaylist
);

router.delete(
  "/unfollow-playlist/:playlist_id",
  userController.unfollowPlaylist
);

router.get("/get-followed-artists/", userController.getFollowedArtists);

router.put("/follow/:type/:id", userController.follow);

router.delete("/unfollow/:type/:id", userController.unfollow);

router.get(
  "/check-following-user-or-artist/:type/:id",
  userController.checkFollowingUserOrArtist
);

router.get(
  "/check-user-following-playlist/:user_id/:playlist_id",
  userController.checkUserFollowingPlaylist
);

module.exports = router;
