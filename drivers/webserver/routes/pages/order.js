const express = require('express');
const router = express.Router();
const fs = require('fs');
const connect = require('connect-ensure-login');
const config = require("../../../../config/index");
const { Handlers } = require('../../../../middlewares/generator');
const menuAccess = require("../../../../librarys/menu-access");
let orderDb = require('../../../../controllers/orders')

router.get('/orders',
  connect.ensureLoggedIn(),
  (req, res, next) => {
    res.render('pages/order-list', {
      ...menuAccess.getProgram(req.user.role, "orderMenu.orderSubMenu.list"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app
    });
  }
);

router.get('/order/:id?',
  connect.ensureLoggedIn(),
  async (req, res, next) => {
    let data = {};
    data = await orderDb.findData('id', req.params.id);
    res.render('pages/order_deatil-list', {
      ...menuAccess.getProgram(req.user.role, "orderMenu.orderSubMenu.entry"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data
    });
  }
)


module.exports = router;
