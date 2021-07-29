const express = require('express');
const router = express.Router();
const connect = require('connect-ensure-login');
const { Handlers } = require('../../../../middlewares/generator');
const config = require("../../../../config/index");
const menuAccess = require("../../../../librarys/menu-access");
let studentsDb = require('../../../../controllers/students');

router.get('/students', 
  connect.ensureLoggedIn(),
  (req, res, next) => {
    res.render('pages/students', {
      ...menuAccess.getProgram(req.user.role, "courseMenu.studentSubMenu.list"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app
    });
  }
);

router.get('/student/:id?', 
  connect.ensureLoggedIn(),
  async (req, res, next) => {
    let data = {};
    if (req.params.id)
      data = await studentsDb.findStudent('id', req.params.id);
    
    res.render('pages/student-entry', {
      ...menuAccess.getProgram(req.user.role, "courseMenu.studentSubMenu.entry"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data
    });

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
