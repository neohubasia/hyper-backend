let ProductCategory = require('../../../database/mongodb/models/product_category');
let serialize = require('./serializer'); // serializer custom to db

let listData = () => {
  return ProductCategory.find({})
    .then(serialize);
}

let findData = async (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return ProductCategory.find({ [prop]: val })
    .then(resp => {
      return serialize(resp[0])
    });
}

let findDataBy = (prop, val) => {
  if (prop === 'id')
    prop = '_id';
  return ProductCategory.find({[prop]: val})
    .then(serialize);
}

let addData = (dataObj) => {
  return ProductCategory.create(dataObj)
    .then(serialize);
}

let updateData = (id, dataObj) => {
  return ProductCategory.findByIdAndUpdate(id, dataObj)
    .then(serialize);
}

let deleteData = (id) => {
  return ProductCategory.findByIdAndDelete(id)
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
  return ProductCategory.remove();
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

