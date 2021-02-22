export const reportColumns = {
  salesRep: [
    {
      title: 'Client Code',
      dataIndex: 'code',
      key: 'code',
      datatype: 'string',
    },
    {
      title: 'Client Name',
      dataIndex: 'name',
      key: 'name',
      datatype: 'string',
    },
    {
      title: 'Business Address',
      dataIndex: 'businessAddress',
      key: 'businessAddress',
      datatype: 'string',
    },
    {
      title: 'Proprietor',
      dataIndex: 'proprietor',
      key: 'proprietor',
      datatype: 'string',
    },
    {
      title: 'Telephone Numbers',
      dataIndex: 'telephoneNumbers',
      key: 'telephoneNumbers',
      datatype: 'string',
    },
    {
      title: 'TIN',
      dataIndex: 'tin',
      key: 'tin',
      datatype: 'string',
    },
  ],
  itemProduct: [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      datatype: 'object',
      dataToString: (object) => {
        return `[${object.finishedGood.code}] ${object.finishedGood.name}`
      }
    },
    {
      title: 'Quantity',
      dataIndex: 'itemQuantity',
      key: 'itemQuantity',
    },
    {
      title: 'Total Amount',
      dataIndex: 'itemAmount',
      key: 'itemAmount',
    },
  ],
}