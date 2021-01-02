let {
  listPermissions,
  findPermission,
  addPermission,
  updatePermission
}  = require('./mongod/index');

let permissionsDb = {
  listPermissions,
  findPermission,
  addPermission,
  updatePermission
};

module.exports = permissionsDb;