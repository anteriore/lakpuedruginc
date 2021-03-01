import moment from 'moment';

export const processDataForSubmission = (data, company) => {
  const requestedItems = [];
  data.requestedItems.forEach((item) => {
    requestedItems.push({
      id: item.id || null,
      item: {
        id: item.itemID,
      },
      unit: {
        id: item.unit.id,
      },
      quantityRequested: item.quantityRequested,
      quantityRequired: item.quantityRequested,
      quantityLacking:
        item.stockQuantity - item.quantityRequested < 0
          ? -(item.stockQuantity - item.quantityRequested)
          : 0,
      quantityRemaining:
        item.stockQuantity - item.quantityRequested > 0
          ? item.stockQuantity - item.quantityRequested
          : 0,
      company: {
        id: company,
      },
    });
  });
  return {
    ...data,
    department: {
      id: data.department,
    },
    company: {
      id: company,
    },
    requestedBy: {
      id: data.requestedBy,
    },
    requestedItems,
  };
};

export const loadDataForUpdate = (data, itemSummaryList) => {
    const requestedItems = []
    console.log(itemSummaryList)
    data.requestedItems.forEach((item) => {
        var itemSummary = {
            ...itemSummaryList.find((itemData) => itemData.item.id === item.item.id)
        }
        console.log(itemSummary)
        delete itemSummary.item
        requestedItems.push({
            ...item,
            ...itemSummary,
            ...item.item,
            id: item.id,
            itemID: item.item.id,
        })
    })
    return {
        ...data,
        date: moment(new Date(data.date)) || moment(),
        dateNeeded: moment(new Date(data.dateNeeded)) || moment(),
        department: data.department !== null ? data.department.id : null,
        requestedItems: requestedItems
    };
}

