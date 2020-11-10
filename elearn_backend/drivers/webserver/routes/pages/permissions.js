const express = require('express');
const router = express.Router();
const connect = require('connect-ensure-login');
const program = require("../../../../config/program.json");
let permissionsDb = require('../../../../controllers/permissions-db');
// let usersDb = require('../../../../controllers/users-db');

router.get('/permissions', 
  connect.ensureLoggedIn(),
  (req, res, next) => {
    // menu or program permission function call coming ...
    // list permission function call comming ...
    // url obj would be deprecated soon, through replaced by list permission
    let permission = program;
    console.log(permission.menu.admin.submenu[1])
    let url = {
      entry: './permission',
    };
    res.render('pages/permissions', { url: url, page: permission.menu.admin.submenu[1], program: permission });
  }
);

router.get('/permission/:id?', 
  connect.ensureLoggedIn(),
  async (req, res, next) => {
    const actionDefaults = ["add", "edit", "delete"];
    let data = {};
    let params = {};
    let permission = program;
    console.log("ID ", req.params.id);
    if (req.params.id && typeof req.params.id === "string") {
      data = await permissionsDb.findPermission('id', req.params.id);

      console.log(data);

      params = {
        id: data.id,
        name: data.name,
        description: data.description
      };

      console.log("Params ", params);

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
                item.actions = actions; // reassign to actions after processing
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
      // console.log(keys);
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
      // const id = req.body.id;
      // const {['id']: removed, ...data} = req.body;
      // db =  permissionsDb.addPermission(body.id, data);
      console.log("updated");
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
    // console.log("Data ", JSON.stringify(data));
    // End //

    // Object.entries(body).forEach(([key, value]) => {
    //   console.log(`${key}: ${value}`)
    //   const keys = key.split('_');
    //   // console.log(keys);
    //   if(keys && keys.length === 1) {
    //     data = {
    //       ...data,
    //       [keys[0]]: value
    //     }
    //   }
    //   else if(keys && keys.length === 3) {
    //     //
    //     // const msg = makeMenu();
    //     menu = {
    //       ...menu,
    //       [keys[2]]: makeMenu(keys[2])
    //     };
    //     // console.log(msg);
    //   }
    //   else if(keys && keys.length === 5) {
    //     makeSubMenu(keys[0], keys[3], keys[4]);
    //   }
    // });

    // console.log("Data ", data);
    // console.log("Menu ", menu);

    // (req.body.prefect == "1") 
    //   ? req.body.prefect = true
    //   : req.body.prefect = false;

    // if (!req.body.id) { // insert data 
    //   db = studentsDb.addStudent(req.body);
    // }
    // else { // update data
    //   const id = req.body.id;
    //   const {['id']: removed, ...data} = req.body;
    //   db =  studentsDb.updateStudent(req.body.id, data);
    // }
    // db.then(result => {
    //   if (result != null)
    //     status = "SUCCESS"
    //   res.json({ status: status, data: result });
    // })
    // .catch(error => {
    //   console.log(`Error ${error}`);
    //   res.json({ status: status, data: error });
    // });
  }
);

// function createSubMenu (menu_data, submenu_data) {
//   console.log(submenu_data[0], submenu_data[3], submenu_data[4]);

//   console.log("data menu", menu_data);

//   const findmenu_data = findMenu(menu_data, submenu_data[3]);
//   console.log("find menu ", findmenu_data);
// }

// function findMenu(menu, submenu) {
//   return menu.find((item) => { return item.menu == submenu});
// }

// function makeMenu(menu) {
//   let permission = program;
//   let returnMenu = {};
//   Object.entries(permission.menu).forEach(([key, value]) => {
//     // console.log(`${key} : `, value);
//     if (typeof key === "string" && typeof menu === "string" && key === menu) {
//       // const {submenu: removed, ...filterMenu} = value;
//       value.access = 1;
//       returnMenu = value;
//       return true;
//     }
//   });
//   // console.log(returnMenu);
//   return returnMenu;
// }

// function makeSubMenu(action, menu_name, submenu_name) {
//   Object.entries(menu).forEach(([key1, value1]) => {
//     // console.log(`${key1} : `, value1);
//     if (typeof key1 === "string" && typeof menu_name === "string" && key1 === menu_name) {
//       if(value1.submenu && value1.submenu.length) {
//         value1.submenu.forEach((value2, index2) => {
//           console.log(value2);
//         });
//       }
//     }
//   });
// }

module.exports = router;
