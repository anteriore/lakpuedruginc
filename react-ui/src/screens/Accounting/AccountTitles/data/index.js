import { useSelector } from 'react-redux';

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

const FormDetails = () => {
  const accountTitles = useSelector((state) => state.accounting.accountTitles.list);

  const formDetails = {
    form_name: 'fg_issuance',
    form_items: [
      {
        label: 'Type',
        name: 'type',
        type: 'select',
        choices: [
          {
            id: 1,
            name: "Credit"
          },
          {
            id: 2,
            name: "Debit"
          }
        ],
        render: (item) => item.name,
        rules: [{ required: true }],
      },
      {
        label: 'Title',
        name: 'title',
        placeholder: 'Enter a title',
        rules: [{ required: true }],
      },
      {
        label: 'Date',
        name: 'date',
        type: 'date',
        rules: [{ required: true }],
      },
      {
        label: 'Parent',
        name: 'parent',
        type: 'select',
        choices: accountTitles,
        allowEmpty: true,
        render: (item) => `${item.title}`,
        rules: [{ required: true }],
      },
    ],
  };

  return { formDetails };
};

export default FormDetails;