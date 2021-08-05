let {
  listUsers,
  findUser,
  addUser,
  updateUser,
  deleteUser
}
  = require('./mongod/index')
  
  
let usersDb = {
  listUsers,
  findUser,
  addUser,
  updateUser,
  deleteUser
};
  
module.exports = usersDb;