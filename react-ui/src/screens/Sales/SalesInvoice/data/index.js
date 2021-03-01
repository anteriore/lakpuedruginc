export const tableHeader = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    defaultSortOrder: 'ascend',
    datatype: 'date',
  },
  {
    title: 'SI Number',
    dataIndex: 'number',
    key: 'number',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.number.length - b.number.length,
  },
  {
    title: 'Total Amount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.totalAmount - b.totalAmount,
  },
  {
    title: 'Remaining Balance',
    dataIndex: 'remainingBalance',
    key: 'remainingBalance',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.remainingBalance - b.remainingBalance,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.status.length - b.status.length,
  },
];

export const formDetails = {
  form_name: 'sales_invoice',
  form_items: [
    {
      label: 'Number',
      name: 'number',
      rules: [{ required: true, message: 'Please provide a sales invoice number' }],
      placeholder: 'Sales invoice number',
    },
    {
      label: 'Date',
      name: 'date',
      rules: [{ required: true, message: 'Please provide a sales invoice date' }],
      placeholder: '',
      type: 'date',
    },
    {
      label: 'Tax Percentage',
      name: 'tax_percentage',
      type: 'number',
      rules: [{ required: true, message: 'Please provide a proper tax percentage' }],
      min: 0,
      placeholder: 'Tax percentage',
    },
    {
      label: 'Depot',
      name: 'depot',
      rules: [{ required: true, message: 'Please provide a sales invoice depot' }],
      placeholder: 'Sales invoice depot',
      render: (depot) => {
        return `[${depot.code}] ${depot.name}`;
      },
      type: 'select',
      choices: [],
    },
    {
      label: 'Sales Order',
      name: 'salesOrder',
      rules: [{ required: true, message: 'Please select sales order' }],
      placeholder: 'Sales order',
      type: 'selectSearch',
      choices: [],
      render: (sales) => {
        console.log(sales);
        return `[${sales?.number ?? ""}] ${sales?.client?.name ?? ""}, Sales Rep: ${sales?.client?.salesRep?.name ?? ""}`;
      },
    },
    {
      label: 'Prepared By',
      name: 'preparedBy',
      rules: [{ required: true, message: 'Please login a valid user' }],
      placeholder: '',
      type: 'readOnly',
    },
    {
      label: 'Released By',
      name: 'releasedBy',
      rules: [{ required: true, message: 'Please login a valid user' }],
      placeholder: '',
      type: 'readOnly',
    },
    {
      label: 'Checked By',
      name: 'checkedBy',
      rules: [{ required: true, message: 'Please login a valid user' }],
      placeholder: '',
      type: 'readOnly',
    },
    {
      label: 'Remarks',
      name: 'remarks',
      rules: [{}],
      placeholder: 'Remarks (optional)',
      type: 'textArea',
    },
  ],
};
