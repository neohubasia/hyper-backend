let studentsDb = require('../../../../controllers/students');

let students = module.exports = {};

students.index = (req, res, next) => {
  studentsDb.listStudents()
    .then(data => {
      res.json({
        status: "SUCCESS",
        data: data
      });
    })
    .catch(err => {
      console.log(`Error ${err}`)
      res.json({
        status: "FAIL",
        data: err
      })
    });
}

students.show = (req, res, next) => {
  studentsDb.findStudent('id', req.params.id)
    .then(data => {
      res.json({
        status: "SUCCESS",
        data: data
      });
    })
    .catch(err => {
      console.log(`Error ${err}`)
      res.json({
        status: "FAIL",
        data: err
      })
    });
}

students.showby = (req,res, next) => {
  let obj = [];
  Object.keys(req.query).map(function(i){ 
    obj.push({ prop: i, val: req.query[i]});
  })
  console.log("OBJ ", obj)
  studentsDb.findStudentsBy(obj[0]['prop'], obj[0]['val'])
    .then(data => {
      res.json({
        status: "SUCCESS",
        data: data
      });
    })
    .catch(err => {
      console.log(`Error ${err}`)
      res.json({
        status: "FAIL",
        data: err
      })
    });
}

students.create = (req, res, next) => {
  studentsDb.addStudent(req.body)
    .then(data => {
      res.json({
        status: "SUCCESS",
        data: data
      });
    })
    .catch(err => {
      console.log(`Error ${err}`)
      res.json({
        status: "FAIL",
        data: err
      })
    });
}

students.update = (req, res, next) => {
  studentsDb.updateStudent(req.params.id, req.body)
    .then(data => {
      res.json({
        status: "SUCCESS",
        data: data
      });
    })
    .catch(err => {
      console.log(`Error ${err}`)
      res.json({
        status: "FAIL",
        data: err
      })
    });
}

students.delete = (req, res, next) => {
  studentsDb.deleteStudent(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
}

students.deleteall = (req, res, next) => {
  studentsDb.dropAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
}