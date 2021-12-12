let Coupon = require("../../../database/mongodb/models/coupon");
let serialize = require("./serializer"); // serializer custom to db

let listData = () => {
  return Coupon.find({}).then(serialize);
};

let findData = async (prop, val) => {
  if (prop === "id") prop = "_id";
  return Coupon.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

let findDataBy = (params) => {
  return Coupon.find(params).then(serialize);
};

let addData = (dataObj) => {
  return Coupon.create(dataObj).then(serialize);
};

let updateData = (id, dataObj) => {
  return Coupon.findByIdAndUpdate(id, dataObj).then(serialize);
};

let deleteData = (id) => {
  return Coupon.findByIdAndDelete(id)
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
  return Coupon.remove();
};

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
};
