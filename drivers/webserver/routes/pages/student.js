const express = require('express');
const router = express.Router();
const fs = require('fs');
const connect = require('connect-ensure-login');
const config = require("../../../../config/index");
const { Handlers } = require('../../../../middlewares/generator');
const menuAccess = require("../../../../librarys/menu-access");
let StudentsDb = require('../../../../controllers/student');

router.get('/students',
  connect.ensureLoggedIn(),
  (req, res, next) => {
    res.render('pages/student-list', {
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
      data = await StudentsDb.findData('id', req.params.id);

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
    // const result = await StudentsDb.findStudent('id', req.params.id);
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
      let remove_images = req.body.remove_images || [];
      req.body.profile_images = req.body.profile_images || [];

      if (remove_images && remove_images.length > 0) {
        remove_images.map((file, fileIdx) => {
          // console.log(file.replace(/\\/g, "/"));
          // fs.unlinkSync(file.replace(/\\/g, "/"));

          fs.unlink('./public' + file.replace(/\\/g, "/"), function (err) {
            if (err)
              console.error("File Unlink Error", err);
            else
              console.log(fileIdx, 'File has been Deleted');
          });
        });
      }

      // (req.body.prefect == "1")  // no longer need, it's already ok
      //   ? req.body.prefect = true
      //   : req.body.prefect = false;

      if (!req.body.id) { // insert data 
        db = StudentsDb.addData(req.body);
      }
      else { // update data
        const id = req.body.id;
        const { ['id']: removed, ...data } = req.body;
        db = StudentsDb.updateData(req.body.id, data);
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
