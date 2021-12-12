let Banner = require("../../../database/mongodb/models/banner");
let serialize = require("./serializer"); // serializer custom to db

let listData = () => {
  return Banner.find({}).then(serialize);
};

let findData = async (prop, val) => {
  if (prop === "id") prop = "_id";
  return Banner.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

let findDataBy = (params) => {
  return Banner.find(params).then(serialize);
};

let addData = (dataObj) => {
  return Banner.create(dataObj).then(serialize);
};

let updateData = (id, dataObj) => {
  return Banner.findByIdAndUpdate(id, dataObj).then(serialize);
};

let deleteData = (id) => {
  return Banner.findByIdAndDelete(id)
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
  return Banner.remove();
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
