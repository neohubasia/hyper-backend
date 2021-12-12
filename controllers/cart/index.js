let {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  updateMany,
  deleteData,
  deleteDataBy,
  dropAll,
} = require("./mongod/index");
// = require('./memory/index')
// = require('./pg/index')
// switch out db as required

let exportDb = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  updateMany,
  deleteData,
  deleteDataBy,
  dropAll,
};

module.exports = exportDb;
