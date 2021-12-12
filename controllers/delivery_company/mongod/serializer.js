const _serializeSingle = (dataObj) => {
  return {
    id: dataObj._id,
    email: dataObj.email,
    address: dataObj.address,
    company_logo: dataObj.company_logo,
    company_name: dataObj.company_name,
    contact_name: dataObj.contact_name,
    primary_mobile: dataObj.primary_mobile,
    secondary_mobile: dataObj.secondary_mobile,
    description: dataObj.description,
    status: dataObj.status,
    created_at: dataObj.created_at,
    updated_at: dataObj.updated_at,
  };
};

const serializer = (data) => {
  if (!data) {
    return null;
  }
  if (Array.isArray(data)) {
    return data.map(_serializeSingle);
  }
  return _serializeSingle(data);
};

module.exports = serializer;
