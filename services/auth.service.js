const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authService = {
  login: (email) => User.findOne({ email: email }).select("+password"),
  generateToken: (id) => jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 })
}

module.exports = authService;
