const router = require("express").Router();

const newsController = require("../controllers/news.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, newsController.create);

router.get("/", newsController.findAll);
router.get("/top", newsController.topNews);
router.get("/search", newsController.searchByTitle);
router.get("/byuser", authMiddleware, newsController.byUser);
router.get("/:id", authMiddleware, newsController.findById);

router.patch("/:id", authMiddleware, newsController.update);
router.patch("/like/:id", authMiddleware, newsController.likeNews);
router.patch("/comment/:id", authMiddleware, newsController.addComment);
router.patch("/comment/:idNews/:idComment", authMiddleware, newsController.deleteComment);

router.delete("/:id", authMiddleware, newsController.delete)


module.exports = router;