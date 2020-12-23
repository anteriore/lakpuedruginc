import React from 'react';
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
    title: 'TIN',
    dataIndex: 'tin',
    key: 'tin',
    datatype: 'string',
  },
  {
    title: 'Proprietor',
    dataIndex: 'proprietor',
    key: 'proprietor',
    datatype: 'string',
  },
  {
    title: 'Business Address',
    dataIndex: 'businessAddress',
    key: 'businessAddress',
    datatype: 'string',
  },
  {
    title: 'Line of Business',
    dataIndex: 'lineOfBusiness',
    key: 'lineOfBusiness',
    datatype: 'string',
  },
];

const FormDetails = () => {
  const salesReps = useSelector((state) => state.maintenance.salesReps.list);
  const clusterCodes = useSelector((state) => state.maintenance.clusterCode.clusterList);
  const institionalCodes = useSelector((state) => state.maintenance.institutionalCodes.institutionList);

  const formDetails = {
    form_name: 'pdc_disbursement',
    form_items: [
      {
        label: 'Name',
        name: 'name',
        rules: [{ required: true, message: 'Please provide a valid name' }],
        placeholder: 'Name',
      },
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid code' }],
        placeholder: 'Code',
      },
      {
        label: 'Business Address',
        name: 'businessAddress',
        rules: [{ required: true, message: 'Please provide a valid address' }],
        placeholder: 'Business Address',
      },
      {
        label: 'Delivery Address',
        name: 'deliveryAddress',
        rules: [{ required: true, message: 'Please provide a valid address' }],
        placeholder: 'Delivery Address',
      },
      {
        label: 'Line of Business',
        name: 'lineOfBusiness',
        rules: [{ required: true, message: 'Please provide a valid line of business' }],
        placeholder: 'Line of Business',
      },
      {
        label: 'Telephone Numbers',
        name: 'telephoneNumbers',
        rules: [{ required: true, message: 'Please provide valid Telephone Numbers' }],
        placeholder: 'Telephone Numbers',
      },
      {
        label: 'Years in Business',
        name: 'yearsInBusiness',
        type: 'number',
        min: 0,
        rules: [{ required: true, message: 'Please provide a valid Years in Business' }],
        placeholder: 'Years in Business',
      },
      {
        label: 'Proprietor',
        name: 'proprietor',
        rules: [{ required: true, message: 'Please provide a valid proprietor' }],
        placeholder: 'Proprietor',
      },
      {
        label: 'TIN',
        name: 'tin',
        rules: [{ required: true, message: 'Please provide a valid TIN' }],
        placeholder: 'TIN',
      },
      {
        label: 'Terms',
        name: 'terms',
        type: 'number',
        min: 0,
        rules: [{ required: true, message: 'Please provide valid Terms' }],
        placeholder: 'Terms',
      },
      {
        label: 'Max Credit Limit',
        name: 'maxCreditLimit',
        type: 'number',
        min: 0,
        rules: [{ required: true, message: 'Please provide a valid Max Credit Limit' }],
        placeholder: 'Max Credit Limit',
      },
      {
        label: 'Sales Representative',
        name: 'salesRep',
        type: 'select',
        selectName: 'codename',
        choices: salesReps,
        rules: [{ required: true, message: 'Please select a Sales Representative'}],
      },
      {
        label: 'Cluster',
        name: 'clusterCode',
        type: 'select',
        selectName: 'code',
        choices: clusterCodes,
        rules: [{ required: true, message: 'Please select a Cluster' }],
      },
      {
        label: 'Institutional Codes',
        name: 'institutionalCode',
        type: 'select',
        selectName: 'code',
        choices: institionalCodes,
        rules: [{ required: true, message: 'Please select an Institutional Code' }],
      },
      {
        label: 'VAT (%)',
        name: 'vat',
        type: 'number',
        min: 0,
        rules: [{ required: true, message: 'Please provide a valid value for VAT' }],
        placeholder: 'VAT',
      },
      {
        label: 'Discount (%)',
        name: 'discount',
        type: 'number',
        min: 0,
        rules: [{ required: true, message: 'Please provide a valid value for a Discount' }],
        placeholder: 'Discount',
      },
      {
        label: 'Client References',
        name: 'clientReferencesList',
        type: 'list',
        selectName: 'name',
        fields: [
          {
            name: 'id',
            type: 'hidden',
          },
          {
            label: 'Name',
            name: 'name',
            type: 'string',
            rules: [{ required: true, message: 'Name is required' }],
            placeholder: 'Name',
          },
          {
            label: 'Type',
            name: 'type',
            type: 'string',
            rules: [{ required: true, message: 'Type is required' }],
            placeholder: 'Type',
          },
          {
            label: 'Branch',
            name: 'branch',
            type: 'string',
            rules: [{ required: true, message: 'Branch is required' }],
            placeholder: 'Branch',
          },
          {
            label: 'Telephone Number',
            name: 'telephoneNumber',
            type: 'string',
            rules: [{ required: true, message: 'Telephone number is required' }],
            placeholder: 'Telephone Number',
          },
        ],
      },
    ],
  };

  return { formDetails };
};

export default FormDetails;
