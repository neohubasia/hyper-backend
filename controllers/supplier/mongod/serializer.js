const _serializeSingle = (dataObj) => {
  return {
    id: dataObj._id,
    company_logo: dataObj.company_logo,
    company_name: dataObj.company_name,
    contact_name: dataObj.contact_name,
    address_info: dataObj.address_info,
    payment_methods: dataObj.payment_methods,
    product_type_id: dataObj.product_type_id,
    website: dataObj.website,
    access: dataObj.access,
    status: dataObj.status,
    description: dataObj.description,
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
