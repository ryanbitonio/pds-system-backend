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
  res.redirect(process.env.CLIENT_URL || "http://localhost:5173");
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
    successRedirect:
      process.env.CLIENT_CONTACT_URL || "http://localhost:5173/contact",
  })
);

module.exports = authRouter;
