let {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  updateDataByDiscountId,
  deleteData,
  dropAll
} 
// = require('./memory/index') // switch out db as required
= require('./mongod/index')
// = require('./pg/index')


let townshipsDb = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  updateDataByDiscountId,
  deleteData,
  dropAll
};

module.exports = townshipsDb;
