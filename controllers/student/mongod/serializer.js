const _serializeSingle = (dataObj) => {
  return {
    'id': dataObj._id,
    'grade': dataObj.grade,
    'name': dataObj.name,
    'age': dataObj.age,
    'prefect': dataObj.prefect,
    'cityid': dataObj.cityid,
    'townshipid': dataObj.townshipid,
    'profile_images': dataObj.profile_images,
    'created_at': dataObj.created_at,
    'updated_at': dataObj.updated_at
  };
};

const serializer = (data) => {
  if (!data) {
    return null
  }
  if (Array.isArray(data)) {
    return data.map(_serializeSingle);
  }
  return _serializeSingle(data);
}

module.exports = serializer;
