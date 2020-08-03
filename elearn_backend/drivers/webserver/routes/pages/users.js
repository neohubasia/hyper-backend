const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

router.get('/user', connectEnsureLogin.ensureLoggedIn(), (req, res, next) => {
  res.send({user: req.user});
});

module.exports = router;
