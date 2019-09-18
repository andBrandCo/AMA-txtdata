const User = require("../models/user");
const jwt = require("jsonwebtoken");

class UserService {
  async authUser({ userName, password }) {
    const user = await User.findOne({ name: userName, password });
    console.log("my User - ", user);

    if (user) {
      // const token = jwt.sign({ sub: user.id }, config.secret);
      const token = jwt.sign({ sub: user.id }, "secret_word"); //change it for some word from config or .env
      const { password, ...userWithoutPassword } = user;
      console.log("userWithout pass - ", userWithoutPassword);

      return {
        name: user.name,
        access_token: token
      };
    }
  }
}

module.exports = UserService;
