export const tableHeader = [
  {
    title: 'Control No',
    dataIndex: 'approvedReceipt',
    key: 'approvedReceipt',
    align: 'center',
    render: (object) => object?.controlNumber ?? '',
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
