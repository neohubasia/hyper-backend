const express = require("express");
const router = express.Router();
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const { isEmptyArray } = require("../../../../librarys/utilities");
const { Handlers } = require("../../../../middlewares/generator");
const menuAccess = require("../../../../librarys/menu-access");
let SuppliersDb = require("../../../../controllers/supplier");
let UsersDb = require("../../../../controllers/user");

router.get("/suppliers", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/supplier-list", {
    ...menuAccess.getProgram(
      req.user.role,
      "registerMenu.supplierSubMenu.list"
    ), // admin may change on req.user => role
    token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
    app: config.app,
  });
});

router
  .get("/supplier/:id?", connect.ensureLoggedIn(), async (req, res, next) => {
    let data = { form: {}, modal: {} };

    if (req.params.id) {
      data.form = await SuppliersDb.findData("id", req.params.id);
      data.modal = await UsersDb.findUserBy({ supplier_id: data.form.id });
    }

    !isEmptyArray(data.modal)
      ? (data.modal = data.modal[0])
      : (data.modal = {});

    res.render("pages/supplier-entry", {
      ...menuAccess.getProgram(
        req.user.role,
        "registerMenu.supplierSubMenu.entry"
      ), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data,
    });
  })
  .post("/supplier", (req, res, next) => {
    let db,
      status = "FAIL";

    if (!req.body.id) {
      // insert data
      db = SuppliersDb.addData(req.body);
    } else {
      // update data
      const id = req.body.id;
      const { ["id"]: removed, ...data } = req.body;
      db = SuppliersDb.updateData(req.body.id, data);
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
