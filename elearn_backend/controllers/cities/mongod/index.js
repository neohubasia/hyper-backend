let City = require('../../../database/mongodb/models/city');
let serialize = require('./serializer'); // serializer custom to db

let listData = () => {
  return City.find({})
    .then(serialize);
}

let findData = (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return City.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
    });
}

let findDataBy = (prop, val) => {
  if (prop === 'id')
    prop = '_id';
  return City.find({[prop]: val})
    .then(serialize);
}

let addData = (dataObj) => {
  return City.create(dataObj)
    .then(serialize);
}

let updateData = (id, dataObj) => {
  return City.findByIdAndUpdate(id, dataObj)
    .then(serialize);
}

let deleteData = (id) => {
  return City.findByIdAndDelete(id)
    .then(resp => {
      return {
        id: resp._id.toString(),
        status: 'SUCCESS',
        message: 'Delete Successful'
      }
    })
    .catch(err => {
      return { 
        status: 'FAIL',
        message: 'Delete Unsuccessful' 
      }
    })
}

let dropAll = () => {
  return City.remove();
}

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  updateData,
  deleteData,
  dropAll
};

