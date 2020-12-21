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
  {
    title: 'Procedure Area',
    dataIndex: 'procedureArea',
    key: 'procedureArea',
    name: 'code',
    align: 'center',
    datatype: 'object'
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
