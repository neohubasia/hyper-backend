let {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll
}
  // = require('./memory/index') // switch out db as required
  = require('./mongod/index')
// = require('./pg/index')


let inventoryDb = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll
};

module.exports = inventoryDb;
