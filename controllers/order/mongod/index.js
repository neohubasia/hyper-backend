let Order = require("../../../database/mongodb/models/order");
let serialize = require("./serializer"); // serializer custom to db

let listData = () => {
  return Order.find({})
    .populate("customerId")
    .populate({
      path: "orderItem.productId",
      populate: {
        path: "category_id",
        model: "product_category",
      },
    })
    .then(serialize);
};

let findData = async (prop, val) => {
  if (prop === "id") prop = "_id";
  return Order.find({ [prop]: val })
    .populate("customerId")
    .populate({
      path: "orderItem.productId",
      populate: {
        path: "category_id",
        model: "product_category",
      },
    })
    .then((resp) => {
      return serialize(resp[0]);
    });
};

let findDataBy = (params) => {
  return Order.find(params)
    .populate("customerId")
    .populate({
      path: "orderItem.productId",
      populate: {
        path: "category_id",
        model: "product_category",
      },
    })
    .then(serialize);
};

let addData = (dataObj) => {
  return Order.create(dataObj).then(serialize);
};

let updateData = (id, dataObj) => {
  return Order.findByIdAndUpdate(id, dataObj).then(serialize);
};

let deleteData = (id) => {
  return Order.findByIdAndDelete(id)
    .then((resp) => {
      return {
        id: resp._id.toString(),
        status: "SUCCESS",
        message: "Delete Successful",
      };
    })
    .catch((err) => {
      return {
        status: "FAIL",
        message: "Delete Unsuccessful",
      };
    });
};

let dropAll = () => {
  return Order.remove();
};

let reportFilter = (dataObj) => {
  return Order.find({
    orderDate: {
      $gte: dataObj.start_date,
      $lte: dataObj.end_date,
    },
    status: dataObj.status,
  })
    .populate("customerId")
    .populate({
      path: "orderItem.productId",
      populate: {
        path: "category_id",
        model: "product_category",
      },
    })
    .then(serialize);
};

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
  reportFilter,
};
