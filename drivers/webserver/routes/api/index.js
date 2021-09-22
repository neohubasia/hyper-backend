const express = require('express');
const router = express.Router();

// api routing
const dev = require('./develop');
const users = require('./user');
const cities = require('./city');
const carts = require('./cart');
const orders = require('./order');
const coupons = require('./coupon');
const banners = require('./banner');
const customers = require('./customer');
const suppliers = require('./supplier');
const townships = require('./township');
const userRoles = require('./user-role');
const students = require('./student');
const discounts = require('./discount');
const products = require('./product');
const templates = require('./template');
const product_cat = require('./product_category')
const product_inv = require('./product_inventory')
const payment_methods = require('./payment_method');
const product_packages = require('./product_package');
const product_weights = require('./product_weight');
const delivery_companies = require('./delivery_company');
const delivery_charges = require('./delivery_charge');


// schema vialidation
const validateware = require('./../../../../middlewares/validator');
const studentSchema = require('../../validations/students/student-schema');
const { constructOrder, updateStock, verifyStock } = require('../../../../middlewares/cart_to_order')

router
  .get('/user-roles', userRoles.index); // working with json

router
  .get('/users', users.index)
  .get('/user/:id', users.show)
  .get('/user', users.showby)
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
  .get('/coupons', coupons.index)
  .get('/coupon/:id', coupons.show)
  .get('/coupon', coupons.showby)
  .post('/coupon', coupons.create)
  .post('/coupon/:id', coupons.update)
  .delete('/coupon/:id', coupons.delete)
  .delete('/coupons', coupons.deleteall);

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
  .delete('/cart', carts.deleteBy)
  .delete('/carts', carts.deleteall)
  .patch('/cart', carts.updateMany);

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
  .delete('/orders', orders.deleteall)
  .post('/order/status', orders.updateStatus)
  .get('/order_reports',orders.orderReports)


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
  .get('/payment_methods', payment_methods.index)
  .get('/payment_method/:id', payment_methods.show)
  .get('/payment_method', payment_methods.showby)
  .post('/payment_method', payment_methods.create)
  .post('/payment_method/:id', payment_methods.update)
  .delete('/payment_method/:id', payment_methods.delete)
  .delete('/payment_methods', payment_methods.deleteall);

router
  .get('/product_packages', product_packages.index)
  .get('/product_package/:id', product_packages.show)
  .get('/product_package', product_packages.showby)
  .post('/product_package', product_packages.create)
  .post('/product_package/:id', product_packages.update)
  .delete('/product_package/:id', product_packages.delete)
  .delete('/product_packages', product_packages.deleteall);

router
  .get('/product_weights', product_weights.index)
  .get('/product_weight/:id', product_weights.show)
  .get('/product_weight', product_weights.showby)
  .post('/product_weight', product_weights.create)
  .post('/product_weight/:id', product_weights.update)
  .delete('/product_weight/:id', product_weights.delete)
  .delete('/product_weights', product_weights.deleteall);

router
  .get('/delivery-companies', delivery_companies.index)
  .get('/delivery-company/:id', delivery_companies.show)
  .get('/delivery-company', delivery_companies.showby)
  .post('/delivery-company', delivery_companies.create)
  .post('/delivery-company/:id', delivery_companies.update)
  .delete('/delivery-company/:id', delivery_companies.delete)
  .delete('/delivery-companies', delivery_companies.deleteall)

router
  .get('/delivery-charges', delivery_charges.index)
  .get('/delivery-charge/:id', delivery_charges.show)
  .get('/delivery-charge', delivery_charges.showby)
  .post('/delivery-charge', delivery_charges.create)
  .post('/delivery-charge/:id', delivery_charges.update)
  .delete('/delivery-charge/:id', delivery_charges.delete)
  .delete('/delivery-charges', delivery_charges.deleteall)

router
  .get('/templates', templates.index)
  .get('/template/:id', templates.show)
  .get('/template', templates.showby)
  .post('/template', templates.create)
  .post('/template/:id', templates.update)
  .delete('/template/:id', templates.delete)
  .delete('/templates', templates.deleteall);


router
  .get('/customers', customers.index)

module.exports = router;