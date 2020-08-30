const express = require('express');
const router = express.Router();
const connect = require('connect-ensure-login');

const program = require("../../../../config/program.json")

router.get('/',
  connect.ensureLoggedIn(),
  (req, res, next) => {
    res.render('pages/dashboard', { program: program });
  }
);

module.exports = router;
