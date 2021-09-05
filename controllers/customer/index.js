let {
  listData,
  findData,
  findDataBy,
  addData,
  updateData
  //deleteData
}
  = require('./mongod/index')


let exportDb = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData
  //deleteData
};

module.exports = exportDb;