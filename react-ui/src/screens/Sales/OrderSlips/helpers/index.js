import moment from 'moment';

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

export const formatSalesProduct = (sales) => {
  let formatedList = [];
  if (sales !== null && sales !== undefined) {
    sales.products.forEach((product,i) => {
      const { product: salesProduct, quantity } = product.product;

      formatedList.push({
        key: i,
        product,
        lotNumber: salesProduct.lotNumber,
        expiration: moment(new Date(salesProduct.expiration)).format('DD/MM/YYYY'),
        stockOnHand: product.product.quantity,
        quantity
      })
    });
  }

  return formatedList;
}

export const formatSalesInfo = (sales) => {
  if (sales !== null && sales !== undefined) {
    const { product: info } = sales
    let formatedList = [{
      key: 1,
      fgCode: info.finishedGood.code,
      quantity: info.quantity,
      quantityRemaining: info.quantityRemaining,
      unitPrice: info.unitPrice,
      amount: (info.unitPrice * info.quantityRequested)
    }]

    return formatedList;
  }

  return null;
}