let template = require("../../../database/mongodb/models/template");
let serialize = require("./serializer"); // serializer custom to db

let listData = () => {
  return template.find({}).then(serialize);
};

let findData = (prop, val) => {
  if (prop === "id") prop = "_id";
  return template.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

let findDataBy = (params) => {
  return template.find(params).then(serialize);
};

let addData = (dataObj) => {
  return template.create(dataObj).then(serialize);
};

let updateData = (id, dataObj) => {
  return template.findByIdAndUpdate(id, dataObj).then(serialize);
};

let deleteData = (id) => {
  return template
    .findByIdAndDelete(id)
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
  return template.remove();
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
