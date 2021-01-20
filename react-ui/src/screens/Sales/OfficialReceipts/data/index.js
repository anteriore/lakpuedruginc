import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { listAReceiptWithSIByDepot } from '../../AcknowledgementReceipts/redux';

export const columns = [
  {
    title: 'OR Number',
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
    title: 'AR Number',
    dataIndex: 'acknowledgementReceipt',
    key: 'acknowledgementReceipt',
    datatype: 'object',
    name: 'number',
  },
  {
    title: 'Client',
    dataIndex: 'acknowledgementReceipt',
    key: 'client',
    datatype: 'object',
    sorter: (a, b) => {
      if (typeof a.acknowledgementReceipt !== 'undefined' && a.acknowledgementReceipt !== null) {
        a = `[${a.acknowledgementReceipt.client.code}] ${a.acknowledgementReceipt.client.name}`;
      } else {
        a = '';
      }

      if (typeof b.acknowledgementReceipt !== 'undefined' && b.acknowledgementReceipt !== null) {
        b = `[${b.acknowledgementReceipt.client.code}] ${b.acknowledgementReceipt.client.name}`;
      } else {
        b = '';
      }
      return a.localeCompare(b);
    },
    render: (object) => {
      if (typeof object !== 'undefined' && object !== null) {
        return `[${object.client.code}] ${object.client.name}`;
      }

      return null;
    },
  },
  {
    title: 'SI Amount Paid',
    dataIndex: 'acknowledgementReceipt',
    key: 'siAmount',
    datatype: 'object',
    sorter: (a, b) => a.acknowledgementReceipt.siAmount - b.acknowledgementReceipt.siAmount,
    render: (object) => {
      if (typeof object !== 'undefined' && object !== null) {
        return object.siAmount;
      }

      return null;
    },
  },
];

const FormDetails = () => {
  const dispatch = useDispatch();
  const depots = useSelector((state) => state.maintenance.depots.list);
  const areceipts = useSelector((state) => state.sales.acknowledgementReceipts.list);

  const formDetails = {
    form_name: 'official_receipt',
    toggle_name: 'terms',
    form_items: [
      {
        label: 'OR Number',
        name: 'number',
        placeholder: "Official Receipt Number",
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
          dispatch(listAReceiptWithSIByDepot({message, depot: e}))
        }
      },
      {
        label: 'Acknowledgement Receipt',
        name: 'acknowledgementReceipt',
        type: 'selectSearch',
        choices: areceipts || [],
        render: (areceipt) => `${areceipt.id}`,
        rules: [{ required: true }],
        allowEmpty: true
      },
      {
        label: 'Customer Code',
        name: 'customerCode',
        placeholder: "Customer Code",
        readOnly: true
      },
      {
        label: 'TIN',
        name: 'tin',
        placeholder: "TIN",
        readOnly: true
      },
      {
        label: 'Received From',
        name: 'receivedFrom',
        placeholder: "Received From",
        readOnly: true
      },
      {
        label: 'Business Address',
        name: 'businessAddress',
        placeholder: "Business Address",
        readOnly: true
      },
    ]
  };

  //different format from other "tableDetails"
  const tableDetails = {
    columns: [
      {
        title: 'SI Number',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: 'Amount',
        dataIndex: 'appliedAmount',
        key: 'appliedAmount',
      },
      {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
      },
      {
        title: 'Others',
        dataIndex: 'others',
        key: 'others',
      },
      {
        title: 'Withholding Tax',
        dataIndex: 'tax',
        key: 'tax',
      },
      {
        title: 'NET',
        dataIndex: 'appliedAmount',
        key: 'appliedAmount',
      },
    ]
  }

  return { formDetails, tableDetails };
};



export default FormDetails;
