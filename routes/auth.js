const router = require("express").Router();

const authController = require("../controllers/authController");

router.post("/login", authController.login, authController.fetchUser);

module.exports = router;
