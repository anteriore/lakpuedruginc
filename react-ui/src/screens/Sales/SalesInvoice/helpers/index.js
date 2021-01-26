import _ from 'lodash';

export const formatPayload = (payload) => {
  let formattedValue = {};
  console.log(payload)
  formattedValue = {
    ...formattedValue,
    number: payload.value.number,
    date: payload.value.date,
    preparedBy: {id: payload.id},
    checkedBy: {id: payload.id},
    releasedBy: {id: payload.id},
    approvedBy: {id: payload.id},
    depot: {id: payload.value.depot},
    salesOrder: {id: payload.salesOrder.id},
    taxPercentage: payload.value.tax_percentage,
    company: {id: payload.company},
    type:"DR_SI",
    totalAmount: _.sumBy(payload.salesInvoiceProducts, (o) => {
      return o.unitPrice * o.quantityRequested
    }),
    remarks: payload.value.remarks,
    orderedProducts: []
  }

  payload.salesInvoiceProducts.forEach((invoiceProduct) => {
    formattedValue.orderedProducts.push({
      product: {id: invoiceProduct.product.id},
      quantity: invoiceProduct.quantityRequested,
      salesOrderProductId: invoiceProduct.id,
      unitPrice: invoiceProduct.unitPrice,
      depot: {id: payload.salesOrder.depot.id},
      // salesInvoiceNo: payload.value.number
    })
  })

  return formattedValue;
}