const crypto = require("crypto");

function checkLoggedIn(req, res, next) {
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must log in",
    });
  }
  next();
}

function generateKey() {
  return crypto.randomBytes(32).toString("hex");
}

module.exports = { checkLoggedIn, generateKey };
