const express = require('express');
const router = express.Router();

// api routing
const dev = require('./develop');
const users = require('./user');
const userRoles = require('./user-role');
const students = require('./student');
const townships = require('./township');
const cities = require('./city');
const product_categories = require('./product_category')
const product_inventories = require('./product_inventory')
const discounts = require('./discount')
const products = require('./product')
const carts = require('./cart')
const orders = require('./order')
const banners = require('./banner');

// schema vialidation
const validateware = require('./../../../../middlewares/validator');
const studentSchema = require('./../../../../models/students/student-schema');
const { findAndConstructOrder, updateStock, verifyStock } = require('../../../../middlewares/cartToOrder')

router
  .get('/user-roles', userRoles.index); // working with json

router
  .get('/users', users.index)
  .get('/user/:id', users.show)
  .post('/user', users.create)
  .post('/user/:id', users.update)
  .delete('/user/:id', users.delete);

router
  .get('/townships', townships.index)
  .get('/township/:id', townships.show)
  .get('/township', townships.showby)
  .post('/township', townships.create)
  .post('/township/:id', townships.update)
  .delete('/township/:id', townships.delete)
  .delete('/townships', townships.deleteall);

router
  .get('/cities', cities.index)
  .get('/city/:id', cities.show)
  .get('/city', cities.showby)
  .post('/city', cities.create)
  .post('/city/:id', cities.update)
  .delete('/city/:id', cities.delete)
  .delete('/cities', cities.deleteall);

router
  .get('/students', students.index)
  .get('/student/:id', students.show)
  .get('/student', students.showby)
  .post('/student', validateware(studentSchema), students.create)
  .post('/student/:id', validateware(studentSchema), students.update)
  .delete('/student/:id', students.delete)
  .delete('/students', students.deleteall);

router
  .get('/product_categories', product_categories.index)
  .get('/product_category/:id', product_categories.show)
  .get('/product_category', product_categories.showby)
  .post('/product_category', product_categories.create)
  .post('/product_category/:id', product_categories.update)
  .delete('/product_category/:id', product_categories.delete)
  .delete('/product_categories', product_categories.deleteall);

router
  .get('/product_inventories', product_inventories.index)
  .get('/product_inventory/:id', product_inventories.show)
  .get('/product_inventory', product_inventories.showby)
  .post('/product_inventory', product_inventories.create)
  .post('/product_inventory/:id', product_inventories.update)
  .delete('/product_inventory/:id', product_inventories.delete)
  .delete('/product_inventories', product_inventories.deleteall);

router
  .get('/discounts', discounts.index)
  .get('/discounts/activeData', discounts.activeData)
  .get('/discount/:id', discounts.show)
  .get('/discount', discounts.showby)
  .post('/discount', discounts.create)
  .post('/discount/:id', discounts.update)
  .delete('/discount/:id', discounts.delete)
  .delete('/discounts', discounts.deleteall);

router
  .get('/products', products.index)
  .get('/product/:id', products.show)
  .get('/product', products.showby)
  .post('/product', products.create)
  .post('/product/:id', products.update)
  .delete('/product/:id', products.delete)
  .delete('/products', products.deleteall);


router
  .post('/cart',carts.create)
  .get('/cart/:customerId',carts.read)
  .get('/carts',carts.getList)

router
  .post('/order',findAndConstructOrder,verifyStock,updateStock,carts.destroy,orders.create)
  .get('/order/:customerId', orders.read)

router
  .get('/banners', banners.index)
  .get('/bannerbytype', banners.bannerbytype)
  .get('/banner/:id', banners.show)
  .get('/banner', banners.showby)
  .post('/banner', banners.create)
  .post('/banner/:id', banners.update)
  .delete('/banner/:id', banners.delete)
  .delete('/banners', banners.deleteall);
  
module.exports = router;