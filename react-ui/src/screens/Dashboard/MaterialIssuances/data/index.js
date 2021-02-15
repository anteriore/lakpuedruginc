import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { listProductInventoryByDepot, clearData as clearPI } from '../../ProductInventories/redux';

export const columns = [
  {
    title: 'MIS Number',
    dataIndex: 'misNo',
    key: 'misNo',
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
    form_name: 'fg_issuance',
    form_items: [
    ],
  };


  const tableDetails = {
    label: 'Inventory List',
    name: 'inventoryList',
    key: 'inventoryList',
    rules: [{ required: true }],
    isVisible: productInventories.length > 0,
    fields: [],
    foreignKey: 'id',
    selectedKey: 'id',
    selectData: productInventories, // to be provided in the InputForm
    selectFields: [
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
        key: data.product.id,
        stockOnHand: data.quantity,
      };
      delete processedData.quantity;
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
    renderTableColumns: (fields) => {
      const columns = [];
      fields.forEach((field) => {
        if (typeof field.render === 'undefined' || field.render === null) {
          field.render = (object) => object[field.name];
        }
        if(field.name !== 'stockOnHand' && field.name !== 'quantityRemaining' ){
          columns.push({
            title: field.label,
            key: field.name,
            render: (object) => field.render(object),
          });
        }
        
      });
  
      return columns;
    },
    emptyText: 'Please select a delivery receipt (DR) or an order slip (OS).',
  };

  return { formDetails, tableDetails };
};

export default FormDetails;