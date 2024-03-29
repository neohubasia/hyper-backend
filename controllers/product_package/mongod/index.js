let ProductPackage = require("../../../database/mongodb/models/product_package");
let serialize = require("./serializer"); // serializer custom to db

let listData = () => {
  return ProductPackage.find({}).then(serialize);
};

let findData = (prop, val) => {
  if (prop === "id") prop = "_id";
  return ProductPackage.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

let findDataBy = (params) => {
  return ProductPackage.find(params).then(serialize);
};

let addData = (dataObj) => {
  return ProductPackage.create(dataObj).then(serialize);
};

let updateData = (id, dataObj) => {
  return ProductPackage.findByIdAndUpdate(id, dataObj).then(serialize);
};

let deleteData = (id) => {
  return ProductPackage.findByIdAndDelete(id)
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
  return ProductPackage.remove();
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
