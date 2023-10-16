const config = require("../config");

const AUTH_OPTIONS = {
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  scope: ["profile"],
};

module.exports = AUTH_OPTIONS;
