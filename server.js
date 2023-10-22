const cors = require("cors");

const helmet = require("helmet");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./auth/passport");
const generateKey = require("./auth/services");

const express = require("express");
const app = express();

require("dotenv").config();

const PORT = 3000;

const employeesRouter = require("./routes/employees.router");
const authRouter = require("./routes/auth.router.js");

app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [generateKey(), generateKey()],
    secure: true,
    sameSite: "lax",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRouter);

app.use("/employees", employeesRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Homepage",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
