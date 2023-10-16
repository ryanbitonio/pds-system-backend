const https = require("https");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const express = require("express");
const app = express();
const helmet = require("helmet");
const cookieSession = require("cookie-session");

require("dotenv").config();

const PORT = 3000;

const employeesRouter = require("./routes/employees.router");
const { checkLoggedIn } = require("./auth/services");

const AUTH_OPTIONS = require("./auth/options");
const config = require("./config");

app.use(express.json());
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google profile: ", profile);
  done(null, profile);
}

passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);

app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = cb => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = cb => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/employees", checkLoggedIn, employeesRouter);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: process.env.CLIENT_URL,
  })
);

app.get("/auth/logout", (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/failure", (req, res) => {
  res.json({
    error: "Failed to log in",
  });
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
  });
