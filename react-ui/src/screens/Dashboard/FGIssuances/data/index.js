import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export const columns = [
  {
    title: 'FG-IS Number',
    dataIndex: 'pisNo',
    key: 'pisNo',
    datatype: 'string',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    datatype: 'date',
  },
  {
    title: 'Requested By',
    dataIndex: 'requestedBy',
    key: 'requestedBy',
    datatype: 'object',
    dataToString: (object) => {
      return `${object.firstName} ${object.lastName}`
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    datatype: 'status',
  },
];

const FormDetails = () => {
  const dispatch = useDispatch();
  const depots = useSelector((state) => state.maintenance.depots.list);

  const formDetails = {
    form_name: 'return_slip',
    toggle_name: 'salesNumber',
    form_items: [
      {
        label: 'Return Slip Number',
        name: 'number',
        placeholder: 'Return Slip Number',
        rules: [{ required: true }],
      },
      {
        label: 'Date',
        name: 'date',
        type: 'date',
        rules: [{ required: true }],
      },
      {
        label: 'Ship from',
        name: 'fromDepot',
        type: 'selectSearch',
        selectName: 'name',
        choices: depots,
        render: (depot) => `[${depot.code}] ${depot.name}`,
        rules: [{ required: true }],
      },
      {
        label: 'Ship to',
        name: 'toDepot',
        type: 'selectSearch',
        selectName: 'name',
        choices: depots,
        render: (depot) => `[${depot.code}] ${depot.name}`,
        rules: [{ required: true }],
      },
    ],
  };

  return { formDetails };
};

export default FormDetails;