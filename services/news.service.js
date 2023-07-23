const News = require("../models/News");

const newsService = {
  create: (body) => News.create(body),
  findAll: (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user"),
  countNews: () => News.countDocuments(),
  topNews: () => News.findOne().sort({ _id: -1 }).populate("user")
}

module.exports = newsService;