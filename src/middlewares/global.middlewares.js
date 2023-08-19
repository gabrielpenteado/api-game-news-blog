const mongoose = require("mongoose");
const userService = require("../services/user.service");

const validId = (req, res, next) => {
  // const id = req.params.id;
  const id = req.userId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID." });
  }

  next();
};

const validUser = async (req, res, next) => {
  // const id = req.params.id;
  // const id = req.userId;
  // const user = await userService.findById(id);
  const user = req.user;

  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  // req.id = id;
  // req.user = user;

  next();
};

module.exports = {
  validId,
  validUser
};