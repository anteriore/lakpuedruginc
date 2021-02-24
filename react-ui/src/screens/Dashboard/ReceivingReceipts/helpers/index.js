export const formatPayload = (approvalId, company, data) => {
    const receivedItems = []

    data.receivedItems.forEach((rrItem) => {
      receivedItems.push({
        
        id: rrItem.id || null,
        item: { id: rrItem.itemID },
        quantity: rrItem.quantity,
        unit: { id: rrItem.unit.id },
        status: 'Quarantined',
      })
    })

    return {
      ...data, 
      number: data.number,
      date: data.date,
      receivedBy: { id: approvalId },
      purchaseOrder: { id: data.purchaseOrder },
      company: { id: company },
      drNumber: data.drNumber,
      siNumber: data.siNumber,
      poNumber: data.poNumber,
      deliveryType: data.deliveryType,
      origin: data.origin,
      status: data.status,
      remarks: data.remarks,
      tolling: false,
      
      receivedItems,
    }
  };
  