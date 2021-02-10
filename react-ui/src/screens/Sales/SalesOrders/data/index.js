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
    sorter: (a, b) =>
      a.preparedBy.firstName
        .concat(` ${a.preparedBy.lastName}`)
        .localeCompare(b.preparedBy.firstName.concat(` ${b.preparedBy.lastName}`)),
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
    title: 'FG ID',
    dataIndex: 'finishedGoodID',
  },
  {
    title: 'Code',
    dataIndex: 'code',
    render: (object) => object.code,
  },
  {
    title: 'Finished Good',
    dataIndex: 'finishedGood',
    key: 'finishedGood',
    render: (object) => object.name,
  },
  {
    title: 'Stock on Hand',
    dataIndex: 'quantity',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantityRequested',
    editable: true,
    limit: true,
  },
  {
    title: 'Remaining',
    dataIndex: 'quantityRemaining',
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    editable: true,
    precisionEnabled: true,
    precision: 2,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Action',
  },
];

export const tableProductInventory = [
  {
    title: 'Lot #',
    dataindex: 'product',
    render: (object) => object.product.lotNumber,
  },
  {
    title: 'FG Code',
    dataIndex: 'product',
    render: (object) => object.finishedGood.code,
  },
  {
    title: 'Finished Good',
    dataIndex: 'product',
    render: (object) => object.finishedGood.name,
  },
  {
    title: 'Stock on Hand',
    dataIndex: 'quantity',
  },
];

export const formDetails = {
  form_name: 'sales_orders',
  form_items: [
    // {
    //   label: 'Number',
    //   name: 'number',
    //   rules: [{ required: true, message: 'Please provide a sales order number' }],
    //   placeholder: 'Sales order number',
    // },
    {
      label: 'Date',
      name: 'date',
      rules: [{ required: true, message: 'Please provide a sales order date' }],
      placeholder: 'Sales order number',
      type: 'date',
    },
    {
      label: 'Type',
      name: 'type',
      rules: [{ required: true, message: 'Please provide a sales order type' }],
      placeholder: 'Sales order type',
      type: 'select',
      choices: [
        { id: 'DR_SI', name: 'DR/SI' },
        { id: 'OS', name: 'OS' },
        { id: 'PS', name: 'PS' },
      ],
    },
    {
      label: 'Depot',
      name: 'depot',
      rules: [{ required: true, message: 'Please provide a sales order depot' }],
      placeholder: 'Sales order depot',
      render: (depot) => {
        return `[${depot.code}] ${depot.name}`;
      },
      type: 'select',
      choices: [],
    },
    {
      label: 'Client',
      name: 'client',
      rules: [{ required: true, message: 'Please provide a sales order client' }],
      placeholder: 'Sales order client',
      render: (client) => {
        return `[${client.code}] ${client.name}`;
      },
      type: 'selectSearch',
      choices: [],
    },
    {
      label: 'Prepared By',
      name: 'preparedBy',
      rules: [{ required: true, message: 'Please login a valid user' }],
      placeholder: '',
      type: 'readOnly',
      writeOnly: true,
    },
    {
      label: 'Approved By',
      name: 'approvedBy',
      rules: [{ required: true, message: 'Please login a valid user' }],
      placeholder: '',
      type: 'readOnly',
      writeOnly: true,
    },
    {
      label: 'Requested By',
      name: 'requestedBy',
      rules: [{ required: true, message: 'Please login a valid user' }],
      placeholder: '',
      type: 'readOnly',
      writeOnly: true,
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

export const initValueForm = [
  {
    name: 'number',
    type: 'input',
  },
  {
    name: 'number',
    type: 'input',
  },
  {
    name: 'type',
    type: 'input',
  },
  {
    name: 'date',
    type: 'date',
  },
  {
    name: 'depot',
    type: 'select',
  },
  {
    name: 'client',
    type: 'select',
  },
  {
    name: 'remarks',
    type: 'input',
  },
];
