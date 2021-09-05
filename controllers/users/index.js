let {
  listUsers,
  findUser,
  addUser,
  updateUser,
  deleteUser
}
  = require('./mongod/index')


let exportDb = {
  listUsers,
  findUser,
  addUser,
  updateUser,
  deleteUser
};

module.exports = exportDb;