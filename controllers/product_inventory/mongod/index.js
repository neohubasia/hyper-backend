let ProductInventory = require('../../../database/mongodb/models/product_inventory');
let serialize = require('./serializer'); // serializer custom to db

let listData = (params) => {
  return ProductInventory.find(params)
    .populate({
      model: "supplier",
      path: "supplier_id",
      select: "company_name"
    })
    .then(serialize);
}

let findData = async (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return ProductInventory.find({ [prop]: val })
    .populate({
      model: "supplier",
      path: "supplier_id",
      select: "company_name"
    })
    .then(resp => {
      return serialize(resp[0])
    });
}

let findDataBy = (params) => {
  return ProductInventory.find(params)
    .populate({
      model: "supplier",
      path: "supplier_id",
      select: "company_name"
    })
    .then(serialize);
}

let addData = (dataObj) => {
  return ProductInventory.create(dataObj)
    .then(serialize);
}

let updateData = (id, dataObj) => {
  return ProductInventory.findByIdAndUpdate(id, dataObj)
    .then(serialize);
}

let deleteData = (id) => {
  return ProductInventory.findByIdAndDelete(id)
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
  return ProductInventory.remove();
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

