import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Typography, message } from 'antd';
import moment from 'moment';
import { listOrderSlipsByDepot, clearData as clearOS } from '../../OrderSlips/redux';

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

const FormDetails = () => {
  const dispatch = useDispatch();
  const depots = useSelector((state) => state.maintenance.depots.list);
  const clients = useSelector((state) => state.maintenance.clients.list);
  const orderSlips = useSelector((state) => state.sales.orderSlips.orderSlipsList);
  const productInventories = useSelector((state) => state.maintenance.productInventory.list);
  const [displayModal, setDisplayModal] = useState(false);

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
          dispatch(listOrderSlipsByDepot({ message, depot: e }));
        },
      },
      {
        label: 'Client',
        name: 'client',
        type: 'selectSearch',
        selectName: 'name',
        toggle: true,
        readOnly: false,
        toggleCondition: (value) => {
          if (value === null || typeof value === 'undefined') {
            return true;
          }

          return false;
        },
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
        rules: [],
        allowEmpty: true,
        placeholder: 'Select DR/OS',
        displayModal,
        setDisplayModal,
        dataSource: orderSlips,
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
        label: 'Good Quantity',
        name: 'goodQuantity',
        type: 'number',
        rules: [{ required: true }],
        min: 0,
        initialValue: 0,
      },
      {
        label: 'Bad Quantity',
        name: 'badQuantity',
        type: 'number',
        rules: [{ required: true }],
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
          return object.goodQuantity * object.unitPrice || 0;
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
    selectData: productInventories,
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
        unitPrice: data.product.unitPrice,
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
  };

  return { formDetails, tableDetails };
};

export default FormDetails;
