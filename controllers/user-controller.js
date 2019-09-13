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
}

module.exports = UserController;
