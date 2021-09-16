const _serializeSingle = (dataObj) => {
  return {
    'id': dataObj._id,
    'city_mm': dataObj.city_mm,
    'city_en': dataObj.city_en,
    'code': dataObj.code,
    'unit':  dataObj.unit,
    'description': dataObj.description,
    'status': dataObj.status,
    'created_at': dataObj.created_at,
    'updated_at': dataObj.updated_at,
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
