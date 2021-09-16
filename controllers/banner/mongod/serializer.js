const _serializeSingle = (dataObj) => {
    return {
      'id': dataObj._id,
      'title': dataObj.title,
      'images': dataObj.images,
      'page_name': dataObj.page_name,
      'image_size': dataObj.image_size,
      'no_of_image': dataObj.no_of_image,
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
  