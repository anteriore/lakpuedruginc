export const formatPayload = (approvalId, company, data) => {
  const receivedItems = [];

  data.receivedItems.forEach((rrItem) => {
    receivedItems.push({
      ...rrItem,
      quantity: rrItem.quantity,
      unit: rrItem?.unit ?? rrItem.item.unit,
      status: 'Quarantined',
    });
  });

  return {
    ...data,
    number: data.number,
    date: data.date,
    receivedBy: { id: approvalId },
    purchaseOrder: data?.purchaseOrder,
    company: { id: company },
    drNumber: data.drNumber,
    siNumber: data.siNumber,
    poNumber: data.poNumber,
    deliveryType: data.deliveryType,
    origin: data.origin,
    status: 'Pending',
    remarks: data.remarks,
    tolling: data.tolling,

    receivedItems,
  };
};
