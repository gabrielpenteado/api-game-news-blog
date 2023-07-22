const router = require("express").Router();

const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const newsRoute = require("./news.route");

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/news", newsRoute);

module.exports = router;