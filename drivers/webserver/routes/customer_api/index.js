const express = require('express');
const router = express.Router();
const _jwt = require('../../../../middlewares/jwt');


// api routing
const dev = require('./develop');

const customers=require('./customer')

// schema vialidation
const validateware = require('./../../../../middlewares/validator');
const studentSchema = require('./../../../../models/students/student-schema');
const {findAndConstructOrder,updateStock,verifyStock} = require('../../../../middlewares/cartToOrder')


router
  .post('/customer_signup',customers.create)
  .post('/customer_login',customers.login)
  .get('/customer/:id',_jwt.checkToken, customers.read)


module.exports = router;