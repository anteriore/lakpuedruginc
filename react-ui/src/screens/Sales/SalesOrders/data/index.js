export const tableHeader = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    defaultSortOrder: 'ascend',
    datatype: 'date',
  },
  {
    title: 'SO Number',
    dataIndex: 'number',
    key: 'number',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.number.length - b.number.length,
  },
  {
    title: 'Prepared By',
    dataIndex: 'preparedBy',
    key: 'preparedBy',
    align: 'center',
    defaultSortOrder: 'ascend',
    render: (object) => object.firstName.concat(` ${object.lastName}`),
    sorter: (a, b) => a.preparedBy.firstName.concat(` ${a.preparedBy.lastName}`).localeCompare(b.preparedBy.firstName.concat(` ${b.preparedBy.lastName}`)),
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

export const tableProduct = [
  {
    title: 'Code',
    dataIndex: 'code',
  },
  {
    title: 'Finished Good',
    dataIndex: 'finshedGood',
    render: (object) => object.name
  },
  {
    title: 'Stock on Hand',
    dataIndex: 'quantity',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantityRequested',
    editable: true,
  },
  {
    title: 'Remaining',
    dataIndex: 'quantityRemaining',
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    editable: true,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
]

export const formDetails = {
  form_name: 'zip_codes',
  form_items: [
    {
      label: 'Number',
      name: 'number',
      rules: [{ required: true, message: 'Please provide a sales order number' }],
      placeholder: 'Sales order number',
    },
    {
      label: 'Date',
      name: 'date',
      rules: [{ required: true, message: 'Please provide a sales order date' }],
      placeholder: 'Sales order number',
      type: 'date'
    },
    {
      label: 'Depot',
      name: 'depot',
      rules: [{ required: true, message: 'Please provide a sales order depot' }],
      placeholder: 'Sales order depot',
      type: 'select',
      choices: []
    },
    {
      label: 'Client',
      name: 'client',
      rules: [{ required: true, message: 'Please provide a sales order client' }],
      placeholder: 'Sales order client',
      type: 'selectSearch',
      choices: []
    },
    {
      label: 'Prepared By',
      name: 'preparedBy',
      rules: [{ required: true}],
      placeholder: '',
    },
    {
      label: 'Approved By',
      name: 'approvedBy',
      rules: [{ required: true}],
      placeholder: '',
    },
    {
      label: 'Requested By',
      name: 'requestedBy',
      rules: [{ required: true}],
      placeholder: '',
    },
    {
      label: 'Remarks',
      name: 'remarks',
      rules: [{}],
      placeholder: 'Remarsk (optional)',
      type: 'textarea'
    },
  ],
};
