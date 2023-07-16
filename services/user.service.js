const User = require("../models/User");

const userService = {
  create: (body) => User.create(body),
  findAll: () => User.find(),
  findById: (id) => User.findById(id),
  update: (id, username, email, password) => User.findByIdAndUpdate({ _id: id }, { username, email, password })
}

module.exports = userService;