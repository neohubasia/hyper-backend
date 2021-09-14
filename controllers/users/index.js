let {
  listUsers,
  findUser,
  findUserBy,
  addUser,
  updateUser,
  deleteUser
}
  = require('./mongod/index')


let exportDb = {
  listUsers,
  findUser,
  findUserBy,
  addUser,
  updateUser,
  deleteUser
};

module.exports = exportDb;