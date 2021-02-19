export const columns = [
  {
    title: 'Code',
    dataIndex: 'item',
    key: 'item',
    datatype: 'object',
    dataToString: (item) => {
      return item.code
    }
  },
  {
    title: 'Item',
    dataIndex: 'item',
    key: 'item',
    datatype: 'object',
    dataToString: (item) => {
      return item.name
    }
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'Unit',
    dataIndex: 'item',
    key: 'item',
    datatype: 'object',
    dataToString: (item) => {
      return `${item.unit.name}`
    },
  },
];
