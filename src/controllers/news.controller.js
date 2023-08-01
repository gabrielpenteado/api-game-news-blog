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
        user: req.userId
      })

      res.status(201).json("New created.")

    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  findAll: async (req, res) => {
    try {
      let { limit, offset } = req.query;

      limit = Number(limit);
      offset = Number(offset);

      if (!limit) {
        limit = 5;
      }

      if (!offset) {
        offset = 0;
      }

      const news = await newsService.findAll(offset, limit);

      const total = await newsService.countNews();
      // console.log(total);

      const currentUrl = req.baseUrl;
      // console.log(currentUrl);

      const next = offset + limit;

      const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

      const previous = offset - limit < 0 ? null : offset - limit;
      const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

      // if (news.length === 0) {
      //   return res.status(400).json({ message: "No registered news." })
      // }

      news.shift(); // remove the first new.

      res.status(200).json({
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,

        results: news.map(item => ({
          id: item._id,
          title: item.title,
          text: item.text,
          banner: item.banner,
          likes: item.likes,
          comments: item.comments,
          name: item.user.name,
          username: item.user.username,
          userAvatar: item.user.avatar
        }))
      });

    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  topNews: async (req, res) => {
    try {
      const news = await newsService.topNews();

      if (!news) {
        res.status(400).json({ message: "No registered post." });
      }

      res.json({
        news: {
          id: news._id,
          title: news.title,
          text: news.text,
          banner: news.banner,
          likes: news.likes,
          comments: news.comments,
          name: news.user.name,
          username: news.user.username,
          userAvatar: news.user.avatar
        }
      })
    } catch (error) {
      // console.log(error);
      res.status(500).json(error.message);
    }

  },
  findById: async (req, res) => {
    try {
      const { id } = req.params;

      const news = await newsService.findById(id);

      return res.json({
        news: {
          id: news._id,
          title: news.title,
          text: news.text,
          banner: news.banner,
          likes: news.likes,
          comments: news.comments,
          name: news.user.name,
          username: news.user.username,
          userAvatar: news.user.avatar
        }
      })

    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  },
  searchByTitle: async (req, res) => {
    try {
      const { title } = req.query;

      const news = await newsService.searchByTitle(title);

      if (news.length === 0) {
        return res.status(400).json({ message: "No news with this title." })
      }

      return res.json({
        results: news.map(item => ({
          id: item._id,
          title: item.title,
          text: item.text,
          banner: item.banner,
          likes: item.likes,
          comments: item.comments,
          name: item.user.name,
          username: item.user.username,
          userAvatar: item.user.avatar
        }))
      })

    } catch (error) {
      // console.log(error);
      res.status(500).json(error.message)
    }
  },
  byUser: async (req, res) => {
    try {
      const id = req.userId;

      const news = await newsService.byUser(id);

      return res.json({
        results: news.map(item => ({
          id: item._id,
          title: item.title,
          text: item.text,
          banner: item.banner,
          likes: item.likes,
          comments: item.comments,
          name: item.user.name,
          username: item.user.username,
          userAvatar: item.user.avatar
        }))
      })

    } catch (error) {
      // console.log(error);
      res.status(500).json(error.message);
    }
  },
  update: async (req, res) => {
    try {
      const { title, text, banner } = req.body;
      const { id } = req.params;

      if (!title && !text && !banner) {
        return res.status(400).json({ message: "Please, submit at least one field for update the post." });
      }

      const news = await newsService.findById(id);
      // console.log(news.user._id);
      // console.log(req.userId);

      if (String(news.user._id) !== String(req.userId)) {
        return res.status(400).json({ message: "You can't update this new." });
      }

      await newsService.update(id, title, text, banner);

      return res.status(200).json({ message: "New succesfully updated." })


    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: error.message })
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const news = await newsService.findById(id);

      if (String(news.user._id) !== String(req.userId)) {
        return res.status(400).json({ message: "You can't delete this new." });
      }

      await newsService.delete(id);

      return res.status(200).json({ message: "New was deleted." })

    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: error.message });
    }


  },
  likeNews: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.userId;

      const newsLiked = await newsService.likeNews(id, userId);

      if (!newsLiked) {
        await newsService.deleteLikeNews(id, userId);

        return res.status(200).json({ message: "Unlike!" })
      }

      return res.json("Like!")

    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: error.message })
    }
  },
  addComment: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const { comment } = req.body;

      if (!comment) {
        return res.status(400).json({ message: "Write a message to comment." });
      }

      await newsService.addComment(id, comment, userId);

      res.status(200).json({ message: "Comment created." })

    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: error.message })
    }
  },
  deleteComment: async (req, res) => {
    try {
      const { idNews, idComment } = req.params;
      const userId = req.userId;
      // console.log(userId);

      const commentDeleted = await newsService.deleteComment(idNews, idComment, userId);
      // console.log(commentDeleted);

      const commentFinder = commentDeleted.comments.find(comment => comment.idComment === idComment);

      if (String(!commentFinder)) {
        return res.status(400).json({ message: "Comment not found." });
      }

      if (String(commentFinder.userId) !== String(userId)) {
        return res.status(400).json({ message: "You can't delete this comment." });
      }

      res.status(200).json({ message: "Comment deleted." });

    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = newsController;