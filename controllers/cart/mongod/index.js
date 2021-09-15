const { async } = require('validate.js');
let Cart = require('../../../database/mongodb/models/cart');
let serialize = require('./serializer'); // serializer custom to db

let listData = () => {
  return Cart.find()
    .populate('customerId')
    .populate('productId')
    .then(serialize);
}

let findData = async (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return Cart.find({ [prop]: val })
    .populate('productId')
    .then(resp => {
      return serialize(resp[0])
    });
}

let findDataBy = (params) => {
  return Cart.find(params)
    .populate({
      path: "productId",
      model: "product",
      select: "images name price sku",
      populate: {
        path: "discount_id",
        model: "discount",
        select: "name discount_type discount_amount"
      }
    })
    .then(serialize);
}

let addData = async (dataObj) => {
  const customerId = dataObj.customerId
  const productId = dataObj.productId
  const quantity = dataObj.quantity
  var checkCart = await Cart.find({ customerId: customerId, productId: productId })

  if (checkCart[0]) {
    var up_quantity = checkCart[0].quantity + parseInt(quantity)
    return Cart.findOneAndUpdate({ productId, customerId }, { quantity: up_quantity }, { new: true }).then(serialize);
  }
  else {
    const cart = await new Cart({ customerId, productId, quantity })
    return cart.save().then(serialize);
  }
}

let updateData = (id, dataObj) => {
  return Cart.findByIdAndUpdate(id, dataObj)
    .then(serialize);
}

let updateMany = (params, data) => { // not to serialize
  try {
    data.data.forEach(async (item) => {
      const updateCart = await Cart.findOneAndUpdate(
        { _id: item.id, ...params },
        { quantity: item.quantity }
      );
    });
    return {
      status: 'SUCCESS',
      message: 'Successful Cart Updated'
    }
  } catch (error) {
    return {
      status: 'FAIL',
      message: error
    }
  }
}

let deleteData = (customerId) => {
  return Cart.deleteMany({ customerId })
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

let deleteDataBy = (params) => {
  return Cart.findOneAndRemove(params)
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
  return Cart.remove();
}

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  updateMany,
  deleteData,
  deleteDataBy,
  dropAll
};

