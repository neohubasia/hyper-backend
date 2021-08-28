const _serializeSingle = (dataObj) => {
  return {
    'id': dataObj._id,
    'quantity': dataObj.quantity,
    'created_at': dataObj.created_at,
    'updated_at': dataObj.updated_at,
    'deleted_at': dataObj.deleted_at,
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
