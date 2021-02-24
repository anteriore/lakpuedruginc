export const columns = {
  all: [
    {
      title: 'DR/SI/OS Number',
      dataIndex: 'number',
      key: 'number',
      datatype: 'string',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      datatype: 'date',
    },
    {
      title: 'Client',
      dataIndex: 'salesOrder',
      key: 'salesOrder',
      datatype: 'object',
      dataToString: (object) => {
        return `[${object.client.code}] ${object.client.name}`
      }
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
  ],
  siOnly: [
    {
      title: 'SI Number',
      dataIndex: 'number',
      key: 'number',
      datatype: 'string',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      datatype: 'date',
    },
    {
      title: 'Client',
      dataIndex: 'salesOrder',
      key: 'salesOrder',
      datatype: 'object',
      dataToString: (object) => {
        return `[${object.client.code}] ${object.client.name}`
      }
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
