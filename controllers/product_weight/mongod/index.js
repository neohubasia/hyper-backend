let Productweight = require('../../../database/mongodb/models/product_weight');
let serialize = require('./serializer'); // serializer custom to db

let listData = () => {
  return Productweight.find({})
    .then(serialize);
}

let findData = (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return Productweight.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
    });
}

let findDataBy = (params) => {
  return Productweight.find(params)
    .then(serialize);
}

let addData = (dataObj) => {
  return Productweight.create(dataObj)
    .then(serialize);
}

let updateData = (id, dataObj) => {
  return Productweight.findByIdAndUpdate(id, dataObj)
    .then(serialize);
}

let deleteData = (id) => {
  return Productweight.findByIdAndDelete(id)
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
  return Productweight.remove();
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

