const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

require("dotenv").config();

const AUTH_OPTIONS = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback",
  scope: ["profile"],
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  done(null, profile);
}

passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
