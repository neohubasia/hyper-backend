const express = require('express');
const router = express.Router();
const fs = require('fs');
const connect = require('connect-ensure-login');
const { Handlers } = require('../../../../middlewares/generator');
const config = require("../../../../config/index");
const menuAccess = require("../../../../librarys/menu-access");
const Order=require('../../../../database/mongodb/models/order')

router.get('/orders',
  connect.ensureLoggedIn(),
  (req, res, next) => {
    res.render('pages/order-list', {
      ...menuAccess.getProgram(req.user.role, "orderMenu.orderSubMenu.list"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app
    });
  }
);

router.get('/order/:id?', 
  connect.ensureLoggedIn(),
  async (req, res, next) => {
    let data = {};
      data = await Order.findById(req.params.id)
        .populate('customerId')
        .populate({ 
            path: 'orderItem.productId',
            populate: {
              path: 'category_id',
              model: 'product_category'
            } 
        })
    console.log(data)
    res.render('pages/order_deatil-list', {
      ...menuAccess.getProgram(req.user.role, "orderMenu.orderSubMenu.entry"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data
    });
  }
)


module.exports = router;
