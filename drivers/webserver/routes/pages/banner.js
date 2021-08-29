const express = require('express');
const router = express.Router();
const fs = require('fs');
const connect = require('connect-ensure-login');
const { Handlers } = require('../../../../middlewares/generator');
const config = require("../../../../config/index");
const menuAccess = require("../../../../librarys/menu-access");
let bannerDb = require('../../../../controllers/banners');

router.get('/banners',
  connect.ensureLoggedIn(),
  (req, res, next) => {
    res.render('pages/banner-list', {
      ...menuAccess.getProgram(req.user.role, "generalMenu.bannerSubMenu.list"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app
    });
  }
);

router.get('/banner/:id?', 
  connect.ensureLoggedIn(),
  async (req, res, next) => {
    console.log("OK");
    let data = {};
    if (req.params.id)
      data = await bannerDb.findData('id', req.params.id);
      console.log("data",data);
      res.render('pages/banner-entry', {
      ...menuAccess.getProgram(req.user.role, "generalMenu.bannerSubMenu.entry"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data
    });
  }
)

.post('/banner',
  (req, res, next) => {

    let db, status = "FAIL";

    if (!req.body.id) { // insert data 
      console.log("Data",req.body);
      db = bannerDb.addData(req.body);
    }
    else { // update data
      const id = req.body.id;
      const {['id']: removed, ...data} = req.body;
      db =  bannerDb.updateData(req.body.id, data);
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

router.route('/imagetype')
.post(function(req, res, next) {
  console.log("REACH");
  const dataresult = [];
  bannerDb.listData()
  .then(data => {
    for(var i=0;i<data.length;i++){
        dataresult.push(data[i].imagetype);
      }
      res.json(dataresult);
      console.log(dataresult);
  })
  .catch(err => {
    console.log(`Error ${err}`)
    res.json({
      status: "FAIL",
      data: err
    })
  });
});
module.exports = router;
