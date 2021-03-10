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
    datatype: 'date',
  },
  {
    title: 'Bank Account',
    dataIndex: 'bankAccount',
    key: 'bankAccount',
    datatype: 'object',
    dataToString: (object) => `[${object.code}] ${object.name}`,
  },
  {
    title: 'Voucher',
    dataIndex: 'voucher',
    key: 'voucher',
    datatype: 'object',
    dataToString: (object) => `${object?.number}`,
  },
  {
    title: 'Prepared By',
    dataIndex: 'preparedBy',
    key: 'preparedBy',
    datatype: 'object',
    dataToString: (object) => `${object.firstName} ${object.lastName}`,
  },
  {
    title: 'Variation',
    dataIndex: 'variation',
    key: 'variation',
    datatype: 'string',
  },
];

const FormDetails = () => {

  const formDetails = {
    form_name: 'cash_receipt_voucher',
    form_items: [
    ],
  };

  return { formDetails };
};

export default FormDetails;
