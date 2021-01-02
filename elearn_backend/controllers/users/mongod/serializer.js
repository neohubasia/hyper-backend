const _serializeSingle = (user) => {
    const logging = {
      'id': user._id,
      'username': user.username
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
  