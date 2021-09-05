const express = require('express');
const router = express.Router();

// api routing
const dev = require('./develop');
const users = require('./user');
const userRoles = require('./user-role');
const students = require('./student');
const townships = require('./township');
const cities = require('./city');
const product_cat = require('./product_category')
const product_inv = require('./product_inventory')
const discounts = require('./discount')
const products = require('./product')
const carts = require('./cart')
const orders = require('./order')
const banners = require('./banner');
const customers = require('./customer');
const suppliers = require('./supplier');

// schema vialidation
const validateware = require('./../../../../middlewares/validator');
const studentSchema = require('./../../../../models/students/student-schema');
const { constructOrder, updateStock, verifyStock } = require('../../../../middlewares/cart_to_order')

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
  .get('/product_categories', product_cat.index)
  .get('/product_category/:id', product_cat.show)
  .get('/product_category', product_cat.showby)
  .post('/product_category', product_cat.create)
  .post('/product_category/:id', product_cat.update)
  .delete('/product_category/:id', product_cat.delete)
  .delete('/product_categories', product_cat.deleteall);

router
  .get('/product_inventories', product_inv.index)
  .get('/product_inventory/:id', product_inv.show)
  .get('/product_inventory', product_inv.showby)
  .post('/product_inventory', product_inv.create)
  .post('/product_inventory/:id', product_inv.update)
  .delete('/product_inventory/:id', product_inv.delete)
  .delete('/product_inventories', product_inv.deleteall);

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
  .get('/carts', carts.index)
  .get('/cart/:id', carts.show)
  .get('/cart', carts.showby)
  .post('/cart', carts.create)
  .post('/cart/:id', carts.update)
  .delete('/cart', carts.delete)
  .delete('/carts', carts.deleteall);

router
  .post('/order',
    constructOrder,
    verifyStock,
    updateStock,
    carts.delete, orders.create
  )
  .get('/orders', orders.index)
  .get('/order/:id', orders.show)
  .get('/order', orders.showby)
  .delete('/order/:id', orders.delete)
  .delete('/orders', orders.deleteall);


router
  .get('/banners', banners.index)
  .get('/banner/:id', banners.show)
  .get('/banner', banners.showby)
  .post('/banner', banners.create)
  .post('/banner/:id', banners.update)
  .delete('/banner/:id', banners.delete)
  .delete('/banners', banners.deleteall)

router
  .get('/suppliers', suppliers.index)
  .get('/supplier/:id', suppliers.show)
  .get('/supplier', suppliers.showby)
  .post('/supplier', suppliers.create)
  .post('/supplier/:id', suppliers.update)
  .delete('/supplier/:id', suppliers.delete)
  .delete('/suppliers', suppliers.deleteall);

router
  .get('/customers', customers.index)

module.exports = router;