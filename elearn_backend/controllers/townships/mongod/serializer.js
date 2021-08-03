const _serializeSingle = (township) => {
  return {
    'id': township._id,
    'township_mm': township.township_mm,
    'township_en': township.township_en,
    'cityid': township.cityid,
    'code': township.code,
    'description': township.description,
    'created_at': township.created_at,
    'updated_at': township.updated_at,
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
