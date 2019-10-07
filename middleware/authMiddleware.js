const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
const userService = new UserService();

exports.authMiddleware = async function(req, res, next) {
  const bearerHeader = req.headers.authorization;
  const token = bearerHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    console.log("decoded - ", decoded);
    if (decoded) {
      console.log("decoded Ok");
      const user = await userService.getById(decoded.sub);
      req.user = user;
      return next();
    }
  } catch (err) {
    console.log("catch block worked!");
    return res.status(400).send(err);
  }
  console.log("usual case when token not pass");
  res.status(400).send("Bad token");
};
