const express = require('express');
const router = express.Router();
const connect = require('connect-ensure-login');

router.get('/',
  connect.ensureLoggedIn(),
  (req, res, next) => {
    res.render('pages/dashboard', { title: 'Dashboard' });
  }
);

router.get('/dashboard',
  connect.ensureLoggedIn(),
  (req, res, next) =>  {
    res.render('pages/dashboard', { title: 'Dashboard' });
  }
);

module.exports = router;
