const router = require("express").Router();

const authController = require("../controllers/authController");

const showController = require("../controllers/showController");

router.use(authController.gaurd);
router.use(authController.refreshToken);

router.get("/one/:show_id", showController.getShow);
router.get("/several/", showController.getSeveralShows);
router.get("/episodes/:show_id", showController.getShowEpisodes);
router.get("/saved/", showController.getSavedShows);
router.put("/save/", showController.saveShows);
router.delete("/remove", showController.removeSavedShows);
router.get("/check/saved/", showController.checkSavedShows);

module.exports = router;