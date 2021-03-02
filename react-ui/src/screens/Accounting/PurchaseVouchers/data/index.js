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