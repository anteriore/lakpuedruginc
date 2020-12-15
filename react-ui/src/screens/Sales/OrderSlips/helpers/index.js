export const formatSOList = (salesOrders) => {
  const newList  = []
  if(salesOrders.length !== 0){
    salesOrders.forEach((sale) => {
      newList.push({
        id: sale.id,
        code: `${sale.number} - ${sale.client.salesRep.code} - ${sale.client.code} - ${sale.client.name}`
      })
    })
  }

  return newList;
}