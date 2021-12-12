const _serializeSingle = (dataObj) => {
  return {
    id: dataObj._id,
    name: dataObj.name,
    discount_type: dataObj.discount_type,
    discount_amount: dataObj.discount_amount,
    supplier_id: dataObj.supplier_id,
    description: dataObj.description,
    active: dataObj.active,
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
