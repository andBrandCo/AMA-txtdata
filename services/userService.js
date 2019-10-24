const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  transporter,
  getPasswordResetURL,
  resetPasswordTemplate
} = require("../tools/email");
const saltRounds = 10;

const usePasswordHashToMakeToken = ({ hash, _id, createdAt }) => {
  const secret = hash + "-" + createdAt;
  const token = jwt.sign({ userId: _id }, secret, {
    expiresIn: 3600 // 1 hour
  });
  return token;
};

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

  async sendPasswordResetEmail({ email }) {
    let user;
    try {
      user = await User.findOne({ username: email }).exec();
    } catch (err) {
      res.status(404).json("No user with that email");
    }
    const token = usePasswordHashToMakeToken(user);
    const url = getPasswordResetURL(user, token);
    const emailTemplate = resetPasswordTemplate(user, url);

    const sendEmail = () => transporter.sendMail(emailTemplate);
    return sendEmail();
  }

  async receiveNewPassword({ userId, token, password }) {
    const user = await User.findOne({ _id: userId });
    const secret = user.hash + "-" + user.createdAt;
    const payload = jwt.decode(token, secret);

    if (payload.userId === user._id.toString()) {
      const hash = await bcrypt.hash(password, saltRounds);
      return User.findOneAndUpdate({ _id: userId }, { hash });
    } else {
      throw new Error("Invalid token");
    }
  }

  // async createUser({ userName, password }) {
  //   // validate
  //   if (await User.findOne({ username: userName })) {
  //     throw 'Username "' + userName + '" is already taken';
  //   }
  //   const user = new User({ username: userName });
  //   // hash password
  //   if (password) {
  //     console.log("Creating USER - ", user);

  //     user.hash = bcrypt.hashSync(password, saltRounds);
  //   }

  //   return user.save();
  // }
}

module.exports = UserService;
