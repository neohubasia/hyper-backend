const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

router.get('/students', connectEnsureLogin.ensureLoggedIn(),(req, res, next) => {
  res.render('pages/students', { title: 'Student' });
});

module.exports = router;
