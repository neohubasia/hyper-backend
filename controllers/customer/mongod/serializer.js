const _serializeSingle = (dataObj) => {
  const logging = {
    'id': dataObj._id,
    'username': dataObj.username,
    'first_name': dataObj.first_name,
    'last_name': dataObj.last_name,
    'telephone': dataObj.telephone,
    'email': dataObj.email,
    'customer_type': dataObj.customer_type,
    'address': dataObj.address,
    'account_type': dataObj.account_type,
    'active': dataObj.active,
    'created_at': dataObj.created_at,
    'updated_at': dataObj.updated_at,
  };
  return logging;
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