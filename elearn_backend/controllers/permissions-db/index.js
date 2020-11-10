let {
  listPermissions,
  findPermission,
  addPermission
}  = require('./mongod/index');

let permissionsDb = {
  listPermissions,
  findPermission,
  addPermission
};

module.exports = permissionsDb;