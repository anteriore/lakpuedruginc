export const tableHeader = [
  {
    title: 'Control No',
    dataIndex: 'approvedReceipt',
    key: 'approvedReceipt',
    align: 'center',
    render: (object) => object?.controlNumber ?? ""
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    defaultSortOrder: 'ascend',
    datatype: 'date',
    align: 'center',
  },
  {
    title: 'Expiration',
    dataIndex: 'expiration',
    key: 'expiration',
    defaultSortOrder: 'ascend',
    datatype: 'date',
    align: 'center',
  },
  {
    title: 'Extended',
    dataIndex: 'extended',
    key: 'extended',
    defaultSortOrder: 'ascend',
    datatype: 'date',
    align: 'center',
  },
];