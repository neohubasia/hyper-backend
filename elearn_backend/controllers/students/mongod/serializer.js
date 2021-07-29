const _serializeSingle = (student) => {
  return {
    'id': student._id,
    'grade': student.grade,
    'name': student.name,
    'age': student.age,
    'profile_images': student.profile_images,
    'prefect': student.prefect
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
