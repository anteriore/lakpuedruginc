export const tableHeader = [
  {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id - b.id
  },
  {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',  
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.length - b.name.length
  },
  {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.code.length - b.code.length   
  },
]