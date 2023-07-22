const newsService = require("../services/news.service");

const newsController = {
  create: async (req, res) => {
    try {
      const { title, text, banner } = req.body;

      if (!title || !text || !banner) {
        return res.status(400).json({ message: "Please, submit all fields for news registration." })
      }

      await newsService.create({
        title,
        text,
        banner,
        user: { _id: "64b58a0c9e799235ecc9c941" }
      })

      res.status(201).json("New created.")

    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  findAll: async (req, res) => {
    try {
      const news = await newsService.findAll();

      if (news.length === 0) {
        return res.status(400).json({ message: "No registered news." })
      }


      res.status(200).json(news);

    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = newsController;