let ProductWeight = require('../../../database/mongodb/models/product_weight');
let serialize = require('./serializer'); // serializer custom to db

let listData = () => {
  return ProductWeight.find({})
    .then(serialize);
}

let findData = (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return ProductWeight.find({ [prop]: val })
    .then(resp => {
      return serialize(resp[0])
    });
}

let findDataBy = (params) => {
  return ProductWeight.find(params)
    .then(serialize);
}

let addData = (dataObj) => {
  return ProductWeight.create(dataObj)
    .then(serialize);
}

let updateData = (id, dataObj) => {
  return ProductWeight.findByIdAndUpdate(id, dataObj)
    .then(serialize);
}

let deleteData = (id) => {
  return ProductWeight.findByIdAndDelete(id)
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
  return ProductWeight.remove();
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

