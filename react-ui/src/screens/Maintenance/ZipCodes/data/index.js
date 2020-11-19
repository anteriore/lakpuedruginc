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
    title: 'Desription',
    dataIndex: 'description',
    key: 'description',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.description.length - b.description.length,
  },
  {
    title: 'Province Code',
    dataIndex: 'provinceCode',
    key: 'provinceCode',
    align: 'center',
    defaultSortOrder: 'ascend',
    render: (object) => object.code,
    sorter: (a, b) => a.unit.code.localeCompare(b.unit.code),
  },
  {
    title: 'Region Code',
    dataIndex: 'regionCode',
    key: 'regionCode',
    align: 'center',
    render: (object) => object.code,
    sorter: (a, b) => a.unit.code.localeCompare(b.unit.code),
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
      rules: [{ required: true, message: 'Please select a province code' }],
      placeholder: 'Province code',
      choices: [],
    },
    {
      label: 'Region code',
      name: 'regionCode',
      type: 'select',
      rules: [{ required: true, message: 'Please select a region code' }],
      placeholder: 'Region code',
      choices: [],
    },
  ],
};
