const express = require("express");
const router = express.Router();

// api routing
const customers = require("./customer");

// schema vialidation
const validateware = require("../../../../middlewares/validator");

router
  .post("/customer_signup", customers.create)
  .post("/customer_login", customers.login)
  .get("/customer/:id", customers.read);

module.exports = router;
