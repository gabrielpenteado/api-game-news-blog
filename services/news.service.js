const News = require("../models/News");

const newsService = {
  create: (body) => News.create(body),
  findAll: (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user"),
  countNews: () => News.countDocuments(),
  topNews: () => News.findOne().sort({ _id: -1 }).populate("user"),
  findById: (id) => News.findById(id).populate("user"),
  searchByTitle: (title) => News.find({ title: { $regex: `${title || ""}`, $options: "i" } }).sort({ _id: -1 }).populate("user"),
  byUser: (id) => News.find({ user: id }).sort({ _id: -1 }).populate("user"),
  update: (id, title, text, banner) => News.findOneAndUpdate({ _id: id }, { title, text, banner }, { rawResult: true })
}

module.exports = newsService;