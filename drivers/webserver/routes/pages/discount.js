const express = require('express');
const router = express.Router();
const fs = require('fs');
const connect = require('connect-ensure-login');
const config = require("../../../../config/index");
const { Handlers } = require('../../../../middlewares/generator');
const menuAccess = require("../../../../librarys/menu-access");
let DiscountsDb = require('../../../../controllers/discount');

router.get('/discounts',
  connect.ensureLoggedIn(),
  (req, res, next) => {
    res.render('pages/discount-list', {
      ...menuAccess.getProgram(req.user.role, "catalogMenu.discountSubMenu.list"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app
    });
  }
);

router.get('/discount/:id?',
  connect.ensureLoggedIn(),
  async (req, res, next) => {
    let data = {};
    if (req.params.id)
      data = await DiscountsDb.findData('id', req.params.id);

    res.render('pages/discount-entry', {
      ...menuAccess.getProgram(req.user.role, "catalogMenu.discountSubMenu.entry"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data
    });
  }
)
  .post('/discount',
    (req, res, next) => {

      let db, status = "FAIL";

      if (!req.body.id) { // insert data 
        db = DiscountsDb.addData(req.body);
      }
      else { // update data
        const id = req.body.id;
        const { ['id']: removed, ...data } = req.body;
        db = DiscountsDb.updateData(req.body.id, data);
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