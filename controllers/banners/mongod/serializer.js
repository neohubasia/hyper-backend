const _serializeSingle = (dataObj) => {
    return {
      'id': dataObj._id,
      'title': dataObj.title,
      'images': dataObj.images,
      'imagetype': dataObj.imagetype,
      'status': dataObj.status,
      'description': dataObj.description,
      'created_at': dataObj.created_at,
      'updated_at': dataObj.updated_at,
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
  