const express = require('express');
const router = express.Router();
const fs = require('fs');
const connect = require('connect-ensure-login');
const { Handlers } = require('../../../../middlewares/generator');
const config = require("../../../../config/index");
const menuAccess = require("../../../../librarys/menu-access");
let productInventoriesDb = require('../../../../controllers/product_inventory');

router.get('/product_inventories', 
  connect.ensureLoggedIn(),
  (req, res, next) => {
    res.render('pages/product_inventory-list', {
      ...menuAccess.getProgram(req.user.role, "generalMenu.productInventorySubMenu.list"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app
    });
  }
);

router.get('/product_inventory/:id?', 
  connect.ensureLoggedIn(),
  async (req, res, next) => {
    let data = {};
    if (req.params.id)
      data = await productInventoriesDb.findData('id', req.params.id);
    
    res.render('pages/product_inventory-entry', {
      ...menuAccess.getProgram(req.user.role, "generalMenu.productInventorySubMenu.entry"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data
    });
  }
)
.post('/product_inventory',
  (req, res, next) => {

    let db, status = "FAIL";

    if (!req.body.id) { // insert data 
      db = productInventoriesDb.addData(req.body);
    }
    else { // update data
      const id = req.body.id;
      const {['id']: removed, ...data} = req.body;
      db =  productInventoriesDb.updateData(req.body.id, data);
    }
    db.then(result => {
      if (result != null)
        status = "SUCCESS"
      res.json({ status: status, data: result });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      res.json({ status: status, data: error });
    });
  }
);

module.exports = router;