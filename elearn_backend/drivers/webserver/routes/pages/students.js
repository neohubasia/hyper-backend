const express = require('express');
const router = express.Router();
const connect = require('connect-ensure-login');
const program = require("../../../../config/program.json");
let studentsDb = require('../../../../controllers/students-db');

router.get('/students', 
  connect.ensureLoggedIn(),
  (req, res, next) => {
    // menu or program permission function call coming ...
    // list permission function call comming ...
    // url obj would be deprecated soon, through replaced by list permission
    let permission = program;
    console.log(permission.menu.course.submenu[1])
    let url = {
      entry: './student',
    };
    res.render('pages/students', { url: url, page: permission.menu.course.submenu[1], program: permission });
  }
);

router.get('/student/:id?', 
  connect.ensureLoggedIn(),
  async (req, res, next) => {
    let data = {};
    let url = {
      list: '/students',
      post: '/student'
    };
    if (req.params.id)
      data = await studentsDb.findStudent('id', req.params.id);
    res.render('pages/student-entry', { url: url, program: program, data: data });

    // this code is smarter but can't serialize data
    // try {
    //   let data = {};
    //   if (req.params.id) {
        // const result = await studentsDb.findStudent('id', req.params.id);
    //       if (result)
    //         data = result[0];
    //   }
    //   console.log("Data ", data)
    //   res.render('pages/student-entry', { title: 'Student Entry', data: data });
    // }
    // catch (error) {
    //   console.log(`Error ${error}`);
    //   next(error);
    // }
  }
)
.post('/student',
  (req, res, next) => {
    let db, status = "FAIL"; 

    (req.body.prefect == "1") 
      ? req.body.prefect = true
      : req.body.prefect = false;

    if (!req.body.id) { // insert data 
      db = studentsDb.addStudent(req.body);
    }
    else { // update data
      const id = req.body.id;
      const {['id']: removed, ...data} = req.body;
      db =  studentsDb.updateStudent(req.body.id, data);
    }
    db.then(result => {
      if (result != null)
        status = "SUCCESS"
      res.json({ status: status, data: result });
    })
    .catch(error => {
      console.log(`Error ${error}`);
      res.json({ status: status, data: error });
    });
  }
);

module.exports = router;
