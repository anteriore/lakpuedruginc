export const formatPMPayload = (approvalId, company, value) => {
  let formattedValue = {};

  formattedValue = {
    ...formattedValue,
    date: value.date,
    depot: { id: value.depot },
    type: value.type,
    company: { id: company },
    requestedBy: { id: approvalId },
    remarks: value.remarks,
    products: [],
  };

  value.product.forEach((prod) => {
    let newProductValue = {};
    newProductValue = {
      ...newProductValue,
      product: { id: prod.id },
      quantity: prod.requestedQuantity,
    };

    formattedValue.products.push(newProductValue);
  });

  return formattedValue;
};
