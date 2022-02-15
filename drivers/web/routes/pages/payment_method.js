const express = require("express");
const router = express.Router();
const fs = require("fs");
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const { generateTokenSign } = require("../../../../middlewares/jwt-generate");
const menuAccess = require("../../../../librarys/menu-access");
let PaymentMethodsDb = require("../../../../controllers/payment_method");

router.get("/payment_methods", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/payment-method-list", {
    ...menuAccess.getProgram(
      req.user.role,
      "generalMenu.paymentMethodSubMenu.list"
    ), // admin may change on req.user => role
    token: generateTokenSign(config.jwt.credential.USERNAME),
    app: config.app,
  });
});

router
  .get(
    "/payment_method/:id?",
    connect.ensureLoggedIn(),
    async (req, res, next) => {
      let data = {};
      if (req.params.id)
        data = await PaymentMethodsDb.findData("id", req.params.id);

      res.render("pages/payment-method-entry", {
        ...menuAccess.getProgram(
          req.user.role,
          "generalMenu.paymentMethodSubMenu.entry"
        ), // admin may change on req.user => role
        token: generateTokenSign(config.jwt.credential.USERNAME),
        app: config.app,
        data: data,
      });
    }
  )
  .post("/payment_method", (req, res, next) => {
    let db,
      status = "FAIL";

    if (!req.body.id) {
      // insert data
      db = PaymentMethodsDb.addData(req.body);
    } else {
      // update data
      const id = req.body.id;
      const { ["id"]: removed, ...data } = req.body;
      db = PaymentMethodsDb.updateData(req.body.id, data);
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
