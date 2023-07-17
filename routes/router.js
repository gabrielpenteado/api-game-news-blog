const router = require("express").Router();

const userRoute = require("./user.route");
const authRoute = require("./auth.route");

router.use("/user", userRoute);
router.use("/login", authRoute);

module.exports = router;