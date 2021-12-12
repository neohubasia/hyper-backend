const _serializeSingle = (dataObj) => {
  return {
    id: dataObj._id,
    name: dataObj.name,
    quantity: dataObj.quantity,
    weight_id: dataObj.weight_id,
    package_id: dataObj.package_id,
    inventory_type: dataObj.inventory_type,
    supplier_id: dataObj.supplier_id,
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
