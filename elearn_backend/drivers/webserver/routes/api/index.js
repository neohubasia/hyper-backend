const express = require('express');
const router = express.Router();

const validateware = require('./../../../../middlewares/validator');

const students = require('./students');
const teachers = require('./teachers');

const studentSchema = require('./../../../../models/student/student-schema');

router
  .get('/students', students.index)
  .get('/students/:id', students.show)
  .post('/students', validateware(studentSchema), students.create);

router
  .get('/teachers', teachers.index)
  .get('/teachers/:id', teachers.show)
  .post('/teachers', teachers.create);
  

module.exports = router;