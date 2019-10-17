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

  // async createUser(req, res, next) {
  //   try {
  //     const newUser = await UserService.createUser(req.body);
  //     console.log("CREATED user - ", newUser);

  //     newUser ? res.send("Registration successful") : next(newUser);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  async sendPasswordResetEmail(req, res, next) {
    const {
      params: { email }
    } = req;
    try {
      const info = await UserService.sendPasswordResetEmail({ email });
      console.log("info - ", info);
      res.status(200).send("Message sent successfully");
    } catch (err) {
      err.message = "User not exist!";
      next(err);
    }
  }

  async receiveNewPassword(req, res, next) {
    const {
      body: { password },
      params: { userId, token }
    } = req;
    console.log("new PASSWORD!!!!");

    try {
      const result = await UserService.receiveNewPassword({
        userId,
        token,
        password
      });
      console.log("UPDATE Password user - ", result);
      res.send("Changed password successful");
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
