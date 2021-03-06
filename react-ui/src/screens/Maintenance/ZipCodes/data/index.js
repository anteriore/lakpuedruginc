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
    datatype: 'string',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    align: 'center',
    datatype: 'string',
  },
  {
    title: 'Province Code',
    dataIndex: 'provinceCode',
    key: 'provinceCode',
    align: 'center',
    defaultSortOrder: 'ascend',
    name: 'code',
    datatype: 'object',
  },
  {
    title: 'Region Code',
    dataIndex: 'regionCode',
    key: 'regionCode',
    align: 'center',
    name: 'code',
    datatype: 'object',
  },
];

export const formDetails = {
  form_name: 'zip_codes',
  form_items: [
    {
      label: 'Code',
      name: 'code',
      rules: [{ required: true, message: 'Please provide a zip code' }],
      placeholder: 'Zip code',
    },
    {
      label: 'Description',
      name: 'description',
      rules: [{ required: true, message: 'Please provide a proper zip code description' }],
      placeholder: 'Zip code description',
    },
    {
      label: 'Province code',
      name: 'provinceCode',
      type: 'select',
      placeholder: 'Province code',
      choices: [],
      rules: [{ required: true, message: 'Please select a province code' }],
      render: (object) => `[${object.code}] ${object.area}`,
    },
    {
      label: 'Region code',
      name: 'regionCode',
      type: 'select',
      placeholder: 'Region code',
      choices: [],
      rules: [{ required: true, message: 'Please select a region code' }],
      render: (object) => `[${object.code}] ${object.area}`,
    },
  ],
};
