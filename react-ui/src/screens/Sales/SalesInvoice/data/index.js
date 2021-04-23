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
    datatype: 'string',
  },
  {
    title: 'Total Amount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    align: 'center',
    defaultSortOrder: 'ascend',
    dataType: 'number',
  },
  {
    title: 'Remaining Balance',
    dataIndex: 'remainingBalance',
    key: 'remainingBalance',
    align: 'center',
    defaultSortOrder: 'ascend',
    datatype: 'number',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    defaultSortOrder: 'ascend',
    datatype: 'string',
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
      name: 'taxPercentage',
      rules: [{ required: true, message: 'Please provide a proper tax percentage' }],
      min: 0,
      initialValue: 12,
      placeholder: 'Tax percentage',
      type: 'readOnly',
    },
    {
      label: 'Depot',
      name: 'depot',
      rules: [{ required: true, message: 'Please provide a sales invoice depot' }],
      placeholder: 'Sales invoice depot',
      render: (depot) => {
        return `[${depot.code}] ${depot.name}`;
      },
      type: 'selectSearch',
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
        return `[${sales?.number ?? ''}] ${sales?.client?.name ?? ''}, Sales Rep: ${
          sales?.client?.salesRep?.name ?? ''
        }`;
      },
    },
    {
      label: 'Prepared By',
      name: 'preparedBy',
      rules: [{ required: true, message: 'Please login a valid user' }],
      render: (object) =>
        `${object?.firstName ?? ''} ${object?.middleInitial ?? ''} ${object?.lastName ?? ''}`,
      placeholder: '',
      type: 'readOnly',
    },
    {
      label: 'Released By',
      name: 'releasedBy',
      rules: [{ required: true, message: 'Please login a valid user' }],
      render: (object) =>
        `${object?.firstName ?? ''} ${object?.middleInitial ?? ''} ${object?.lastName ?? ''}`,
      placeholder: '',
      type: 'readOnly',
    },
    {
      label: 'Checked By',
      name: 'checkedBy',
      rules: [{ required: true, message: 'Please login a valid user' }],
      render: (object) =>
        `${object?.firstName ?? ''} ${object?.middleInitial ?? ''} ${object?.lastName ?? ''}`,
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
