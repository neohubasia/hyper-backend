const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

router.get('/students', connectEnsureLogin.ensureLoggedIn(), (req, res, next) =>  {
  console.log("Hello World");
  res.render('pages/students', { title: 'Students List' });
});

module.exports = router;
