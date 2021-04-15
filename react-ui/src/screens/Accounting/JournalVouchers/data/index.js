import _ from 'lodash';

export const tableHeader = [
  {
    title: 'JV No',
    dataIndex: 'number',
    key: 'number',
    align: 'center',
    defaultSortOrder: 'ascend',
    datatype: 'string'
  },
  {
    title: 'RR No',
    dataIndex: 'rrNumber',
    key: 'rrNumber',
    align: 'center',
    defaultSortOrder: 'ascend',
    datatype: 'string'
  },
  {
    title: 'Vendor',
    dataIndex: 'vendor',
    key: 'vendor',
    align: 'center',
    defaultSortOrder: 'ascend',
    datatype: 'object',
    dataToString: (object) => `[${object?.code ?? ""}] ${object?.name ?? ""}`
  },
  {
    title: 'DR No',
    dataIndex: 'drNumber',
    key: 'drNumber',
    align: 'center',
    defaultSortOrder: 'ascend',
    datatype: 'string'
  },
  {
    title: 'SI No',
    dataIndex: 'siNumber',
    key: 'siNumber',
    align: 'center',
    defaultSortOrder: 'ascend',
    datatype: 'string'
  },
  {
    title: 'PO No',
    dataIndex: 'poNumber',
    key: 'poNumber',
    align: 'center',
    defaultSortOrder: 'ascend',
    datatype: 'string'
  },
  {
    title: 'Total Amount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    align: 'center',
    defaultSortOrder: 'ascend',
    datatype: 'number'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    defaultSortOrder: 'ascend',
    datatype: 'string'
  },
];

export const tableHeaderAccounts = [
  {
    title: 'Account Title',
    dataIndex: 'accountTitle',
    render: (object) => object?.title ?? ""
  },
  {
    title: 'Department',
    dataIndex: 'department',
    render: (object) => object?.name ?? ""
  },
  {
    title: 'Group',
    dataIndex: 'group',
    render: (object) => object?.name ?? ""
  },
  {
    title: 'Area',
    dataIndex: 'area',
    render: (object) => object?.name ?? ""
  },
  {
    title: 'Debit',
    render: (object) => {
      if (object?.accountTitle?.type !== undefined) {
        if(_.toLower(object?.accountTitle?.type) === 'debit') {
          return object?.amount ?? "---"
        }
        return "---"
      } 

      return "---"
    }
  },
  {
    title: 'Credit',
    render: (object) => {
      if (object?.accountTitle?.type !== undefined) {
        if(_.toLower(object?.accountTitle?.type) === 'credit') {
          return object?.amount ?? "---"
        }
        return "---"
      } 

      return "---"
    }
  },
]


