const User = require("../models/User");

const authService = {
  login: (email) => User.findOne({ email: email }).select("+password")
}

module.exports = authService;
