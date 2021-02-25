import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Typography, message } from 'antd';
import moment from 'moment';
import { listOrderSlipsByDepotAndStatus, clearData as clearOS } from '../../OrderSlips/redux';
import { listSalesInvoiceByDepotAndStatus, clearData as clearSI } from '../../SalesInvoice/redux';

const { Text } = Typography;

export const columns = [
  {
    title: 'Depot',
    dataIndex: 'depot',
    key: 'depot',
    datatype: 'object',
  },
  {
    title: 'Return Slip Number',
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
    title: 'Sales Number',
    dataIndex: 'salesNumber',
    key: 'salesNumber',
    datatype: 'string',
  },
  {
    title: 'Client',
    dataIndex: 'client',
    key: 'client',
    datatype: 'object',
  },
  {
    title: 'Amount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
  },
];

export const reportColumns = [
  {
    title: 'Depot',
    dataIndex: 'depot',
    key: 'depot',
    datatype: 'object',
  },
  {
    title: 'Return Slip Number',
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
    title: 'Sales Number',
    dataIndex: 'salesNumber',
    key: 'salesNumber',
    datatype: 'string',
  },
  {
    title: 'Client',
    dataIndex: 'client',
    key: 'client',
    datatype: 'object',
  },
  {
    title: 'Amount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
  },
];

const FormDetails = () => {
  const dispatch = useDispatch();
  const depots = useSelector((state) => state.maintenance.depots.list);
  const clients = useSelector((state) => state.maintenance.clients.list);
  const orderSlips = useSelector((state) => state.sales.orderSlips.orderSlipsList);
  const salesInvoices = useSelector((state) => state.sales.salesInvoice.salesInvoiceList);
  const [displayModal, setDisplayModal] = useState(false);
  let salesSlips = [];
  salesSlips = salesSlips.concat(orderSlips).concat(salesInvoices);

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
        label: 'Depot',
        name: 'depot',
        type: 'selectSearch',
        selectName: 'name',
        choices: depots,
        render: (depot) => `[${depot.code}] ${depot.name}`,
        rules: [{ required: true }],
        onChange: (e) => {
          dispatch(clearOS());
          dispatch(clearSI());
          dispatch(listOrderSlipsByDepotAndStatus({ message, depot: e, statuses: ['Pending'] }));
          dispatch(listSalesInvoiceByDepotAndStatus({ depot: e, statuses: ['Pending'] }));
        },
      },
      {
        label: 'Client',
        name: 'client',
        type: 'selectSearch',
        selectName: 'name',
        readOnly: true,
        choices: clients,
        render: (client) => `[${client.code}] ${client.name}`,
        rules: [{ required: true }],
      },
    ],
    rs_items: [
      {
        label: 'DR/OS',
        name: 'salesNumber',
        type: 'selectTable',
        rules: [{ required: true }],
        allowEmpty: true,
        placeholder: 'Select DR/OS',
        displayModal,
        setDisplayModal,
        dataSource: salesSlips,
        columns: [
          {
            title: 'DR/OS Number',
            dataIndex: 'number',
            key: 'number',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => moment(new Date(date)).format('DD/MM/YYYY'),
          },
          {
            title: 'Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
          },
          {
            title: 'Remaining Balance',
            dataIndex: 'remainingBalance',
            key: 'remainingBalance',
          },
        ],
        rowKey: 'id',
        getValueProps: (value) => {
          if (typeof value !== 'undefined') {
            return { value };
          }
        },
        emptyText:
          'No data retrieved for sales slips in the selected depot. Please select another depot.',
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
    label: 'Products',
    name: 'returnSlipProducts',
    key: 'product',
    rules: [{ required: true }],
    fields: [
      {
        label: 'Product',
        name: 'product',
        render: (object) => {
          return object.product.finishedGood.name;
        },
      },
      {
        label: 'Quantity',
        name: 'quantity',
        type: 'readOnly',
        render: (object) => {
          return object.goodQuantity + object.badQuantity;
        },
      },
      {
        label: 'Good Quantity',
        name: 'goodQuantity',
        render: (object) => {
          if (typeof object.quantity !== 'undefined' && object.quantity !== null) {
            return object.quantity - object.badQuantity || object.quantity;
          }

          return object.goodQuantity;
        },
      },
      {
        label: 'Bad Quantity',
        name: 'badQuantity',
        type: 'number',
        rules: [
          { required: true },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              const index = parseInt(rule.field.split('.')[1]);
              const products = getFieldValue('returnSlipProducts');

              if (products[index].quantity >= value) {
                return Promise.resolve();
              }
              return Promise.reject();
            },
          }),
        ],
        min: 0,
        initialValue: 0,
      },
      {
        label: 'Unit Price',
        name: 'unitPrice',
        type: 'number',
        rules: [{ required: true }],
        min: 0,
      },
      {
        label: 'Amount',
        name: 'amount',
        render: (object) => {
          if (typeof object.quantity !== 'undefined' && object.quantity !== null) {
            return (
              (object.quantity - object.badQuantity) * object.unitPrice ||
              object.quantity * object.unitPrice
            );
          }

          return object.goodQuantity * object.unitPrice;
        },
      },
    ],
    summary: (data) => {
      let totalAmount = 0;
      data.forEach(({ goodQuantity, unitPrice }) => {
        totalAmount += goodQuantity * unitPrice || 0;
      });

      return (
        <Table.Summary.Row>
          <Table.Summary.Cell>Total Amount</Table.Summary.Cell>
          <Table.Summary.Cell>
            <Text>{totalAmount}</Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      );
    },
    foreignKey: 'product',
    selectedKey: 'product',
    selectData: null, // to be provided in the InputForm
    selectFields: [
      {
        title: 'Lot Number',
        dataIndex: 'product',
        key: 'product',
        render: (product) => {
          return product.lotNumber;
        },
      },
      {
        title: 'FG Code',
        dataIndex: 'product',
        key: 'product',
        render: (object) => {
          return `[${object.finishedGood.code}] ${object.finishedGood.name}`;
        },
      },
      {
        title: 'Expiration',
        dataIndex: 'product',
        key: 'product',
        render: (object) => {
          return moment(new Date(object.expiration)).format('DD/MM/YYYY');
        },
      },
      {
        title: 'Stock',
        dataIndex: 'quantity',
        key: 'quantity',
      },
    ],
    getValues: (values) => {
      const products = [];
      values.returnSlipProducts.forEach((product) => {
        products.push({
          ...product,
        });
      });
      return products;
    },
    processData: (data) => {
      const processedData = {
        ...data,
        product: data.product,
        unitPrice: data.unitPrice,
        key: data.product.id,
      };
      delete processedData.id;
      return processedData;
    },
    checkSelected: (selectedData, rowData) => {
      if (
        typeof selectedData !== 'undefined' &&
        selectedData !== null &&
        selectedData.some((item) => item.product.id === rowData.product.id)
      ) {
        return true;
      }
    },
    emptyText: 'Please select a delivery receipt (DR) or an order slip (OS).',
  };

  return { formDetails, tableDetails };
};

export default FormDetails;