const FormDetails = () => {
  const defaultValWithAdj = {
    voucher: undefined,
    siNumber: undefined,
    rrNumber: undefined,
    rrDate: undefined,
    poNumber: undefined,
    drNumber: undefined
  };

  const defaultValNewAdj = {
    siNumber: undefined,
    rrNumber: undefined,
    poNumber: undefined,
    drNumber: undefined,
    rrDate: undefined,
    vendor: undefined,
  };

  const formDetails = {
    form_name: 'purchaseVouchers',
    form_items: [
      {
        label: 'MRIS Number',
        name: 'number',
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
        label: 'Adjustment',
        name: 'adjustment',
        type: 'radioGroup',
        selectName: 'name',
        initialValue: false,
        choices: [
          {
            id: false,
            name: "New",
          },
          {
            id: true,
            name: "With Adjustment",
          },
        ],
        rules: [{ required: true }],
      },
      {
        label: 'Account Titles',
        name: 'accountTitles',
        rules: [{ required: true, message: 'Please select account title' }],
        placeholder: 'Select Account Title',
        render: (object) => `[${object?.type ?? ""}] ${object?.title ?? ""}`,
        type: 'selectSearch',
        width: 150,
        choices: [],
      },
      {
        label: 'Department',
        name: 'department',
        rules: [{ required: true, message: 'Please select department' }],
        placeholder: 'Select Department',
        render: (object) => `[${object?.code ?? ""}] ${object?.name ?? ""}`,
        width: 150,
        type: 'selectSearch',
        choices: [],
      },
      {
        label: 'Group',
        name: 'group',
        rules: [{ required: true, message: 'Please select group' }],
        placeholder: 'Select Group',
        render: (object) => object?.name ?? "",
        type: 'selectSearch',
        width: 150,
        choices: [],
      },
      {
        label: 'Area',
        name: 'area',
        rules: [{ required: true, message: 'Please select area' }],
        placeholder: 'Select Area',
        render: (object) => `[${object?.code ?? ""}] ${object?.name ?? ""}`,
        type: 'selectSearch',
        choices: [],
      },
      {
        label: 'Debit',
        name: 'debit',
        type: 'number',
        rules: [{ required: true, message: 'Please provide debit' }],
        min: 0,
        placeholder: '0.00',
      },
      {
        label: 'Credit',
        name: 'credit',
        type: 'number',
        rules: [{ required: true, message: 'Please provide credit' }],
        min: 0,
        placeholder: '0.00',
      },
      {
        label: 'Remarks',
        name: 'remarks',
        type: 'textArea',
        rules: [{ message: 'Please provide a valid remark' }],
        placeholder: 'Remarks',
      }
    ]
  }

  const newAdjustmentFormDetails = {
    form_items:   [
      {
        label: 'Vendor',
        name: 'vendor',
        rules: [{ required: true, message: 'Please select a vendor' }],
        placeholder: 'Select Vendor',
        render: (object) => `[${object?.code ?? ""}] ${object?.fullName ?? ""}`,
        type: 'selectSearch',
        choices: [],
      },
      {
        label: 'RR #',
        name: 'rrNumber',
        placeholder: 'Enter RR Number',
        rules: [{ required: true, message: "Please enter RR number" }],
      },
      {
        label: 'RR Date',
        name: 'rrDate',
        type: 'date',
        rules: [{ required: true }],
      },
      {
        label: 'SI #',
        name: 'siNumber',
        placeholder: 'Enter SI number',
        rules: [{ required: true, message: "Please enter SI number" }],
      },
      {
        label: 'DR #',
        name: 'drNumber',
        placeholder: 'Enter DR number',
        rules: [{ required: true, message: "Please enter DR number" }],
      },
      {
        label: 'PO #',
        name: 'poNumber',
        placeholder: 'Enter PO number',
        rules: [{ required: true, message: "Please enter PO number" }],
      },
    ]
  }

  const withAdjustmentFormDetails = {
    form_items: [
      {
        label: 'Voucher',
        name: 'voucher',
        rules: [{ required: true, message: 'Please select voucher number' }],
        placeholder: 'Select Voucher',
        render: (object) => `${object?.number ?? ""} - ${object?.status ?? ""}`,
        type: 'selectSearch',
        choices: [],
      },
      {
        label: 'RR #',
        name: 'rrNumber',
        placeholder: '',
        readOnly: true,
      },
      {
        label: 'RR Date',
        name: 'rrDate',
        placeholder: '',
        readOnly: true,
      },
      {
        label: 'SI #',
        name: 'siNumber',
        placeholder: '',
        readOnly: true,
      },
      {
        label: 'DR #',
        name: 'drNumber',
        placeholder: '',
        readOnly: true,
      },
      {
        label: 'PO #',
        name: 'poNumber',
        placeholder: '',
        readOnly: true,
      },
    ]
  }

  const accountTableHeader = [
    {
      title: 'Account Title',
      dataIndex: 'accountTitle',
      render: (object) => object.title,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      render: (object) => object?.name ?? ""
    },
    {
      title: 'Group',
      dataIndex: 'group',
      render: (object) => object?.name ?? ""
    },
    {
      title: 'Area',
      dataIndex: 'area',
      render: (object) => object?.name ?? ""
    },
    {
      title: 'Debit',
      dataIndex: 'debit',
      render: (value) => value ?? "---"
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      render: (value) => value ?? "---"
    },
    {
      title: 'Action',
    },
  ];

  return { formDetails, withAdjustmentFormDetails, newAdjustmentFormDetails, accountTableHeader, defaultValNewAdj, defaultValWithAdj}
}


export default FormDetails;