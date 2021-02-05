import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { listProductInventoryByDepot, clearData as clearPI } from '../../ProductInventories/redux';

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
  const company = useSelector((state) => state.company.selectedCompany);
  const productInventories = useSelector((state) => state.dashboard.productInventories.list);

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
        onChange: (e) => {
          dispatch(clearPI());
          dispatch(listProductInventoryByDepot({ company, depot: e }));
        },
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
    label: 'Inventory List',
    name: 'inventoryList',
    key: 'inventoryList',
    rules: [{ required: true }],
    isVisible: productInventories.length > 0,
    fields: [
      {
        label: 'Lot Number',
        name: 'product',
        render: (object) => {
          return object.product.lotNumber;
        },
      },
      {
        label: 'Finished Good',
        name: 'product',
        render: (object) => {
          return object.product.finishedGood.name;
        },
      },
      {
        label: 'Stock on Hand',
        name: 'quantity',
        type: 'readOnly',
      },
      {
        label: 'Quantity Issued',
        name: 'quantityIssued',
        type: 'number',
        rules: [{ required: true }],
        min: 0,
      },
      {
        label: 'Quantity Remaining',
        name: 'quantityRemaining',
        render: (object) => {
          if (object.quantity !== null && typeof object.quantity !== 'undefined') {
            return object.quantity - object.quantityIssued || object.quantity;
          }
        },
      },
    ],
    foreignKey: 'id',
    selectedKey: 'id',
    selectData: productInventories, // to be provided in the InputForm
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
        title: 'Date Created',
        dataIndex: 'dateCreated',
        key: 'dateCreated',
        render: (object) => {
          return moment(new Date(object)).format('DD/MM/YYYY');
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