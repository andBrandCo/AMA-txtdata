const expressJwt = require("express-jwt");
const UserService = require("../services/userService");
const userService = new UserService();

function jwt() {
  const secret = `${process.env.JWT_SECRET}`;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/api/users/register",
      "/api/users/login"
    ]
  });
}

async function isRevoked(req, payload, done) {
  console.log("payload - ", payload);

  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}

module.exports = jwt;
