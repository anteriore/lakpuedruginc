import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { listAReceiptWithSIByDepot } from '../../AcknowledgementReceipts/redux';
import moment from 'moment';

export const columns = [
  {
    title: 'Depot',
    dataIndex: 'depot',
    key: 'depot',
    datatype: 'object',
  },
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
  {
    title: 'AR Number',
    dataIndex: 'acknowledgementReceipt',
    key: 'acknowledgementReceipt',
    datatype: 'object',
    name: 'number',
  },
  {
    title: 'Client',
    dataIndex: 'acknowledgementReceipt',
    key: 'client',
    datatype: 'object',
    sorter: (a, b) => {
      if (typeof a.acknowledgementReceipt !== 'undefined' && a.acknowledgementReceipt !== null) {
        a = `[${a.acknowledgementReceipt.client.code}] ${a.acknowledgementReceipt.client.name}`;
      } else {
        a = '';
      }

      if (typeof b.acknowledgementReceipt !== 'undefined' && b.acknowledgementReceipt !== null) {
        b = `[${b.acknowledgementReceipt.client.code}] ${b.acknowledgementReceipt.client.name}`;
      } else {
        b = '';
      }
      return a.localeCompare(b);
    },
    render: (object) => {
      if (typeof object !== 'undefined' && object !== null) {
        return `[${object.client.code}] ${object.client.name}`;
      }

      return null;
    },
  },
  {
    title: 'SI Amount Paid',
    dataIndex: 'acknowledgementReceipt',
    key: 'siAmount',
    datatype: 'object',
    sorter: (a, b) => a.acknowledgementReceipt.siAmount - b.acknowledgementReceipt.siAmount,
    render: (object) => {
      if (typeof object !== 'undefined' && object !== null) {
        return object.siAmount;
      }

      return null;
    },
  },
];

const FormDetails = () => {
  const dispatch = useDispatch();
  const depots = useSelector((state) => state.maintenance.depots.list);
  const areceipts = useSelector((state) => state.sales.acknowledgementReceipts.list);
  const [displayModal, setDisplayModal] = useState(false);

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
          dispatch(listAReceiptWithSIByDepot({message, depot: e}))
        }
      },
    ],
    //customized attributes to accomodate this form
    ar_items: [ 
      {
        label: 'Acknowledgement Receipt',
        name: 'acknowledgementReceipt',
        type: 'selectTable',
        toString: (object) => object.number,
        rules: [{ required: true }],
        allowEmpty: true,
        placeholder: "Select Acknowledgement Receipt",
        displayModal: displayModal,
        setDisplayModal: setDisplayModal,
        dataSource: areceipts,
        columns: [
          {
            title: 'AR Number',
            dataIndex: 'number',
            key: 'number',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => moment(new Date(date)).format('DD/MM/YYYY')
          },
          {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
            render: (client) => client.name
          },
          {
            title: 'Total SI Amount',
            dataIndex: 'siAmount',
            key: 'siAmount',
          },
        ],
        rowKey: "id",
        getValueProps: (value) => {
          if(typeof value !== 'undefined'){
            return { value: value.number }
          }
        },
        emptyText: 'No data retrieved for acknowledgement receipts in the selected depot. Please select another depot.'
      },
      {
        label: 'Customer Code',
        name: 'customerCode',
        placeholder: "Customer Code",
        toString: (object) => object.client.code,
        readOnly: true
      },
      {
        label: 'TIN',
        name: 'tin',
        placeholder: "TIN",
        toString: (object) => object.client.tin,
        readOnly: true
      },
      {
        label: 'Received From',
        name: 'receivedFrom',
        placeholder: "Received From",
        toString: (object) => object.client.name,
        readOnly: true
      },
      {
        label: 'Business Address',
        name: 'businessAddress',
        placeholder: "Business Address",
        toString: (object) => object.client.businessAddress,
        readOnly: true
      },
    ]
  };

  //different format from other "tableDetails"
  const tableDetails = {
    columns: [
      {
        title: 'SI Number',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: 'Amount',
        dataIndex: 'appliedAmount',
        key: 'appliedAmount',
      },
      {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
      },
      {
        title: 'Others',
        dataIndex: 'others',
        key: 'others',
      },
      {
        title: 'Withholding Tax',
        dataIndex: 'tax',
        key: 'tax',
      },
      {
        title: 'NET',
        dataIndex: 'appliedAmount',
        key: 'appliedAmount',
      },
    ],
    getValues: (values) => {
      const payments = [];
      values.payments.forEach((payment) => {
        payments.push({
          ...payment.reference,
          appliedAmount: payment.appliedAmount,
        });
      });
      return payments;
    },
  }

  return { formDetails, tableDetails };
};



export default FormDetails;
