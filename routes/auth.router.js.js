const authRouter = require("express").Router();
const passport = require("passport");

authRouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json(req.user._json);
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

authRouter.get("/failure", (req, res) => {
  res.json({
    error: "Failed to log in",
  });
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: `${process.env.CLIENT_URL}/contact`,
  })
);

module.exports = authRouter;
