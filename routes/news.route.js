const router = require("express").Router();

const newsController = require("../controllers/news.controller");

router.post("/", newsController.create);
router.get("/", newsController.findAll);


module.exports = router;