const _serializeSingle = (dataObj) => {
  return {
    'id': dataObj._id,
    'name': dataObj.name,
    'discount_type': dataObj.discount_type,
    'discount_amount': dataObj.discount_amount,
    'description': dataObj.description,
    'discounts':dataObj.discounts,
    'active':dataObj.active,
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