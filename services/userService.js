const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10;

class UserService {
  async getById(id) {
    return await User.findById(id).select("-hash");
  }

  async authUser({ userName, password }) {
    const user = await User.findOne({ username: userName }).lean();
    console.log("my User - ", user);

    if (user && bcrypt.compareSync(password, user.hash)) {
      const { hash, ...userWithoutHash } = user;
      const token = jwt.sign({ sub: user._id }, `${process.env.JWT_SECRET}`);
      return {
        ...userWithoutHash,
        access_token: token
      };
    }
  }

  async createUser({ userName, password }) {
    // validate
    if (await User.findOne({ username: userName })) {
      throw 'Username "' + userName + '" is already taken';
    }
    const user = new User({ username: userName });
    // hash password
    if (password) {
      console.log("Creating USER - ", user);

      user.hash = bcrypt.hashSync(password, saltRounds);
    }

    return user.save();
  }
}

module.exports = UserService;
