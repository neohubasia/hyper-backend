var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/login', (req, res, next) => {
  res.render('auth/login', { title: "Login" });
})
.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(`Error ${err}`);
      return next(err);
    }
    if (!user) {
      return res.redirect('/login?info=' + info);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
