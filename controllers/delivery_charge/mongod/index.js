let DeliveryCharge = require('../../../database/mongodb/models/delivery_charge');
let serialize = require('./serializer'); // serializer custom to db

let listData = () => {
  return DeliveryCharge.find({})
    .populate({
      "path": "townshipid",
      "model": "township",
      "select": "township_mm"
    })
    .populate({
      "path": "companyid",
      "model": "delivery_company",
      "select": "company_name"
    })
    .then(serialize);
}

let findData = (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return DeliveryCharge.find({ [prop]: val })
    .populate({
      "path": "townshipid",
      "model": "township",
      "select": "township_mm"
    })
    .populate({
      "path": "companyid",
      "model": "delivery_company",
      "select": "company_name"
    })
    .then(resp => {
      return serialize(resp[0])
    });
}

let findDataBy = (params) => {
  return DeliveryCharge.find(params)
    .populate({
      "path": "townshipid",
      "model": "township",
      "select": "township_mm"
    })
    .populate({
      "path": "companyid",
      "model": "delivery_company",
      "select": "company_name"
    })
    .then(serialize);
}

let addData = (dataObj) => {
  return DeliveryCharge.create(dataObj)
    .then(serialize);
}

let updateData = (id, dataObj) => {
  return DeliveryCharge.findByIdAndUpdate(id, dataObj)
    .then(serialize);
}

let deleteData = (id) => {
  return DeliveryCharge.findByIdAndDelete(id)
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
  return DeliveryCharge.remove();
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

