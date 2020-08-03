const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

router.get('/', connectEnsureLogin.ensureLoggedIn(),(req, res, next) => {
  res.render('pages/dashboard', { title: 'Dashboard' });
});

router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res, next) =>  {
  res.render('pages/dashboard', { title: 'Dashboard' });
});

module.exports = router;
