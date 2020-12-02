
export const formatProduct = (rawProducts) => {
  console.log(rawProducts, "Getting Raw Products")
  if(rawProducts !== null && rawProducts !== undefined){
    const newFormat = {
      id: rawProducts.product.finishedGood.id,
      code: rawProducts.product.finishedGood,
      finishedGood: rawProducts.product.finishedGood,
      quantity: rawProducts.quantity,
      quantityRequested: 0,
      quantityRemaining: rawProducts.quantity,
      unitPrice: 0.0,
      amount: 0
    }
    
    return newFormat;
  }
}