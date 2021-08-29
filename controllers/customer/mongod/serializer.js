const _serializeSingle = (dataObj) => {
  const logging = {
    'id': dataObj._id,
    'email': dataObj.email,
    'first_name': dataObj.first_name,
    'last_name': dataObj.last_name,
    'displayName': dataObj.displayName,
    'customer_type': dataObj.customer_type,
    'account_type': dataObj.account_type,
    'oauth_profile': dataObj.oauth_profile,
    'address': dataObj.address,
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