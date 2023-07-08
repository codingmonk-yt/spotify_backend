const router = require("express").Router();

const authController = require("../controllers/authController");

const chapterController = require("../controllers/chapterController");

router.use(authController.gaurd);
router.use(authController.refreshToken);

router.get("/get-one/:chapter_id", chapterController.getChapter);
router.get("/chapters", chapterController.getChapters);

module.exports = router;