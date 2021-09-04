let Supplier = require('../../../database/mongodb/models/supplier');
let serialize = require('./serializer'); // serializer custom to db

let listData = () => {
  return Supplier.find({})
    .then(serialize);
}

let findData = (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return Supplier.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
    });
}

let findDataBy = (params) => {
  return Supplier.find(params)
    .then(serialize);
}

let addData = (dataObj) => {
  return Supplier.create(dataObj)
    .then(serialize);
}

let updateData = (id, dataObj) => {
  return Supplier.findByIdAndUpdate(id, dataObj)
    .then(serialize);
}

let deleteData = (id) => {
  return Supplier.findByIdAndDelete(id)
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
  return Supplier.remove();
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

