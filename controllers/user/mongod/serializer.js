const _serializeSingle = (dataObj) => {
  const logging = {
    id: dataObj._id,
    role: dataObj.role,
    active: dataObj.active,
    username: dataObj.username,
    supplier_id: dataObj.supplier_id,
    created_at: dataObj.created_at,
    updated_at: dataObj.updated_at,
  };
  return logging;
};

const serializer = (data) => {
  if (!data) {
    return null;
  }
  if (Array.isArray(data)) {
    return data.map(_serializeSingle);
  }
  return _serializeSingle(data);
};

module.exports = serializer;
