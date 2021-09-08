let Productpackage = require('../../../database/mongodb/models/product_package');
let serialize = require('./serializer'); // serializer custom to db

let listData = () => {
  return Productpackage.find({})
    .then(serialize);
}

let findData = (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return Productpackage.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
    });
}

let findDataBy = (params) => {
  return Productpackage.find(params)
    .then(serialize);
}

let addData = (dataObj) => {
  return Productpackage.create(dataObj)
    .then(serialize);
}

let updateData = (id, dataObj) => {
  return Productpackage.findByIdAndUpdate(id, dataObj)
    .then(serialize);
}

let deleteData = (id) => {
  return Productpackage.findByIdAndDelete(id)
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

let dropAll = () => {
  return Productpackage.remove();
}

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll
};

