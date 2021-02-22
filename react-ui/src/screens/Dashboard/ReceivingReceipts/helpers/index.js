export const formatReceivedItem = (requestedItem) => {
  if (requestedItem !== null && requestedItem !== undefined) {
    const newFormat ={
      id: requestedItem.id,
      itemID: requestedItem.item.id,
      quantity: requestedItem.quantity,
      unit: requestedItem.unit.name,
      status: requestedItem.status,
    };
    return newFormat;
  }
  return  {};
}

export const formatPayload = (approvalId, company, value) => {
    let formattedValue = {};
  
    formattedValue = {
      ...formattedValue,
      number: value.number,
      date: value.date,
      status: value.status,
      receivedBy: { id: approvalId },
      purchaseOrder: { id: value.purchaseOrder },
      company: { id: company },
      drNumber: value.drNumber,
      siNumber: value.siNumber,
      remarks: value.remarks,
      poNumber: value.poNumber,
      origin: value.origin,
      tolling: value.tolling,
      
      receivedItems: [],
    };
  
    value.items.forEach((item) => {
      let newItemValue = {};

      newItemValue = {
        ...newItemValue,
        item: { id: value.item.code },
        name: { id: value.item.name },
        type: { id: value.item.type.name },
        quantity: item.quantity,
        unit: { id: value.unit.name },
        status: item.status,
      };
  
      formattedValue.receivedItems.push(newItemValue);
    });
  
    formattedValue = { ...formattedValue };
  
    return formattedValue;
  };
  