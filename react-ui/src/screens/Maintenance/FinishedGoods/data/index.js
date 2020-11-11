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
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.name.length - b.name.length,
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
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.unit - b.unit,
  },
];

export const dataFG = [
  {
    key: '1',
    id: 1,
    fg_code: '12151',
    fg_name: 'tuna',
    created_date: '12-12-20',
  },
  {
    key: '2',
    id: 2,
    fg_code: '1',
    fg_name: 'cola',
    created_date: '12-12-20',
  },
  {
    key: '3',
    id: 3,
    fg_code: '3',
    fg_name: 'beer',
    created_date: '12-12-20',
  },
];

export const formDetails = {
  form_name: 'finished_goods',
  form_items: [
    {
      label: 'Name',
      name: 'name',
      rules: [{ required: true, message: 'Please provide a proper finished goods name' }],
      placeholder: 'Finished goods name',
    },
    {
      label: 'Code',
      name: 'code',
      rules: [{ required: true, message: 'Please provide a proper finished goods code' }],
      placeholder: 'Finished goods code',
    },
  ],
};
