let Customer = require("../../../database/mongodb/models/customer");
let serialize = require("./serializer"); // serializer custom to db
let bcrypt = require("bcrypt");

let listData = () => {
  return Customer.find({}).then(serialize);
};

let findData = async (prop, val) => {
  if (prop === "id") prop = "_id";
  return Customer.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

let findDataBy = (params) => {
  return Customer.find(params).then(serialize);
};

let addData = (dataObj) => {
  if (dataObj.password) {
    var hashedPassword = bcrypt.hashSync(dataObj.password, 8);
    dataObj.password = hashedPassword;
  }
  // console.log(dataObj)
  return Customer.findOneAndUpdate(
    { email: dataObj.email }, // Query parameter
    { ...dataObj }, // Replacement document
    {
      // Options
      new: true,
      upsert: true,
      useFindAndModify: false,
    }
  ).then(serialize);
};

let updateData = (id, dataObj) => {
  if (dataObj.password) {
    var hashedPassword = bcrypt.hashSync(dataObj.password, 8);
    dataObj.password = hashedPassword;
  }

  return Customer.findByIdAndUpdate(id, dataObj).then(serialize);
};

// let deleteData = (id) => {
//   return Customer.findByIdAndDelete(id)
//     .then(resp => {
//       return {
//         id: resp._id.toString(),
//         status: 'SUCCESS',
//         message: 'Delete Successful'
//       }
//     })
//     .catch(err => {
//       return {
//         status: 'FAIL',
//         message: 'Delete Unsuccessful'
//       }
//     })
// }

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  //deleteData
};
