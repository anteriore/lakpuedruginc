import _ from 'lodash';

export const tableHeader = [
  {
    title: 'PV No',
    dataIndex: 'number',
    key: 'number',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.number.length - b.number.length,
  },
  {
    title: 'RR No',
    dataIndex: 'rrNumber',
    key: 'rrNumber',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.number.length - b.number.length,
  },
  {
    title: 'Vendor',
    dataIndex: 'vendor',
    key: 'vendor',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.number.length - b.number.length,
    render: (object) => object?.fullName ?? ""
  },
  {
    title: 'DR No',
    dataIndex: 'drNumber',
    key: 'drNumber',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.number.length - b.number.length,
  },
  {
    title: 'SI No',
    dataIndex: 'siNumber',
    key: 'siNumber',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.number.length - b.number.length,
  },
  {
    title: 'PO No',
    dataIndex: 'poNumber',
    key: 'poNumber',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.number.length - b.number.length,
  },
  {
    title: 'Total AMount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a - b,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.status.length - b.status.length,
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
  const defaultValManual = {
    siNumber: undefined,
    rrNumber: undefined,
    poNumber: undefined,
    drNumber: undefined
  };

  const defaultValAuto = {
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
        label: 'Type',
        name: 'manual',
        type: 'radioGroup',
        selectName: 'name',
        initialValue: false,
        choices: [
          {
            id: false,
            name: "Automatic",
          },
          {
            id: true,
            name: "Manual",
          },
        ],
        rules: [{ required: true }],
      },
      {
        label: 'Account Titles',
        name: 'accountTitles',
        rules: [{ required: true, message: 'Please select account title' }],
        placeholder: 'Select Account Title',
        render: (object) => object?.title ?? "",
        type: 'selectSearch',
        choices: [],
      },
      {
        label: 'Department',
        name: 'department',
        rules: [{ required: true, message: 'Please select department' }],
        placeholder: 'Select Department',
        render: (object) => `[${object?.code ?? ""}] ${object?.name ?? ""}`,
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

  // Manual Form Details
  const manualFormDetails = {
    form_items:   [
      {
        label: 'RR Number',
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
        label: 'Vendor',
        name: 'vendor',
        rules: [{ required: true, message: 'Please select a vendor' }],
        placeholder: 'Select Vendor',
        render: (object) => `[${object?.code ?? ""}] ${object?.fullName ?? ""}`,
        type: 'selectSearch',
        choices: [],
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

  const autoFormDetails = {
    form_items: [
      {
        label: 'RR Number',
        name: 'rrNumber',
        rules: [{ required: true, message: 'Please select RR number' }],
        placeholder: 'Select RR Number',
        render: (object) => `${object?.number ?? ""} - ${object?.status ?? ""}`,
        type: 'selectSearch',
        choices: [],
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
    },
    {
      title: 'Group',
      dataIndex: 'group',
    },
    {
      title: 'Area',
      dataIndex: 'area',
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

  return { formDetails, manualFormDetails, autoFormDetails, accountTableHeader, defaultValManual, defaultValAuto}
}


export default FormDetails;