let Product = require('../../../database/mongodb/models/product');
let serialize = require('./serializer'); // serializer custom to db

let listData = () => {
  return Product.find({})
    .populate({
      path: 'category_id',
      model: 'product_category',
      select: 'name as category_name'
    }).populate({
      path: 'inventory_id',
      model: 'product_inventory',
      select: 'quantity'
    }).populate({
      path: 'discount_id',
      model: 'discount',
      select: 'name as discount_name'
    })
    .then(serialize);
}

let findData = async (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return Product.find({ [prop]: val })
    .populate({
      path: 'category_id',
      model: 'product_category',
      select: 'name as category_name'
    }).populate({
      path: 'inventory_id',
      model: 'product_inventory',
      select: 'quantity'
    }).populate({
      path: 'discount_id',
      model: 'discount',
      select: 'name as discount_name'
    })
    .then(resp => {
      return serialize(resp[0])
    });
}

let findDataBy = (params) => {
  const filter = params.filter;                         // Filter Param Anythings
  const sort = params.sort || {};                       // Sort Param Anythings
  let limit = parseInt(params.page.limit) || 60;        // Content Length
  let skip = parseInt(params.page.skip) || 0;           // Page No.
  skip = skip * limit;

  for (const i in sort) {
    sort[i] = parseInt(sort[i]);                        // Sort Ensure
  }

  console.log("Edited Param ", filter, sort, skip, limit)

  return Product
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'category_id',
      model: 'product_category',
      select: 'name as category_name'
    }).populate({
      path: 'inventory_id',
      model: 'product_inventory',
      select: 'quantity'
    }).populate({
      path: 'discount_id',
      model: 'discount',
      select: 'name as discount_name'
    })
    .then(serialize);
}

let addData = (dataObj) => {
  return Product.create(dataObj)
    .then(serialize);
}

let updateData = (id, dataObj) => {
  return Product.findByIdAndUpdate(id, dataObj)
    .then(serialize);
}
let updateDataByDiscountId = (we, dataObj) => {
  return Product.updateMany({ discount_id: we }, dataObj)
    .then(serialize);
}

let deleteData = (id) => {
  return Product.findByIdAndDelete(id)
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
  return Product.remove();
}

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  updateDataByDiscountId,
  deleteData,
  dropAll
};

