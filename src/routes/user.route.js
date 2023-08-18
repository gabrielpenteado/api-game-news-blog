const router = require("express").Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const { validId, validUser } = require("../middlewares/global.middlewares")

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", authMiddleware, userController.findById);
router.patch("/:id", validId, validUser, userController.update);

module.exports = router;