const express = require('express');
const router = express.Router();
const connect = require('connect-ensure-login');
const { Handlers } = require('../../../../middlewares/generator');
const config = require("../../../../config/index");
const program = require("../../../../config/program.json");
let usersDb = require('../../../../controllers/users');

router.get('/getuser', connect.ensureLoggedIn(), (req, res, next) => {
  res.send({user: req.user});
});

router.get('/users', 
  connect.ensureLoggedIn(),
  (req, res, next) => {
    // menu or program permission function call coming ...
    // list permission function call comming ...
    // url obj would be deprecated soon, through replaced by list permission
    let permission = program;
    console.log(permission.menu.admin.submenu[0])
    let url = {
      entry: './user',
    };
    res.render('pages/users', {
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      url: url,
      page: permission.menu.admin.submenu[0],
      program: permission });
  }
);

router.get('/user/:id?', 
  connect.ensureLoggedIn(),
  async (req, res, next) => {
    let data = {};
    let permission = program;
    let url = {
      list: '/users',
      post: '/user'
    };
    if (req.params.id)
      data = await usersDb.findUser('id', req.params.id);
    res.render('pages/user-entry', { url: url, page: permission.menu.admin.submenu[0], program: program, data: data });
  }
)
.post('/user',
  (req, res, next) => {
    let db, status = "FAIL"; 

    console.log("Request ", req.body);

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
