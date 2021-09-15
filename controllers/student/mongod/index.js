let Student = require('../../../database/mongodb/models/student');
let serialize = require('./serializer'); // serializer custom to db

let listData = () => {
  return Student.find({}).populate({
    path: 'cityid',
    model: 'city',
    select: 'city_mm city_en'
  }).populate({
    path: 'townshipid',
    model: 'township',
    select: 'township_mm township_en'
  })
    .then(serialize);
}

let findData = (prop, val) => {
  if (prop === 'id')
    prop = '_id'
  return Student.find({[prop]: val}).populate({
    path: 'cityid',
    model: 'city',
    select: 'city_mm city_en'
  }).populate({
    path: 'townshipid',
    model: 'township',
    select: 'township_mm township_en'
  })
    .then(resp => {
      return serialize(resp[0])
    });

  // this code is smarter but can't wait to serialize data
  // return Student.find({[prop]: val}, (err, resp) => {
  //   if(err) throw err;
  //   console.log("Find ", resp);
  //   return serialize(resp[0]);
  // });
}

let findDataBy = (params) => {
  return Student.find(params)
    .populate({
      path: 'cityid',
      model: 'city',
      select: 'city_mm city_en'
    }).populate({
      path: 'townshipid',
      model: 'township',
      select: 'township_mm township_en'
    })
    .then(serialize);
}

let addData = (dataObj) => {
  return Student.create(dataObj)
    .then(serialize);
}

let updateData = (id, dataObj) => {
  return Student.findByIdAndUpdate(id, dataObj)
    .then(serialize);
}

let deleteData = (id) => {
  return Student.findByIdAndDelete(id)
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
  return Student.remove();
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

