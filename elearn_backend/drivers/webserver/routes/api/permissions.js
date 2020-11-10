let permissionsDb = require('../../../../controllers/permissions-db');

let permissions = module.exports = {};

permissions.index = (req, res, next) => {
  permissionsDb.listPermissions()
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

permissions.create = (req, res, next) => {
  permissionsDb.addPermission()
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
