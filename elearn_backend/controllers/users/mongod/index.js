const { async } = require('validate.js');
let User = require('../../../database/mongodb/models/user');
let serialize = require('./serializer'); // serializer custom to db

let listUsers = () => {
  return User.find({})
    .then(serialize);
}

let findUser = (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return User.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
  });
}

let addUser = (userInfo) => {
  return User.register({username: userInfo.username, active: false}, userInfo.password)
   .then(serialize);
}

let updateUser = async (id, userInfo) => {
  const newpassword = userInfo.password;
  delete(userInfo.password);
  return User.findByIdAndUpdate(id, userInfo)
    .then(async resp => {
      await resp.setPassword(newpassword);
      const updatedUser = await resp.save();
      return serialize(updatedUser);
    });
}

module.exports = {
  listUsers,
  findUser,
  addUser,
  updateUser
};