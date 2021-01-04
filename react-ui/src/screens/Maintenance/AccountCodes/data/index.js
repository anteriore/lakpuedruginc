export const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      datatype: 'string',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      datatype: 'string',
    },
  ];

export const formDetail = {
    form_name: 'accountcodes',
    form_items: [
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid account code' }],
        placeholder: 'Account code',
      },
      {
        label: 'Description',
        name: 'description',
        rules: [{ required: true, message: 'Please provide a valid description' }],
        placeholder: 'Description',
      },
    ],
  };