const express = require("express");
const router = express.Router();
const fs = require("fs");
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const { generateTokenSign } = require("../../../../middlewares/jwt-generate");
const menuAccess = require("../../../../librarys/menu-access");
let ProductWeightsDb = require("../../../../controllers/product_weight");

router.get("/product_weights", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/product-weight-list", {
    ...menuAccess.getProgram(
      req.user.role,
      "catalogMenu.productWeightSubMenu.list"
    ), // admin may change on req.user => role
    token: generateTokenSign(config.jwt.credential.USERNAME),
    app: config.app,
  });
});

router
  .get(
    "/product_weight/:id?",
    connect.ensureLoggedIn(),
    async (req, res, next) => {
      let data = {};
      if (req.params.id)
        data = await ProductWeightsDb.findData("id", req.params.id);

      res.render("pages/product-weight-entry", {
        ...menuAccess.getProgram(
          req.user.role,
          "catalogMenu.productWeightSubMenu.entry"
        ), // admin may change on req.user => role
        token: generateTokenSign(config.jwt.credential.USERNAME),
        app: config.app,
        data: data,
      });
    }
  )
  .post("/product_weight", (req, res, next) => {
    let db,
      status = "FAIL";

    if (!req.body.id) {
      // insert data
      db = ProductWeightsDb.addData(req.body);
    } else {
      // update data
      const id = req.body.id;
      const { ["id"]: removed, ...data } = req.body;
      db = ProductWeightsDb.updateData(req.body.id, data);
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
