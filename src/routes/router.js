const router = require("express").Router();

const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const newsRoute = require("./news.route");
const swaggerRoute = require("./swagger.route");

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/news", newsRoute);
router.use("/doc", swaggerRoute);

module.exports = router;