import { useSelector } from 'react-redux';
import moment from 'moment';

export const columns = [
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
    datatype: 'string',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    datatype: 'string',
    render: (data) => moment(new Date(data)).format('DD/MM/YYYY')
  },
  {
    title: 'Vendor',
    dataIndex: 'vendor',
    key: 'vendor',
    datatype: 'object',
    dataToString: (object) => {
      return `[${object?.code}] ${object?.name}`;
    },
  },
  {
    title: 'Amount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    datatype: 'string',
  },

];

const FormDetails = () => {

  const formDetails = {
    form_name: 'voucher_payables',
    form_items: [
    ],
  };

  return { formDetails };
};

export default FormDetails;
