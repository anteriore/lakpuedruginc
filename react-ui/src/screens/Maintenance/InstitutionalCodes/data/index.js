export const tableHeader = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.code.length - b.code.length,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.description.length - b.description.length,
  },
];

export const formDetails = {
  form_name: 'institutionalCodes',
  form_items: [
    {
      label: 'Code',
      name: 'code',
      rules: [{ required: true, message: 'Please provide a proper institution code' }],
      placeholder: 'Institution code',
    },
    {
      label: 'Description',
      name: 'description',
      rules: [{ required: true, message: 'Please provide a proper institution description' }],
      placeholder: 'Institution description',
    },
  ],
};
