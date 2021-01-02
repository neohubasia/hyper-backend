const _serializeSingle = (permission) => {
    const logging = {
      'id': permission._id,
      'name': permission.name,
      'description': permission.description,
      'menu': permission.menu
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