const express = require('express');
const router = express.Router();
const fs = require('fs');
const connect = require('connect-ensure-login');
const { Handlers } = require('../../../../middlewares/generator');
const config = require("../../../../config/index");
const menuAccess = require("../../../../librarys/menu-access");

router.get('/carts',
  connect.ensureLoggedIn(),
  (req, res, next) => {
    res.render('pages/cart-list', {
      ...menuAccess.getProgram(req.user.role, "orderMenu.cartSubMenu.list"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app
    });
  }
);


module.exports = router;
