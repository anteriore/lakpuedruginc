import { object } from "prop-types";

export const tableHeader = [
  {
    title: 'Emp No',
    dataIndex: 'number',
    key: 'number',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.number - b.number,
  },
  {
    title: 'Name',
    align: 'center',
    key: 'name',
    datatype: 'string',
    render: (o) => `${o.firstName} ${o.middleName} ${o.lastName}`,
    sorter: (a,b) => a.length - b.length
  },
  {
    title: 'Given Name',
    dataIndex: 'givenName',
    key: 'givenName',
    align: 'center',
    datatype: 'string',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    align: 'center',
    datatype: 'string',
  },
  {
    title: 'Monthly Salary',
    dataIndex: 'monthlySalary',
    key: 'monthlySalary',
    align: 'center',
    datatype: 'string',
  },
  {
    title: 'Hourly Rate',
    dataIndex: 'hourlyRate',
    key: 'hourlyRate',
    align: 'center',
    datatype: 'string',
  },
];