const express = require('express');
const router = express.Router();

// api routing
const dev = require('./develop');
const users = require('./user');
const userRoles = require('./user-role');
const students = require('./student');
const townships = require('./township');
const cities = require('./city');

// schema vialidation
const validateware = require('./../../../../middlewares/validator');
const studentSchema = require('./../../../../models/students/student-schema');

router
  .get('/users', users.index);

router
  .get('/user-roles', userRoles.index);

router
  .get('/students', students.index)
  .get('/student/:id', students.show)
  .get('/student', students.showby)
  .post('/student', validateware(studentSchema), students.create)
  .post('/student/:id', validateware(studentSchema), students.update)
  .delete('/student/:id', students.delete)
  .delete('/students', students.deleteall);

router
  .get('/townships', townships.index)
  .get('/township/:id', townships.show)
  .get('/township', townships.showby)
  .post('/township', townships.create)
  .post('/township/:id', townships.update)
  .delete('/township/:id', townships.delete)
  .delete('/students', townships.deleteall);

router
  .get('/cities', cities.index)
  .get('/city/:id', cities.show)
  .get('/city', cities.showby)
  .post('/city', cities.create)
  .post('/city/:id', cities.update)
  .delete('/city/:id', cities.delete)
  .delete('/cities', cities.deleteall);


module.exports = router;