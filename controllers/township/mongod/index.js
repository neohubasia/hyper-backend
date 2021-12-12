let Township = require("../../../database/mongodb/models/township");
let serialize = require("./serializer"); // serializer custom to db

let listData = () => {
  return Township.find({})
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .then(serialize);
};

let findData = async (prop, val) => {
  if (prop === "id") prop = "_id";
  return Township.find({ [prop]: val })
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .then((resp) => {
      return serialize(resp[0]);
    });
};

let findDataBy = (params) => {
  return Township.find(params)
    .populate({
      path: "cityid",
      model: "city",
      select: "city_mm city_en",
    })
    .then(serialize);
};

let addData = (dataObj) => {
  return Township.create(dataObj).then(serialize);
};

let updateData = (id, dataObj) => {
  return Township.findByIdAndUpdate(id, dataObj).then(serialize);
};

let deleteData = (id) => {
  return Township.findByIdAndDelete(id)
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
  return Township.remove();
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
