const authService = require("../services/auth.service");
const userService = require("../services/user.service");

const userController = {
  create: async (req, res) => {
    try {
      const { name, username, email, password, avatar, background } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: "Please, submit all fields for user registration." })
      }

      const user = await userService.create(req.body);

      if (!user) {
        return res.status(400).json({ message: "Error creating User." });
      }

      const token = authService.generateToken(user.id)

      return res.status(201).json({
        message: "User created.",
        user: {
          id: user._id,
          name,
          username,
          email,
          password,
          avatar,
          background
        },
        token,
      });

    } catch (error) {
      // console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },

  findAll: async (req, res) => {
    try {

      const users = await userService.findAll();

      if (users.length === 0) {
        return res.status(400).json({ message: "No registered users." })
      }

      return res.status(200).json(users);

    } catch (error) {
      // console.log(error);
      return res.status(500).json({ message: error.message });

    }
  },

  findById: async (req, res) => {
    try {
      // const id = req.params.id;

      // if (!mongoose.Types.ObjectId.isValid(id)) {
      //   res.status(400).json({ message: "Invalid ID." })
      // }

      // const user = await userService.findById(id);
      const user = req.user;

      // if (!user) {
      //   res.status(400).json({ message: "User not found." })
      // }

      return res.status(200).json(user);

    } catch (error) {
      // console.log(error);
      return res.status(500).json({ message: error.message });

    }

  },

  update: async (req, res) => {
    try {
      const { name, username, email, password, avatar, background } = req.body;

      if (!username && !email && !password) {
        return res.status(400).json({ message: "Please, submit at least one field for update user." })
      }

      const id = req.params.id;

      // if (!mongoose.Types.ObjectId.isValid(id)) {
      //   res.status(400).json({ message: "Invalid ID." })
      // }

      // const user = await userService.findById(id);

      // if (!user) {
      //   res.status(400).json({ message: "User not found." })
      // }

      await userService.update(
        id,
        name,
        username,
        email,
        password,
        avatar,
        background
      );

      return res.status(200).json({ message: "User updated." })

    } catch (error) {
      // console.log(error);
      return res.status(500).json({ message: error.message });

    }
  }
}


module.exports = userController;