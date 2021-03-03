export const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    datatype: 'string',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    datatype: 'string',
  },
  {
    title: 'Parent',
    dataIndex: 'parent',
    key: 'parent',
    datatype: 'object',
    dataToString: (object) => {
      return `[${object.type}] ${object.title}`;
    },
  },
];