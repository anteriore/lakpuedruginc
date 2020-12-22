export const tableHeader = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Area',
    dataIndex: 'area',
    key: 'area',
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
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    align: 'center',
    datatype: 'string'
  },
];

export const formDetails = {
  form_name: 'region_codes',
  form_items: [
    {
      label: 'Area',
      name: 'area',
      rules: [{ required: true, message: 'Please provide a proper region area' }],
      placeholder: 'Region area',
    },
    {
      label: 'Code',
      name: 'code',
      rules: [{ required: true, message: 'Please provide a proper region code' }],
      placeholder: 'Region code',
    },
    {
      label: 'Description',
      name: 'description',
      rules: [{ required: true, message: 'Please provide a proper region description' }],
      placeholder: 'Region description',
    },
  ],
};
