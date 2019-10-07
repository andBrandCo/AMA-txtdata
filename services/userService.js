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
        // token
      };
    }

    // if (user) {
    //   const token = jwt.sign({ sub: user.id }, `${process.env.JWT_SECRET}`);
    //   const { password, ...userWithoutPassword } = user;
    //   console.log("userWithout pass - ", userWithoutPassword);

    //   return {
    //     name: user.name,
    //     access_token: token
    //   };
    // }
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

      user.hash = bcrypt.hashSync(password, 10);
    }

    // save user
    return user.save();
    // throw new Error("ValidationError");

    // User.create({ name: req.body.userName, password: req.body.password })
    //   .then(() => {
    //     res.status(200).send("Ok");
    //   })
    //   .catch(console.error);
  }
}

module.exports = UserService;
