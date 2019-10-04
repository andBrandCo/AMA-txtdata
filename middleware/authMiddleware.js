const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
const userService = new UserService();

exports.authMiddleware = async function(req, res, next) {
  const bearerHeader = req.headers.authorization;
  const token = bearerHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    console.log(decoded);
    if (decoded) {
      const user = await userService.findOne({ _id: decoded.sub });
      req.user = user;
      return next();
    }
  } catch (err) {
    return res.status(400).send(err);
  }
  res.status(400).send("Bad token");
  // return decoded
};
