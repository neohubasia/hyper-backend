let DeliveryCompany = require('../../../database/mongodb/models/delivery_company');
let serialize = require('./serializer'); // serializer custom to db

let listData = () => {
  return DeliveryCompany.find({})
    .then(serialize);
}

let findData = (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return DeliveryCompany.find({ [prop]: val })
    .then(resp => {
      return serialize(resp[0])
    });
}

let findDataBy = (params) => {
  return DeliveryCompany.find(params)
    .then(serialize);
}

let addData = (dataObj) => {
  return DeliveryCompany.create(dataObj)
    .then(serialize);
}

let updateData = (id, dataObj) => {
  return DeliveryCompany.findByIdAndUpdate(id, dataObj)
    .then(serialize);
}

let deleteData = (id) => {
  return DeliveryCompany.findByIdAndDelete(id)
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
  return DeliveryCompany.remove();
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

