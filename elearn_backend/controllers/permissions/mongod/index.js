let Permission = require('../../../database/mongodb/models/permission');
let serialize = require('./serializer'); // serializer custom to db

let listPermissions = () => {
  return Permission.find({})
    .then(serialize);
}

let findPermission = (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return Permission.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
    });
}

let addPermission = (permissionInfo) => {
  return Permission.create(permissionInfo)
    .then(serialize);
};

let updatePermission = (id, permissionInfo) => {
  console.log(id);
  console.log(permissionInfo);
  return Permission.findByIdAndUpdate(id, permissionInfo)
    .then(serialize);
}

module.exports = {
  listPermissions,
  findPermission,
  addPermission,
  updatePermission
};