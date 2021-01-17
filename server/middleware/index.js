const authJwt = require("../middleware/auth-jwt");
const verifySignUp = require("../middleware/sign-up");

module.exports = {
  authJwt,
  verifySignUp
};