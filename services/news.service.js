const News = require("../models/News");

const newsService = {
  create: (body) => News.create(body),
  findAll: () => News.find()
}

module.exports = newsService;