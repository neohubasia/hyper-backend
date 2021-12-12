let {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll,
  reportFilter,
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
  deleteData,
  dropAll,
  reportFilter,
};

module.exports = exportDb;
