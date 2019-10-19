const userService = require("../services/userService");
const UserService = new userService();

class UserController {
  async authenticate(req, res) {
    console.log(" req.body - ", req.body);

    const user = await UserService.authUser(req.body);
    user
      ? res.send(user)
      : res.status(400).json({ message: "Username or password is incorrect" });
  }
  async createUser(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body);
      console.log("CREATED user - ", newUser);

      newUser ? res.send("Registration successful") : next(newUser);
    } catch (err) {
      next(err);
    }
  }

  async getUserById(req, res, next) {
    userService
      .getById(req.params.id)
      .then(user => (user ? res.json(user) : res.sendStatus(404)))
      .catch(err => next(err));
  }
}

module.exports = UserController;
