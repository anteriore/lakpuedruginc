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
    title: 'Procedure Area',
    dataIndex: 'procedureArea',
    key: 'procedureArea',
    align: 'center',
    render: (object) => object.code,
    sorter: (a, b) => a.unit.code.localeCompare(b.unit.code),
  },
];

export const formDetails = {
  form_name: 'procedures',
  form_items: [
    {
      label: 'Name',
      name: 'name',
      rules: [{ required: true, message: 'Please provide a proper procedure name' }],
      placeholder: 'Procedure name',
    },
    {
      label: 'Code',
      name: 'code',
      rules: [{ required: true, message: 'Please provide a proper procedure code' }],
      placeholder: 'Procedure code',
    },
    {
      label: 'Procedure Area',
      name: 'procedureArea',
      type: 'select',
      rules: [{ required: true, message: 'Please select a procedure area' }],
      placeholder: 'Procedure area',
      choices: [],
    },
  ],
};
