import { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

export const columns = [
  {
    title: 'MRS Number',
    dataIndex: 'mrsNo',
    key: 'mrsNo',
    datatype: 'string',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    datatype: 'date',
  },
  {
    title: 'Received By',
    dataIndex: 'receivedBy',
    key: 'receivedBy',
    datatype: 'object',
    dataToString: (object) => {
      return `${object.firstName} ${object.lastName}`
    }
  },
];

const FormDetails = () => {
  const MISList = useSelector((state) => state.dashboard.materialIssuances.list);
  const [displayModal, setDisplayModal] = useState(false);

  const formDetails = {
    form_name: 'material_receiving',
    form_items: [
      {
        label: 'MRS Number',
        name: 'mrsNo',
        placeholder: 'AUTOGENERATED UPON CREATION',
        readOnly: true,
      },
      {
        label: 'Date',
        name: 'date',
        type: 'date',
        rules: [{ required: true }],
      },
      {
        label: 'MIS Number',
        name: 'mis',
        type: 'selectTable',
        rules: [{ required: true }],
        placeholder: 'Select MIS',
        displayModal,
        setDisplayModal,
        toString: (object) => object.misNo,
        dataSource: MISList,
        columns: [
          {
            title: 'MIS Number',
            dataIndex: 'misNo',
            key: 'misNo',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => moment(new Date(date)).format('DD/MM/YYYY'),
          },
          {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
            render: (object) => {
              return `${object.name}`
            }
          },
          {
            title: 'Requested By',
            dataIndex: 'requestedBy',
            key: 'requestedBy',
            render: (object) => {
              return `${object.firstName} ${object.lastName}`
            }
          },
        ],
        rowKey: 'id',
        getValueProps: (value) => {
          if (typeof value !== 'undefined' && value !== null) {
            return { value: value.misNo };
          }
        },
      },
      {
        label: 'Remarks',
        name: 'remarks',
        type: 'textArea',
        rules: [{ message: 'Please provide a valid remark' }],
        placeholder: 'Remarks',
      },
    ],
  };


  const tableDetails = {
    name: 'mis',
    key: 'mis',
    fields: [
      {
        label: 'Control Number',
        name: 'controlNumber',
      },
      {
        label: 'Item',
        name: 'item',
        render: (object) => {
          return `[${object.item.code}] ${object.item.name}`;
        },
      },
      {
        label: 'Type',
        name: 'item',
        render: (object) => {
          return `${object.item.type.name}`;
        },
      },
      {
        label: 'Quantity',
        name: 'quantity',
      },
    ],
    renderTableColumns: (fields) => {
      const columns = [];
      fields.forEach((field) => {
        if (typeof field.render === 'undefined' || field.render === null) {
          field.render = (object) => object[field.name];
        }
        columns.push({
          title: field.label,
          key: field.name,
          render: (object) => field.render(object),
        });
        
      });
  
      return columns;
    },
  };

  return { formDetails, tableDetails };
};

export default FormDetails;