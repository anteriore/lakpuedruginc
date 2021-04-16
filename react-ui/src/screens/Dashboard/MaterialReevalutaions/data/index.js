import moment from 'moment';

export const tableHeader = [
  {
    title: 'Control No',
    dataIndex: 'approvedReceipt',
    key: 'approvedReceipt',
    align: 'center',
    datatype: 'object', 
    dataToString: (object) => object?.controlNumber ?? '',
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


export const modalColumns = [
  {
    label: 'Control Number',
    name: 'approvedReceipt',
    render: (object) =>  `${object?.controlNumber ?? ''}`,
    type: 'selectSearch',
    readOnly: true,
  },
  {
    label: 'Raw Materials',
    name: 'approvedReceipt',
    render: (object) =>  `[${object?.item?.code ?? ''}]${object?.item?.name ?? ''}`,
    type: 'selectSearch',
    readOnly: true,
  },
  {
    label: 'Reevaluated By ',
    name: 'approvedReceipt',
    render: (object) =>  `${object?.receivedBy?.firstName ?? ''} 
    ${object?.receivedBy?.middleInitial ?? ''}
    ${object?.receivedBy?.lastName ?? ''}`,
    type: 'selectSearch',
    readOnly: true,
  },
  {
    label: 'Approved Receipt Date ',
    name: 'approvedReceipt',
    render: (object) =>  `${moment(new Date(object.date)).format('DD/MM/YYYY')}`,
    type: 'selectSearch',
    readOnly: true,
  },
  {
    label: 'Approved Receipt Number ',
    name: 'approvedReceipt',
    render: (object) =>  `${object?.number ?? ''}`,
    type: 'selectSearch',
    readOnly: true,
  },
  {
    label: 'RR No',
    name: 'approvedReceipt',
    render: (object) =>  `${object?.rrNumber ?? ''}`,
    type: 'selectSearch',
    readOnly: true,
  },
  {
    label: 'SI No',
    name: 'approvedReceipt',
    render: (object) =>  `${object?.receivingReceipt?.siNumber ?? ''}`,
    type: 'selectSearch',
    readOnly: true,
  },
  {
    label: 'Specified Gravity',
    name: 'approvedReceipt',
    render: (object) =>  `${object?.specifiedGravity ?? ''}`,
    type: 'selectSearch',
    readOnly: true,
  },
  {
    label: 'Max Containers',
    name: 'approvedReceipt',
    render: (object) =>  `${object?.maxContainers ?? ''}`,
    type: 'selectSearch',
    readOnly: true,
  },
  {
    label: 'QC Samples',
    name: 'approvedReceipt',
    render: (object) =>  `${object?.qcSamples ?? ''}`,
    type: 'selectSearch',
    readOnly: true,
  },
  {
    label: 'Received Quantity',
    name: 'approvedReceipt',
    render: (object) =>  `${object?.receivedQuantity ?? ''}`,
    type: 'selectSearch',
    readOnly: true,
  },
  {
    label: 'Rejected Quantity',
    name: 'approvedReceipt',
    render: (object) =>  `${object?.rejectedQuantity ?? ''}`,
    type: 'selectSearch',
    readOnly: true,
  },
  {
    label: 'Total Quantity',
    name: 'approvedReceipt',
    render: (object) =>  `${object?.totalQuantity ?? ''}`,
    type: 'selectSearch',
    readOnly: true,
  },
  {
    label: 'Delivery Number',
    name: 'approvedReceipt',
    render: (object) =>  `${object?.receivingReceipt?.drNumber ?? ''}`,
    type: 'selectSearch',
    readOnly: true,
  },
  {
    label: 'Date',
    name: 'date',
    rules: [{ required: true, message: 'Please provide date' }],
    placeholder: '',
    type: 'date',
  },
  {
    label: 'Expiration',
    name: 'expiration',
    rules: [{ required: true, message: 'Please provide expiration' }],
    placeholder: '',
    type: 'date',
  },
  {
    label: 'Re-evaluation',
    name: 'reevaluation',
    rules: [{ required: true, message: 'Please provide re-evaluation' }],
    placeholder: '',
    type: 'date',
  },
  {
    label: 'Best Before',
    name: 'bestBefore',
    rules: [{ required: true, message: 'Please provide best before' }],
    placeholder: '',
    type: 'date',
  },
  {
    label: 'Re-test',
    name: 'retest',
    rules: [{ required: true, message: 'Please provide retest' }],
    placeholder: '',
    type: 'date',
  },
  {
    label: 'Allowance',
    name: 'allowance',
    type: 'number',
    rules: [{ required: true, message: 'Please provide a MR allowance' }],
    min: 0,
    placeholder: 'Allowance',
  },
  {
    label: 'Remarks',
    name: 'remarks',
    rules: [{}],
    placeholder: 'Remarks (optional)',
    type: 'textArea',
  },
]

export const formDetails = {
  form_name: 'approvedReceipts',
  form_items: [
    {
      label: 'Control Number',
      name: 'controlNumber',
      rules: [{ required: true, message: 'Please select a control number' }],
      placeholder: 'Approved Reciepts ',
      render: (object) =>
        `${object?.controlNumber ?? ''} - ${object?.item?.name ?? ''} - ${
          object?.item?.code ?? ''
        } - ${object?.item?.type?.name ?? ''}`,
      type: 'selectSearch',
      choices: [],
    },
    {
      label: 'Date',
      name: 'date',
      rules: [{ required: true, message: 'Please provide date' }],
      placeholder: '',
      type: 'date',
    },
    {
      label: 'Expiration',
      name: 'expiration',
      rules: [{ required: true, message: 'Please provide expiration' }],
      placeholder: '',
      type: 'date',
    },
    {
      label: 'Re-evaluation',
      name: 'reevaluation',
      rules: [{ required: true, message: 'Please provide re-evaluation' }],
      placeholder: '',
      type: 'date',
    },
    {
      label: 'Best Before',
      name: 'bestBefore',
      rules: [{ required: true, message: 'Please provide best before' }],
      placeholder: '',
      type: 'date',
    },
    {
      label: 'Re-test',
      name: 'retest',
      rules: [{ required: true, message: 'Please provide retest' }],
      placeholder: '',
      type: 'date',
    },
    {
      label: 'Allowance',
      name: 'allowance',
      type: 'number',
      rules: [{ required: true, message: 'Please provide a MR allowance' }],
      min: 0,
      placeholder: 'Allowance',
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
