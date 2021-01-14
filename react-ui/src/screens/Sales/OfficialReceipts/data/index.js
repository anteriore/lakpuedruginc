import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Typography } from 'antd';

const { Text } = Typography;

export const columns = [
  {
    title: 'OR Number',
    dataIndex: 'number',
    key: 'number',
    datatype: 'string',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    datatype: 'date',
  },
];

const FormDetails = () => {
  const depots = useSelector((state) => state.maintenance.depots.list);

  const formDetails = {
    form_name: 'official_receipt',
    toggle_name: 'terms',
    form_items: [
      {
        label: 'OR Number',
        name: 'number',
        placeholder: "Official Receipt Number",
        rules: [{ required: true }],
      },
      {
        label: 'Date',
        name: 'date',
        type: 'date',
        rules: [{ required: true }],
      },
      {
        label: 'Depot',
        name: 'depot',
        type: 'selectSearch',
        selectName: 'name',
        choices: depots,
        render: (depot) => `[${depot.code}] ${depot.name}`,
        rules: [{ required: true }],
        onChange: (e) => {
          console.log(e)
        }
      },
    ]
  };

  return { formDetails };
};



export default FormDetails;
