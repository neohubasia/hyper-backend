const express = require('express');
const router = express.Router();

const validateware = require('./../../../../middlewares/validator');

const users = require('./users');
const permissions = require('./permissions');
const students = require('./students');

const studentSchema = require('./../../../../models/student/student-schema');

router
  .get('/users', users.index);

router
  .get('/permissions', permissions.index)
  .post('/permission', permissions.create)
  .post('/permission/:id', permissions.update)

router
  .get('/students', students.index)
  .get('/student/:id', students.show)
  .get('/student', students.showby)
  .post('/student', validateware(studentSchema), students.create)
  .post('/student/:id', validateware(studentSchema), students.update)
  .delete('/student/:id', students.delete)
  .delete('/students', students.deleteall);

module.exports = router;