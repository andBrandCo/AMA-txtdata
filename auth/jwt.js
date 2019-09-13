const expressJwt = require("express-jwt");
// const config = require('../config.json');

function jwt() {
  // const { secret } = config;
  const secret = "secret_word";
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      // "/api/users/create"
      "/api/users/login"
    ]
  });
}
module.exports = jwt;
