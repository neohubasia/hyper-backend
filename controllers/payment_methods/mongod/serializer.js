const _serializeSingle = (dataObj) => {
  return {
    'id': dataObj._id,
    'acc_name': dataObj.acc_name,
    'acc_number': dataObj.acc_number,
    'payment_method': dataObj.payment_method,
    'payment_name': dataObj.payment_name,
    'organization': dataObj.organization,
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
