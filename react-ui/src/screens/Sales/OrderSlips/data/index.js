export const tableHeader = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    defaultSortOrder: 'ascend',
    datatype: 'date',
  },
  {
    title: 'OS Number',
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

export const salesOrderHeader = [
  { 
    title: 'Lot #', 
    dataIndex: 'lotNumber', 
    key: 'lotNumber' 
  },
  { 
    title: 'Expiration', 
    dataIndex: 'expiration', 
    key: 'expiration' 
  },
  { 
    title: 'Stock on Hand', 
    dataIndex: 'stockOnHand', 
    key: 'stockOnHand' 
  },
  { 
    title: 'Quantity', 
    dataIndex: 'quantity', 
    key: 'quantity' 
  },
]

export const salesInfoHeader = [
  { 
    title: 'FG', 
    dataIndex: 'fgCode', 
    key: 'fgCode' 
  },
  { 
    title: 'Quantity', 
    dataIndex: 'quantity', 
    key: 'quantity' 
  },
  { 
    title: 'Remaining', 
    dataIndex: 'quantityRemaining', 
    key: 'quantityRemaining' 
  },
  { 
    title: 'Unit Price', 
    dataIndex: 'unitPrice', 
    key: 'unitPrice',
  },
  { 
    title: 'Amount', 
    dataIndex: 'amount', 
    key: 'amount',
  },
]

export const formDetails = {
  form_name: 'order_slips',
  form_items: [
    {
      label: 'Number',
      name: 'number',
      rules: [{ required: true, message: 'Please provide a order slip number' }],
      placeholder: 'Order slip number',
    },
    {
      label: 'Date',
      name: 'date',
      rules: [{ required: true, message: 'Please provide a order slip date' }],
      placeholder: 'order slip number',
      type: 'date'
    },
    {
      label: 'Depot',
      name: 'depot',
      rules: [{ required: true, message: 'Please provide a order slip depot' }],
      placeholder: 'Order slip depot',
      type: 'select',
      choices: []
    },
    {
      label: 'Sales Order',
      name: 'salesOrder',
      rules: [{ required: true, message: 'Please select sales order' }],
      placeholder: 'Sales order',
      type: 'selectSearch',
      choices: []
    },
    {
      label: 'Prepared By',
      name: 'preparedBy',
      rules: [{ required: true, message: 'Please login a valid user'}],
      placeholder: '',
      type: 'readOnly'
    },
    {
      label: 'Released By',
      name: 'releasedBy',
      rules: [{ required: true, message: 'Please login a valid user'}],
      placeholder: '',
      type: 'readOnly'
    },
    {
      label: 'Checked By',
      name: 'checkedBy',
      rules: [{ required: true, message: 'Please login a valid user'}],
      placeholder: '',
      type: 'readOnly'
    },
    {
      label: 'Remarks',
      name: 'remarks',
      rules: [{}],
      placeholder: 'Remarks (optional)',
      type: 'textarea'
    },
  ]
}

export const initValueForm = [
  {
    name: "number",
    type: "input"
  },
  {
    name: "date",
    type: "date"
  },
  {
    name: "depot",
    type: "select"
  },
  {
    name: "salesOrder",
    type: "select"
  },
  {
    name: "remarks",
    type: "input"
  }
]