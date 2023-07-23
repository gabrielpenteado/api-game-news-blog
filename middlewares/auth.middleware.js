require("dotenv").config();
const jwt = require("jsonwebtoken");

const userService = require("../services/user.service");

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // console.log(authorization);

    if (!authorization) {
      return res.status(401).json();
    }

    const parts = authorization.split(" ");
    // console.log(parts);

    const [schema, token] = parts;

    if (parts.length !== 2) {
      return res.status(401).json();
    }

    if (schema !== "Bearer") {
      return res.status(401).json();
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Token invalid." });
      }
      // console.log(decoded);

      const user = await userService.findById(decoded.id);

      if (!user || !user.id) {
        res.status(500).json({ message: "Invalid token." });
      }

      req.userId = user._id;

      return next();

    });

  } catch (error) {
    // console.log(error);
    res.status(500).json(error.message);
  }

};


module.exports = authMiddleware;
