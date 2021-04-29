export const formatPayload = (approvalId, company, data) => {
  const receivedItems = [];
  let tempPurchaseOrder;

  data.receivedItems.forEach((rrItem) => {
    receivedItems.push({
      ...rrItem,
      quantity: rrItem.quantity,
      unit: rrItem?.unit ?? rrItem.item.unit,
      status: 'Quarantined',
    });
  });

  if(data.isTolling){
    tempPurchaseOrder = data?.purchaseOrder
  } else {
    tempPurchaseOrder = { id: data.purchaseOrder }
  }

  return {
    ...data,
    number: data.number,
    date: data.date,
    receivedBy: { id: approvalId },
    purchaseOrder: tempPurchaseOrder,
    company: { id: company },
    drNumber: data.drNumber,
    siNumber: data.siNumber,
    poNumber: data.poNumber,
    deliveryType: data.deliveryType,
    origin: data.origin,
    status: 'Pending',
    remarks: data.remarks,
    tolling: false,

    receivedItems,
  };
};
