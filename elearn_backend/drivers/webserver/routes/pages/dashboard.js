const express = require('express');
const router = express.Router();
const connect = require('connect-ensure-login');
const config = require("../../../../config/index");
const menuAccess = require("../../../../librarys/menu-access");

router.get('/',
  connect.ensureLoggedIn(),
  (req, res, next) => {
    res.render('pages/dashboard', {
      ...menuAccess.getProgram(req.user.role, "dashMenu.null.null"), // admin may change on req.user => role
      app: config.app
    });
  }
);

module.exports = router;
