const router = require("express").Router();

const authRoute = require("./auth");
const userRoute = require("./user");
const albumRoute = require("./album");
const artistRoute = require("./artist");
const genreRoute = require("./genre");
const marketRoute = require("./market");
const searchRoute = require("./search");
const categoryRoute = require("./category");
const chapterRoute = require("./chapter");
const audiobookRoute = require("./audiobook");
const episodeRoute = require("./episode");

router.use("/v1/auth", authRoute);
router.use("/v1/user", userRoute);
router.use("/v1/album", albumRoute);
router.use("/v1/artist", artistRoute);
router.use("/v1/genre", genreRoute);
router.use("/v1/market", marketRoute);
router.use("/v1/search", searchRoute);
router.use("/v1/category", categoryRoute);
router.use("/v1/chapter", chapterRoute);
router.use("/v1/audiobook", audiobookRoute);
router.use("/v1/episode", episodeRoute);

module.exports = router;
