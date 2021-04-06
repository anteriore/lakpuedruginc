export const deptColumns = [
    {
      title: 'Dept. Code',
      dataIndex: 'code',
      key: 'code',
      datatype: 'string',
    },
    {
      title: 'Dept. Name',
      dataIndex: 'name',
      key: 'name',
      datatype: 'string',
    },
  ];

export const tableName = 'department-areas';

export const areaColumns = [
    {
      title: 'Area Code',
      dataIndex: 'code',
      key: 'code',
      datatype: 'string',
    },
    {
      title: 'Area Name',
      dataIndex: 'name',
      key: 'name',
      datatype: 'string',
    },
  ];

export const formDetailD = {
    form_name: 'departments',
    form_items: [
      {
        label: 'Name',
        name: 'name',
        rules: [{ required: true, message: 'Please provide a valid department name' }],
        placeholder: 'Department name',
      },
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid department code' }],
        placeholder: 'Department code',
      },
    ],
  };

export const formDetailA = {
    form_name: 'areas',
    form_items: [
      {
        label: 'Name',
        name: 'name',
        rules: [{ required: true, message: 'Please provide a valid area name' }],
        placeholder: 'Area name',
      },
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid area code' }],
        placeholder: 'Area code',
      },
    ],
};