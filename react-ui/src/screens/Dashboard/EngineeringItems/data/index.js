import { useSelector } from 'react-redux';

export const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    datatype: 'string',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    datatype: 'string',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    datatype: 'object',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
    datatype: 'object',
  },
];

const FormDetails = () => {
  const types = useSelector((state) => state.maintenance.itemTypes.list);
  const units = useSelector((state) => state.maintenance.units.unitList);

  const formDetails = {
    form_name: 'itemtypes',
    form_items: [
      {
        label: 'Name',
        name: 'name',
        rules: [{ required: true, message: 'Please provide a valid item name' }],
        placeholder: 'Item name',
      },
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid item code' }],
        placeholder: 'Item code',
      },
      {
        label: 'Type',
        name: 'type',
        type: 'select',
        choices: types,
      },
      {
        label: 'Unit',
        name: 'unit',
        type: 'select',
        choices: units,
      },
    ],
  };

  return { formDetails };
};

export default FormDetails;
