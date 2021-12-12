let Discount = require("../../../database/mongodb/models/discount");
let serialize = require("./serializer"); // serializer custom to db

let listData = (params) => {
  return Discount.find(params).then(serialize);
};

let findData = async (prop, val) => {
  if (prop === "id") prop = "_id";
  return Discount.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

let findDataBy = (params) => {
  return Discount.find(params).then(serialize);
};

let addData = (dataObj) => {
  return Discount.create(dataObj).then(serialize);
};

let updateData = (id, dataObj) => {
  return Discount.findByIdAndUpdate(id, dataObj).then(serialize);
};

let deleteData = (id) => {
  return Discount.findByIdAndDelete(id)
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
  return Discount.remove();
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
