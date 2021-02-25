export const tableHeader = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    datatype: 'string',
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
    datatype: 'string',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
    datatype: 'string',
  },
];

export const tableName = 'bank-accounts';

export const formDetails = {
  form_name: 'accountNumber',
  form_items: [
    {
      label: 'Name',
      name: 'name',
      rules: [{ required: true, message: 'Please provide a proper account name' }],
      placeholder: 'Account name',
    },
    {
      label: 'Code',
      name: 'code',
      rules: [{ required: true, message: 'Please provide a proper account code' }],
      placeholder: 'Account code',
    },
    {
      label: 'Address',
      name: 'address',
      rules: [{ required: true, message: 'Please provide a proper account address' }],
      placeholder: 'Account address',
      type: 'textArea',
    },
  ],
};
