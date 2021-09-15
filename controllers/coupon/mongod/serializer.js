const _serializeSingle = (dataObj) => {
  return {
    'id': dataObj._id,
    'code': dataObj.code,
    'customer_type': dataObj.customer_type,
    'discount_type': dataObj.discount_type,
    'discount_amount': dataObj.discount_amount,
    'no_of_limits': dataObj.no_of_limits,
    'description': dataObj.description,
    'status': dataObj.status,
    'start_time': dataObj.start_time,
    'expire_time': dataObj.expire_time,
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
