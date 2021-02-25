import moment from 'moment'

export const tableHeader = [
  {
    title: 'Ref No.',
    dataIndex: 'number',
    key: 'number',
    align: 'center',
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
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    align: 'center',

  },
  {
    title: 'Depot',
    dataIndex: 'depot',
    key: 'depot',
    align: 'center',
    render: (depot) => `[${depot.code}] - ${depot.name}`
  },
];

export const tableProduct = [
  {
    title: 'FG ID',
    dataIndex: 'product',
    render: (object) => object.finishedGood.id
  },
  {
    title: 'Code',
    dataIndex: 'product',
    render: (object) => object.finishedGood.code,
  },
  {
    title: 'Product Name',
    dataIndex: 'product',
    key: 'product',
    render: (object) => object.finishedGood.name,
  },
  {
    title: 'Stock on Hand',
    dataIndex: 'quantity',
  },
  {
    title: 'Quantity',
    dataIndex: 'requestedQuantity',
    editable: true,
    limit: false,
  },
]

export const tableProductInventory = [
  {
    title: 'Lot #',
    dataIndex: 'product',
    render: (object) => object.lotNumber,
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
    title: 'Expiration',
    dataIndex: ['product', 'expiration'],
    key: 'expiration',
    //render: (object) => moment(new Date(object)).format('DD/MM/YYYY')
  },
  {
    title: 'Stock on Hand',
    dataIndex: 'quantity',
  },
]

export const formDetails = {
  form_name: 'productMovement',
  form_items: [
    {
      label: 'Date',
      name: 'date',
      rules: [{ required: true, message: 'Please provide a product movement date' }],
      placeholder: 'Product movement date',
      type: 'date',
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
      label: 'Type',
      name: 'type',
      rules: [{ required: true, message: 'Please provide a product movement type' }],
      placeholder: 'Product movement type',
      render: (type) => {
        return `${type.name}`;
      },
      type: 'select',
      choices: [{id: "IN", name: "IN"}, {id: "OUT", name: "OUT"}],
    },
    {
      label: 'Remarks',
      name: 'remarks',
      rules: [{}],
      placeholder: 'Remarks (optional)',
      type: 'textArea',
    },
  ]
}