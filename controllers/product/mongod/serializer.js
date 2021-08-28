const _serializeSingle = (dataObj) => {
  return {
    'id': dataObj._id,
    'name': dataObj.name,
    'category_id': dataObj.category_id,
    'inventory_id': dataObj.inventory_id,
    'discount_id': dataObj.discount_id,
    'sku': dataObj.sku,
    'images': dataObj.images,
    'features': dataObj.features,
    'description': dataObj.description,
    'price': dataObj.price,
    'stock':dataObj.stock,
    'status': dataObj.status,
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
