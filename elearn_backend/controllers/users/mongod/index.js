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
  return User.register({
    username: userInfo.username,
    role: userInfo.role,
    active: true,
  }, userInfo.password)
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

let deleteUser = (id) => {
  return User.findByIdAndDelete(id)
    .then(resp => {
      return {
        id: resp._id.toString(),
        status: 'SUCCESS',
        message: 'Delete Successful'
      }
    })
    .catch(err => {
      return { 
        status: 'FAIL',
        message: 'Delete Unsuccessful' 
      }
    })
}

module.exports = {
  listUsers,
  findUser,
  addUser,
  updateUser,
  deleteUser
};