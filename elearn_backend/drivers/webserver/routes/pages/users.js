const express = require('express');
const router = express.Router();
const connect = require('connect-ensure-login');
const { Handlers } = require('../../../../middlewares/generator');
const config = require("../../../../config/index");
const menuAccess = require("../../../../librarys/menu-access");
let usersDb = require('../../../../controllers/users');

router.get('/getuser', connect.ensureLoggedIn(), (req, res, next) => {
  res.send({user: req.user});
});

router.get('/users', 
  connect.ensureLoggedIn(),
  (req, res, next) => {
    res.render('pages/users', {
      ...menuAccess.getProgram(req.user.role, "adminMenu.userSubMenu.list"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app
    });
  }
);

router.get('/user/:id?', 
  connect.ensureLoggedIn(),
  async (req, res, next) => {
    let data = {};
    if (req.params.id)
      data = await usersDb.findUser('id', req.params.id);
    
    res.render('pages/user-entry', {
      ...menuAccess.getProgram(req.user.role, "adminMenu.userSubMenu.entry"), // admin may change on req.user => role
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      app: config.app,
      data: data
    });
  }
)
.post('/user',
  (req, res, next) => {
    let db, status = "FAIL"; 

    if (!req.body.id) { // insert data
      db = usersDb.addUser(req.body);
    }
    else { // update data
      const id = req.body.id;
      const {['id']: removed, ...data} = req.body;
      db =  usersDb.updateUser(req.body.id, data);
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
