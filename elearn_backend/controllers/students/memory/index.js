let STUDENTS = require('../../../db/memory/students'); // DB
let serialize = require('./serializer'); // serializer custom to db

let listData = () => {
  return Promise.resolve(serialize(STUDENTS))
}

let findData = (prop, val) => {
  if (prop === 'id') { prop = 'serial' }
  let student = STUDENTS.find(student => student[prop] == val)
  return Promise.resolve(serialize(student))
}

let findDataBy = (prop, val) => {
  if (prop === 'grade') {prop = 'year'}
  let student = STUDENTS.filter(student => student[prop] == val)
  return Promise.resolve(serialize(student))
}

let addData = (studentInfo) => {
  STUDENTS.push(studentInfo)
  return findStudent('serial', newStudent.serial)
}

let deleteData = (id) => {
  return findStudent({id})
    .then(student => {
      if (student.id == id) {
        STUDENTS = STUDENTS.filter(student => student.serial != id)
        return {
          id,
          status: 'success'
        }
      }
      return {
        status: 'fail'
      }
    })
}

let dropAll = () => {
  STUDENTS = [];
  return STUDENTS;
}

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  deleteData,
  dropAll
};
