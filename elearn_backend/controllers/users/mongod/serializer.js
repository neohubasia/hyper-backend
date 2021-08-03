const _serializeSingle = (user) => {
    const logging = {
      'id': user._id,
      'username': user.username,
      'active': user.active,
      'role': user.role,
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
  