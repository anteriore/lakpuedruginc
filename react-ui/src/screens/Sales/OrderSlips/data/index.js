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
    datatype: 'string'
  },
  {
    title: 'Total Amount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    align: 'center',
    defaultSortOrder: 'ascend',
    datatype: 'number'
  },
  {
    title: 'Remaining Balance',
    dataIndex: 'remainingBalance',
    key: 'remainingBalance',
    align: 'center',
    defaultSortOrder: 'ascend',
    datatype: 'number'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    defaultSortOrder: 'ascend',
    datatype: 'string'
  },
];

const FormDetails = () => {
  const accountValidations = [
    'accountTitles', 
    'area', 
    'department', 
    'credit', 
    'debit', 
    'group'];

  const salesOrderHeader = [
    {
      title: 'Lot #',
      dataIndex: 'product',
      key: 'lotNumber',
      render: (object) => object.lotNumber,
    },
    {
      title: 'FG Code',
      dataIndex: 'product',
      key: 'fgCode',
      render: (object) => object.finishedGood.code,
    },
    {
      title: 'Expiration',
      dataIndex: 'product',
      key: 'expiration',
      render: (object) => object.expiration
    },
    {
      title: 'Stock on Hand',
      dataIndex: 'quantity',
      key: 'stockOnHand',
    },
    {
      title: 'Quantity Per Box',
      dataIndex: 'product',
      key: 'quantity',
      render: (object) => object.quantityPerBox
    },
  ];

  const salesInfoHeader = [
    {
      title: 'FG',
      dataIndex: 'finishedGood',
      key: 'finishedGood',
      render: (object) => {
        return object.code;
      },
    },
    {
      title: 'Requested',
      dataIndex: 'quantiyRequested',
      key: 'quantityRequested',
      render: (_, row) => {
        return row.quantityRequested;
      },
    },
    {
      title: 'Remaining',
      dataIndex: 'quantityRemaining',
      key: 'quantityRemaining',
      render: (_, row) => {
        return row.quantity - row.quantityRequested;
      },
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
      render: (_, row) => {
        return row.quantityRequested * row.unitPrice;
      },
    },
  ];

  const formDetails = {
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
        type: 'date',
      },
      {
        label: 'Depot',
        name: 'depot',
        rules: [{ required: true, message: 'Please provide a order slip depot' }],
        placeholder: 'Order slip depot',
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
        render: (sales) => {
          return `[${sales?.number ?? ""}] ${sales?.client?.name ?? ""}, Sales Rep: ${sales?.client?.salesRep?.name ?? ""}`;
        },
        choices: [],
      },
      {
        label: 'Prepared By',
        name: 'preparedBy',
        rules: [{ required: true, message: 'Please login a valid user' }],
        render: (object) => `${object?.firstName ?? ""} ${object?.middleInitial ?? ""} ${object?.lastName ?? ""}`,
        placeholder: '',
        type: 'readOnly',
      },
      {
        label: 'Released By',
        name: 'releasedBy',
        rules: [{ required: true, message: 'Please login a valid user' }],
        render: (object) => `${object?.firstName ?? ""} ${object?.middleInitial ?? ""} ${object?.lastName ?? ""}`,
        placeholder: '',
        type: 'readOnly',
      },
      {
        label: 'Checked By',
        name: 'checkedBy',
        rules: [{ required: true, message: 'Please login a valid user' }],
        render: (object) => `${object?.firstName ?? ""} ${object?.middleInitial ?? ""} ${object?.lastName ?? ""}`,
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
    ]
  }

  const itemColumns = [
    {
      title: 'SO Prod ID',
      dataIndex: 'salesOrderProductId',
      key: 'salesOrderProductID',
    },
    {
      title: 'Finished Good',
      dataIndex: 'product',
      key: 'product',
      render: (object) => object?.finishedGood?.name ?? ""
    },
    {
      title: 'Depot',
      dataIndex: 'depot',
      key: 'depot',
      render: (object) => object?.code ?? "",
    },

    {
      title: 'Quantity Requested',
      dataIndex: 'quantity',
      key: 'quantity',
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
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ]


  return {
    accountValidations,
    salesOrderHeader,
    formDetails,
    salesInfoHeader,
    itemColumns
  }
}

export default FormDetails;