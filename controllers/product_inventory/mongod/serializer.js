const _serializeSingle = (dataObj) => {
  return {
    'id': dataObj._id,
    'name': dataObj.name,
    'quantity': dataObj.quantity,
    'inventory_type': dataObj.inventory_type,
    'weight_id': dataObj.weight_id,
    'package_id': dataObj.package_id,
    'supplier_id': dataObj.supplier_id,
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
