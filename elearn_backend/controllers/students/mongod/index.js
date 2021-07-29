let Student = require('../../../database/mongodb/models/student');
let serialize = require('./serializer'); // serializer custom to db

let listStudents = () => {
  return Student.find({})
    .then(serialize);
}

let findStudent = (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return Student.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
    });

  // this code is smarter but can't wait to serialize data
  // return Student.find({[prop]: val}, (err, resp) => {
  //   if(err) throw err;
  //   console.log("Find ", resp);
  //   return serialize(resp[0]);
  // });
}

let findStudentsBy = (prop, val) => {
  if (prop === 'id')
    prop = '_id';
  return Student.find({[prop]: val})
    .then(serialize);
}

let addStudent = (studentInfo) => {
  // let student = makeStudent(studentInfo)
  // let newStudent = {
  //   name: student.getName(),
  //   grade: student.getGrade(),
  //   age: student.getAge(),
  //   prefect: student.isPrefect()
  // }
  return Student.create(studentInfo)
    .then(serialize);
}

let updateStudent = (id, studentInfo) => {
  console.log(id, studentInfo)
  return Student.findByIdAndUpdate(id, studentInfo)
    .then(serialize);
}

let deleteStudent = (id) => {
  return Student.findByIdAndDelete(id)
    .then(resp => {
      return {
        id: resp._id.toString(),
        status: 'SUCCESS',
        message: 'Delete Successful'
      }
    })
    .catch(err => {
      return { 
        status: 'FAIL',
        message: 'Delete Unsuccessful' 
      }
    })
}

let dropAll = () => {
  return Student.remove();
}

module.exports = {
  listStudents,
  findStudent,
  findStudentsBy,
  addStudent,
  updateStudent,
  deleteStudent,
  dropAll
};

