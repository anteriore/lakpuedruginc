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
    datatype: 'string'
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
    datatype: 'string'
  },
];

export const formDetails = {
  form_name: 'productionArea',
  form_items: [
    {
      label: 'Name',
      name: 'name',
      rules: [{ required: true, message: 'Please provide a proper production area name' }],
      placeholder: 'Production area name',
    },
    {
      label: 'Code',
      name: 'code',
      rules: [{ required: true, message: 'Please provide a proper production area code' }],
      placeholder: 'Production area code',
    },
  ],
};
