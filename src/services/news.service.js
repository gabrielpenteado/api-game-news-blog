const News = require("../models/News");

const uuid = require("uuid");

const newsService = {
  create: (body) => News.create(body),
  findAll: (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user"),
  countNews: () => News.countDocuments(),
  topNews: () => News.findOne().sort({ _id: -1 }).populate("user"),
  findById: (id) => News.findById(id).populate("user"),
  searchByTitle: (title) => News.find({ title: { $regex: `${title || ""}`, $options: "i" } }).sort({ _id: -1 }).populate("user"),
  byUser: (id) => News.find({ user: id }).sort({ _id: -1 }).populate("user"),
  update: (id, title, text, banner) => News.findOneAndUpdate({ _id: id }, { title, text, banner }, { rawResult: true }),
  delete: (id) => News.findOneAndDelete({ _id: id }),
  likeNews: (idNews, userId) => News.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  ),
  deleteLikeNews: (idNews, userId) => News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { likes: { userId } } }
  ),
  addComment: (idNews, comment, userId) => {
    const idComment = uuid.v4();
    // console.log(idComment);

    return News.findOneAndUpdate({ _id: idNews }, { $push: { comments: { idComment, userId, comment, createAt: new Date() } } })
  },
  deleteComment: (idNews, idComment, userId) => News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { comments: { idComment, userId } } }
  )

}

module.exports = newsService;