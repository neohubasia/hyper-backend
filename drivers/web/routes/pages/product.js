const express = require("express");
const router = express.Router();
const fs = require("fs");
const connect = require("connect-ensure-login");
const config = require("../../../../config/index");
const { generateTokenSign } = require("../../../../middlewares/jwt-generate");
const menuAccess = require("../../../../librarys/menu-access");
let ProductsDb = require("../../../../controllers/product");
let DiscountsDb = require("../../../../controllers/discount");
const crypto = require("crypto");

router.get("/products", connect.ensureLoggedIn(), (req, res, next) => {
  res.render("pages/product-list", {
    ...menuAccess.getProgram(req.user.role, "catalogMenu.productSubMenu.list"), // admin may change on req.user => role
    token: generateTokenSign(config.jwt.credential.USERNAME),
    app: config.app,
  });
});

router
  .get("/product/:id?", connect.ensureLoggedIn(), async (req, res, next) => {
    let data = {};
    if (req.params.id) data = await ProductsDb.findData("id", req.params.id);
    res.render("pages/product-entry", {
      ...menuAccess.getProgram(
        req.user.role,
        "catalogMenu.productSubMenu.entry"
      ), // admin may change on req.user => role
      token: generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data,
    });
  })
  .post("/product", async (req, res, next) => {
    let db,
      status = "FAIL";
    let remove_images = req.body.remove_images || [];
    req.body.images = req.body.images || [];

    if (remove_images && remove_images.length > 0) {
      remove_images.map((file, fileIdx) => {
        // console.log(file.replace(/\\/g, "/"));
        // fs.unlinkSync(file.replace(/\\/g, "/"));

        fs.unlink("./public" + file.replace(/\\/g, "/"), function (err) {
          if (err) console.error("File Unlink Error", err);
          else console.log(fileIdx, "File has been Deleted");
        });
      });
    }

    //for feature
    var data = req.body;
    var old_discount;
    var sku = crypto.randomBytes(4).toString("hex");
    if (!data.id) {
      // insert data
      // console.log(data)
      data.sku = sku;
      db = await ProductsDb.addData(data);
    } else {
      // update data
      const id = data.id;
      const { ["id"]: removed, ...data1 } = data;

      var old_product = await ProductsDb.findData("id", data.id);
      old_discount = old_product.discount_id;
      db = await ProductsDb.updateData(data.id, data1);
    }

    //if empty object
    if (Object.keys(db).length === 0 && db.constructor === Object) {
      res.json({ status: "FAIL", data: db });
    } else {
      if (old_discount != undefined) {
        DiscountsDb.updateData(old_discount._id, {
          $pull: { discounts: db.id },
        });
      }
      if (req.body.discount_id) {
        DiscountsDb.updateData(req.body.discount_id, {
          $push: { discounts: db.id },
        });
      }
      res.json({ status: "SUCCESS", data: db });
    }
  });

module.exports = router;
