export const columns = [
  {
    title: 'Depot',
    dataIndex: 'depot',
    key: 'depot',
    datatype: 'object',
  },
  {
    title: 'Date Created',
    dataIndex: 'dateCreated',
    key: 'dateCreated',
    datatype: 'date',
  },
  {
    title: 'Code',
    dataIndex: 'product',
    key: 'product',
    datatype: 'object',
    dataToString: (product) => {
      return product?.finishedGood?.code;
    },
  },
  {
    title: 'Finished Good',
    dataIndex: 'product',
    key: 'product',
    datatype: 'object',
    dataToString: (product) => {
      return product?.finishedGood?.name;
    },
  },
  {
    title: 'Lot Number',
    dataIndex: 'product',
    key: 'product',
    datatype: 'object',
    dataToString: (product) => {
      return `${product?.lotNumber}`;
    },
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Quantity Per Box',
    dataIndex: 'product',
    key: 'product',
    datatype: 'object',
    dataToString: (product) => {
      return `${product?.quantityPerBox}`;
    },
  },
  {
    title: 'Unit (Small/Big)',
    dataIndex: 'product',
    key: 'product',
    datatype: 'object',
    dataToString: (product) => {
      return `${product.bigUnit?.name} (${product.bigUnit?.code}) / ${product?.smallUnit?.name} (${product?.smallUnit?.code})`;
    },
  },
  {
    title: 'Unit Price',
    dataIndex: 'product',
    key: 'product',
    datatype: 'object',
    dataToString: (product) => {
      return `${product?.unitPrice}`;
    },
  },
];

export const reportColumns = [
  {
    title: 'Date Created',
    dataIndex: 'dateCreated',
    key: 'dateCreated',
    datatype: 'date',
  },
  {
    title: 'Code',
    dataIndex: 'product',
    key: 'product',
    datatype: 'object',
    dataToString: (product) => {
      return product?.finishedGood?.code;
    },
  },
  {
    title: 'Finished Good',
    dataIndex: 'product',
    key: 'product',
    datatype: 'object',
    dataToString: (product) => {
      return product?.finishedGood?.name;
    },
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Unit (Small/Big)',
    dataIndex: 'product',
    key: 'product',
    datatype: 'object',
    dataToString: (product) => {
      return `${product?.bigUnit?.name} (${product?.bigUnit?.code}) / ${product?.smallUnit?.name} (${product?.smallUnit?.code})`;
    },
  },
];
