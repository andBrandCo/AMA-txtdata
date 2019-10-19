const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
const userService = new UserService();

exports.authMiddleware = async function(req, res, next) {
  try {
    const bearerHeader = req.headers.authorization;
    const token = bearerHeader.split(" ")[1];
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
    console.log("err- ", err);

    return res.status(400).send(err.message);
  }
  console.log("usual case when token not pass");
  res.status(400).send("Bad token");
};
