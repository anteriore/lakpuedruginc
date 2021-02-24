export const formatPayload = (approvalId, company, data) => {
    let rrItemList = [];

    data.rrItemList.forEach((rrItem) => {
      rrItemList.push({
        id: rrItem.id || null,
        item: { id: rrItem.item },
        quantity: rrItem.quantity,
        unit: { id: rrItem.unit },
        status: 'Quarantined',
      })
    })

    return {
      ...data, 
      number: data.number,
      date: data.date,
      status: 'Pending',
      receivedBy: { id: approvalId },
      purchaseOrder: { id: data.purchaseOrder },
      company: { id: company },
      drNumber: data.drNumber,
      siNumber: data.siNumber,
      remarks: data.remarks,
      poNumber: data.poNumber,
      origin: data.origin,
      tolling: false,
      
      rrItemList,
    }
  };
  