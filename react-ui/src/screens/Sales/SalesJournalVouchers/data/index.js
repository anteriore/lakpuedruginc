export const columns = {
  all: [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      datatype: 'string',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
  ],
  siOnly: [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      datatype: 'string',
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (data, rowData) => data * (1 - (rowData.taxPercentage / 100))
    },
    {
      title: 'Tax',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (data, rowData) => data * (rowData.taxPercentage / 100)
    },
    {
      title: 'Accounts Receivable',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },

  ]
};
