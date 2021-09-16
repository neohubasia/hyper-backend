const _serializeSingle = (dataObj) => {
  return {
    'id': dataObj._id,
    'orderNumber': dataObj.orderNumber,
    'orderDate': dataObj.orderDate,
    'customerId': dataObj.customerId,
    'orderItem': dataObj.orderItem,
    'address': dataObj.address,
    'total': dataObj.total,
    'status': dataObj.status,
    'description': dataObj.description,
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
