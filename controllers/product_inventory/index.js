let {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
} = require("./mongod/index");
// = require('./memory/index')
// = require('./pg/index')
// switch out db as required

let inventoryDb = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
};

module.exports = inventoryDb;
