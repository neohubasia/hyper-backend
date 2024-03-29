const express = require("express");
const router = express.Router();
const fs = require("fs");
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const { generateTokenSign } = require("../../../../middlewares/jwt-generate");
const menuAccess = require("../../../../librarys/menu-access");
let CustomersDb = require("../../../../controllers/customer");

router.get("/customers", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/customer-list", {
    ...menuAccess.getProgram(
      req.user.role,
      "registerMenu.customerSubMenu.list"
    ), // admin may change on req.user => role
    token: generateTokenSign(config.jwt.credential.USERNAME),
    app: config.app,
  });
});

router
  .get("/customer/:id?", connect.ensureLoggedIn(), async (req, res, next) => {
    let data = {};
    if (req.params.id) data = await CustomersDb.findData("id", req.params.id);

    res.render("pages/customer-entry", {
      ...menuAccess.getProgram(
        req.user.role,
        "registerMenu.customerSubMenu.entry"
      ), // admin may change on req.user => role
      token: generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data,
    });
  })
  .post("/customer", (req, res, next) => {
    let db,
      status = "FAIL";

    if (!req.body.id) {
      // insert data
      db = CustomersDb.addData(req.body);
    } else {
      // update data
      const id = req.body.id;
      const { ["id"]: removed, ...data } = req.body;
      db = CustomersDb.updateData(req.body.id, data);
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
