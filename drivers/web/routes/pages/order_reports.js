const express = require("express");
const router = express.Router();
const fs = require("fs");
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const { generateTokenSign } = require("../../../../middlewares/jwt-generate");
const menuAccess = require("../../../../librarys/menu-access");
let OrdersDb = require("../../../../controllers/order");

router.get("/order_reports", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/order-reports-list", {
    ...menuAccess.getProgram(
      req.user.role,
      "reportMenu.orderReportSubMenu.list"
    ), // admin may change on req.user => role
    token: generateTokenSign(config.jwt.credential.USERNAME),
    app: config.app,
  });
});

router.get(
  "/order_reports/:id?",
  connect.ensureLoggedIn(),
  async (req, res, next) => {
    let data = {};
    data = await OrdersDb.findData("id", req.params.id);
    res.render("pages/order-reports-list", {
      ...menuAccess.getProgram(
        req.user.role,
        "reportMenu.orderReportSubMenu.entry"
      ), // admin may change on req.user => role
      token: generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data,
    });
  }
);

module.exports = router;
