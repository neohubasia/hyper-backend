const express = require("express");
const router = express.Router();
const fs = require("fs");
const moment = require("moment");
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const { generateTokenSign } = require("../../../../middlewares/jwt-generate");
const menuAccess = require("../../../../librarys/menu-access");
let CouponsDb = require("../../../../controllers/coupon");

router.get("/coupons", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/coupon-list", {
    ...menuAccess.getProgram(req.user.role, "marketingMenu.couponSubMenu.list"), // admin may change on req.user => role
    token: generateTokenSign(config.jwt.credential.USERNAME),
    app: config.app,
  });
});

router
  .get("/coupon/:id?", connect.ensureLoggedIn(), async (req, res, next) => {
    let data = {};
    if (req.params.id) data = await CouponsDb.findData("id", req.params.id);

    if (data) {
      data.start_time = moment(data.start_time).format("DD/MM/YYYY hh:mm A");
      data.expire_time = moment(data.expire_time).format("DD/MM/YYYY hh:mm A");
    }

    res.render("pages/coupon-entry", {
      ...menuAccess.getProgram(
        req.user.role,
        "marketingMenu.couponSubMenu.entry"
      ), // admin may change on req.user => role
      token: generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data,
    });
  })
  .post("/coupon", (req, res, next) => {
    let db,
      status = "FAIL";

    if (req.body.start_time && req.body.expire_time) {
      req.body.start_time = req.body.start_time.split("/").reverse().join("-");
      req.body.expire_time = req.body.expire_time
        .split("/")
        .reverse()
        .join("-");
    }

    if (!req.body.id) {
      // insert data
      db = CouponsDb.addData(req.body);
    } else {
      // update data
      const id = req.body.id;
      const { ["id"]: removed, ...data } = req.body;
      db = CouponsDb.updateData(req.body.id, data);
    }
    db.then((result) => {
      if (result != null) status = "SUCCESS";
      res.json({ status: status, data: result });
    }).catch((error) => {
      console.log(`Error ${error}`);
      res.json({ status: status, data: error });
    });
  });

module.exports = router;
