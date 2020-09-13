let {
    listUsers,
    findUser,
    addUser,
    updateUser
  } 
  = require('./mongod/index')
  
  
  let usersDb = {
    listUsers,
    findUser,
    addUser,
    updateUser
  };
  
  module.exports = usersDb
  