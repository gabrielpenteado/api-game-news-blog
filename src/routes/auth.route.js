const router = require("express").Router();

const authController = require("../controllers/auth.controller");

router.post("/", authController.login);

module.exports = router;
