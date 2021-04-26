import { useDispatch, useSelector } from 'react-redux';
import { listAccountTitlesByType, clearData } from '../redux';

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
  const dispatch = useDispatch();
  const accountTitles = useSelector((state) => state.accounting.accountTitles.list);

  const formDetails = {
    form_name: 'account_title',
    form_items: [
      {
        label: 'Type',
        name: 'type',
        type: 'select',
        choices: [
          {
            id: 'Credit',
            name: 'Credit',
          },
          {
            id: 'Debit',
            name: 'Debit',
          },
        ],
        render: (item) => item.name,
        onChange: (e) => {
          dispatch(clearData());
          dispatch(listAccountTitlesByType({ type: e }));
        },
        rules: [{ required: true }],
      },
      {
        label: 'Title',
        name: 'title',
        placeholder: 'Enter a title',
        rules: [{ required: true }],
      },
      {
        label: 'Parent',
        name: 'parent',
        type: 'select',
        choices: accountTitles,
        allowEmpty: true,
        render: (item) => `${item.title}`,
        // rules: [{ required: true }],
        notFoundContent: 'Please select a type first before selecting the parent.',
      },
    ],
  };

  return { formDetails };
};

export default FormDetails;
