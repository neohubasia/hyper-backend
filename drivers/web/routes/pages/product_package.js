const express = require("express");
const router = express.Router();
const fs = require("fs");
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const menuAccess = require("../../../../librarys/menu-access");
const { generateTokenSign } = require("../../../../middlewares/jwt-generate");
let ProductPacksDb = require("../../../../controllers/product_package");

router.get("/product_packages", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/product-package-list", {
    ...menuAccess.getProgram(
      req.user.role,
      "catalogMenu.productPackSubMenu.list"
    ), // admin may change on req.user => role
    token: generateTokenSign(config.jwt.credential.USERNAME),
    app: config.app,
  });
});

router
  .get(
    "/product_package/:id?",
    connect.ensureLoggedIn(),
    async (req, res, next) => {
      let data = {};
      if (req.params.id)
        data = await ProductPacksDb.findData("id", req.params.id);

      res.render("pages/product-package-entry", {
        ...menuAccess.getProgram(
          req.user.role,
          "catalogMenu.productPackSubMenu.entry"
        ), // admin may change on req.user => role
        token: generateTokenSign(config.jwt.credential.USERNAME),
        app: config.app,
        data: data,
      });
    }
  )
  .post("/product_package", (req, res, next) => {
    let db,
      status = "FAIL";

    if (!req.body.id) {
      // insert data
      db = ProductPacksDb.addData(req.body);
    } else {
      // update data
      const id = req.body.id;
      const { ["id"]: removed, ...data } = req.body;
      db = ProductPacksDb.updateData(req.body.id, data);
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
