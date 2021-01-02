const express = require('express');
const router = express.Router();
const connect = require('connect-ensure-login');
const { Handlers } = require('../../../../middlewares/generator');
const config = require("../../../../config/index");
const program = require("../../../../config/program.json");
let permissionsDb = require('../../../../controllers/permissions');

router.get('/permissions', 
  connect.ensureLoggedIn(),
  (req, res, next) => {
    console.log(req.user);

    // menu or program permission function call coming ...
    // list permission function call comming ...
    // url obj would be deprecated soon, through replaced by list permission
    let permission = program;
    console.log(permission.menu.admin.submenu[1])
    let url = {
      entry: './permission',
    };
    res.render('pages/permissions', { 
      token: Handlers.generateTokenSign(config.jwt.credential.USERNAME),
      url: url,
      page: permission.menu.admin.submenu[1],
      program: permission
    });
  }
);

router.get('/permission/:id?', 
  connect.ensureLoggedIn(),
  async (req, res, next) => {
    const actionDefaults = ["add", "edit", "delete"];
    let data = {};
    let params = {};
    let permission = program;
    if (req.params.id && typeof req.params.id === "string") {
      data = await permissionsDb.findPermission('id', req.params.id);
      params = {
        id: data.id,
        name: data.name,
        description: data.description
      };

      Object.entries(permission.menu).forEach(([key, value]) => {

        const findmenu = data.menu.find((menu) => { return menu.menu == key }); // find menu if access or not

        if(findmenu && typeof findmenu === "object") {
          value.access = 1; // access menu
          Object.entries(value).forEach(([key, subvalue]) => {
            if (key == "submenu") { // manage access for submenu [add, edit, delete]
              subvalue.map((item) => {
                let actions = {};
                const findsubmenu = findmenu.submenu.find((submenu) => { return submenu.submenu == item.name });
                actionDefaults.map((action) => {
                  if (findsubmenu.access.indexOf(action) != -1) {
                    actions = { // access submenu [add, edit, delete]
                      ...actions,
                      [action]: 1
                    };
                  }
                  else { // no access submenu [add, edit, delete]
                    actions = {
                      ...actions,
                      [action]: 0
                    };
                  }
                });
                item.actions = actions; // re-assign to actions after processing
              });
            }
          });
        }
      });

      let url = {
        list: '/permissions',
        post: '/permission'
      };
      res.render('pages/permission-entry', { url: url, page: permission.menu.admin.submenu[1], params: params, program: program, data: JSON.stringify(permission) });
    }
    else {
      let url = {
        list: '/permissions',
        post: '/permission'
      };
      Object.entries(permission.menu).forEach(([key, value]) => {
        Object.entries(value).forEach(([key, subvalue]) => {
          if (key == "access") {
            value.access = 0;
          }
          else if (key == "submenu") {
            subvalue.map((item) => {
              item.access = 0;
              item.actions = { "add": 0, "edit": 0, "delete": 0 };
            });
          }
        });
      });
      res.render('pages/permission-entry', { url: url, page: permission.menu.admin.submenu[1], params: params, program: program, data: JSON.stringify(permission) });
    }
  }
)
.post('/permission',
  (req, res, next) => {
    let db, data = {}; menu = [], status = "FAIL";
    let body = req.body;

    Object.entries(body).forEach(([key, value]) => {
      const keys = key.split('_');
      if (keys && keys.length === 1) {
        data = {
          ...data,
          [keys[0]]: value
        }
      }
      else if (keys && keys.length === 3) {
        menu.push({
          menu: keys[2],
          submenu: []
        });
      }
      else if (keys && keys.length === 5) {
        const findmenu = menu.find((item) => { return item.menu == keys[3]});
        if (findmenu && findmenu.submenu.length > 0) {
          const findsubmenu = findmenu.submenu.find((item) => { return item.submenu == keys[4]});
          if (findsubmenu) {
            findsubmenu.access.push(keys[0]);
          }
          else {
            findmenu.submenu.push({
              submenu: keys[4],
              access: [keys[0]]
            });
          }
        }
        else {
          findmenu.submenu.push({
            submenu: keys[4],
            access: [keys[0]]
          });
        }
      }
    });
    data.menu = menu;

    if (!body.id) { // insert data
      console.log("Data ", data);
      db = permissionsDb.addPermission(data);
    }
    else { // update data
      const id = req.body.id;
      const {['id']: removed, ...updateData} = data;
      db = permissionsDb.updatePermission(id, updateData);
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
