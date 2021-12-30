const express = require("express");
const router = express.Router();
const fs = require("fs");
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const { Handlers } = require("../../../../middlewares/generator");
const menuAccess = require("../../../../librarys/menu-access");
let DeliveryChargesDb = require("../../../../controllers/delivery_charge");

router.get("/delivery-charges", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/delivery-charge-list", {
    ...menuAccess.getProgram(
      req.user.role,
      "deliveryMenu.deliChargeSubMenu.list"
    ), // admin may change on req.user => role
    token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
    app: config.app,
  });
});

router
  .get(
    "/delivery-charge/:id?",
    connect.ensureLoggedIn(),
    async (req, res, next) => {
      let data = {};
      if (req.params.id)
        data = await DeliveryChargesDb.findData("id", req.params.id);

      res.render("pages/delivery-charge-entry", {
        ...menuAccess.getProgram(
          req.user.role,
          "deliveryMenu.deliChargeSubMenu.entry"
        ), // admin may change on req.user => role
        token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
        app: config.app,
        data: data,
      });
    }
  )
  .post("/delivery-charge", (req, res, next) => {
    let db,
      status = "FAIL";

    if (!req.body.id) {
      // insert data
      db = DeliveryChargesDb.addData(req.body);
    } else {
      // update data
      const id = req.body.id;
      const { ["id"]: removed, ...data } = req.body;
      db = DeliveryChargesDb.updateData(req.body.id, data);
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
