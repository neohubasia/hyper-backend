var express = require("express");
var router = express.Router();
const passport = require("passport");
const config = require("../../../config/index");

router
  .get("/login", (req, res, next) => {
    req.session.returnTo = req.headers.referer;
    res.render("auth/login", {
      app: config.app,
      title: "Login",
      subtitle: "Welcome back",
    });
  })
  .post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      var returnTo = "/";
      if (err) {
        console.log(`Error ${err}`);
        return next(err);
      }
      if (!user) {
        return res.redirect("/login?info=" + info);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        if (req.session.returnTo) {
          returnTo = req.session.returnTo;
        }
        delete req.session.returnTo;
        return res.redirect("/");
      });
    })(req, res, next);
  });

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
