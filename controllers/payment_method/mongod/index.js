let PaymentMethod = require("../../../database/mongodb/models/payment_method");
let serialize = require("./serializer"); // serializer custom to db

let listData = () => {
  return PaymentMethod.find({}).then(serialize);
};

let findData = async (prop, val) => {
  if (prop === "id") prop = "_id";
  return PaymentMethod.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

let findDataBy = (params) => {
  return PaymentMethod.find(params).then(serialize);
};

let addData = (dataObj) => {
  return PaymentMethod.create(dataObj).then(serialize);
};

let updateData = (id, dataObj) => {
  return PaymentMethod.findByIdAndUpdate(id, dataObj).then(serialize);
};

let deleteData = (id) => {
  return PaymentMethod.findByIdAndDelete(id)
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
  return PaymentMethod.remove();
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
