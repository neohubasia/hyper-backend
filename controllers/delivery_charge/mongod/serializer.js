const _serializeSingle = (dataObj) => {
  return {
    id: dataObj._id,
    charge: dataObj.charge,
    townshipid: dataObj.townshipid,
    companyid: dataObj.companyid,
    description: dataObj.description,
    status: dataObj.status,
    created_at: dataObj.created_at,
    updated_at: dataObj.updated_at,
  };
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
