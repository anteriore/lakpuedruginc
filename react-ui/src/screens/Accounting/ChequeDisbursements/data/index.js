import { useSelector } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';

export const columns = [
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
    datatype: 'string',
  },
  {
    title: 'Payee',
    dataIndex: 'chequePrinting',
    key: 'chequePrinting',
    datatype: 'object',
    dataToString: (object) => {
      return `[${object?.payee?.code}] ${object?.payee?.name}`;
    },
  },
  {
    title: 'Cheque Number',
    dataIndex: 'chequePrinting',
    key: 'chequePrinting',
    datatype: 'object',
    dataToString: (object) => {
      return `[${object?.chequeNumber?.code}] ${object?.chequeNumber?.name}`;
    },
  },
  {
    title: 'Cheque Date',
    dataIndex: 'chequePrinting',
    key: 'chequePrinting',
    datatype: 'object',
    dataToString: (data) => moment(new Date(data?.chequeDate)).format('DD/MM/YYYY'),
  },
  {
    title: 'Bank Account',
    dataIndex: 'chequePrinting',
    key: 'chequePrinting',
    datatype: 'object',
    dataToString: (object) => {
      return `[${object?.bankAccount?.code}] ${object?.bankAccount?.name}`;
    },
  },
  {
    title: 'Amount',
    dataIndex: 'chequePrinting',
    key: 'chequePrinting',
    datatype: 'object',
    dataToString: (object) => {
      return `${object?.totalAmount}`;
    },
  },

];

const FormDetails = () => {
  const chequePrintings = useSelector((state) => state.accounting.chequePrintings.list);
  const accountTitles = useSelector((state) => state.accounting.accountTitles.list);
  const departments = useSelector((state) => state.maintenance.departmentArea.deptList);
  const areas = useSelector((state) => state.maintenance.departmentArea.areaList);
  const groups = useSelector((state) => state.maintenance.groupsCategories.groupList);
  const [displayModal, setDisplayModal] = useState(false);

  const formDetails = {
    form_name: 'cheque_disbursement',
    form_items: [
      {
        label: 'Cheque Printing',
        name: 'chequePrinting',
        type: 'selectTable',
        render: (object) => `${object.number}`,
        rules: [{ required: true }],
        //allowEmpty: true,
        placeholder: 'Select Cheque Printing',
        displayModal,
        setDisplayModal,
        dataSource: chequePrintings,
        columns: [
          {
            title: 'CP Number',
            dataIndex: 'number',
            key: 'number',
          },
          /*{
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => moment(new Date(date)).format('DD/MM/YYYY'),
          },*/
          {
            title: 'Payee',
            dataIndex: 'vendor',
            key: 'vendor',
            render: (data) => {return `[${data?.code}] ${data?.name}`},
          },
        ],
        rowKey: 'id',
        getValueProps: (value) => {
          if (typeof value !== 'undefined') {
            return { value: value?.number ?? "" };
          }
        },
        toString: (data) => data.number
      },
      {
        label: 'Payee',
        name: 'vendor',
        render: (data) => `[${data?.code}] ${data?.name}`,
        rules: [],
        readOnly: true,
      },
      {
        label: 'Cheque Date',
        name: 'chequeDate',
        render: (data) => moment(new Date(data)).format('DD/MM/YYYY'),
        rules: [],
        readOnly: true,
      },
      {
        label: 'Cheque Number',
        name: 'chequeNumber',
        rules: [],
        placeholder: 'Cheque Number',
        readOnly: true,
      },
      {
        label: 'Payee Name',
        name: 'payeeName',
        rules: [],
        placeholder: 'Payee Name',
        readOnly: true,
      },
      {
        label: 'Bank Account',
        name: 'bankAccount',
        render: (data) => `[${data?.code}] ${data?.name}`,
        rules: [],
        readOnly: true,
      },
      /*{
        label: 'Bank Account',
        name: 'bankAccount',
        type: 'selectSearch',
        selectName: 'name',
        choices: bankAccounts,
        render: (object) => `[${object.code}] ${object.name}`,
        rules: [{ required: true }],
      },*/
      {
        label: 'Remarks',
        name: 'remarks',
        type: 'textArea',
        rules: [{ message: 'Please provide a valid remark' }],
        placeholder: 'Remarks',
      },
      {
        label: 'Account Titles',
        name: 'accountTitles',
        type: 'listTable',
        rules: [{ required: true }],
        fields: [
          {
            label: 'Account Titles',
            name: 'accountTitles',
            rules: [{ required: true, message: 'Please select account title' }],
            placeholder: 'Select Account Title',
            render: (object) => `[${object?.type}] ${object?.title}` ?? "",
            type: 'selectSearch',
            choices: accountTitles,
            width: 200,
          },{
            label: 'Department',
            name: 'department',
            rules: [{ required: true, message: 'Please select department' }],
            placeholder: 'Select Department',
            render: (object) => `[${object?.code ?? ""}] ${object?.name ?? ""}`,
            type: 'selectSearch',
            choices: departments,
            width: 200,
          },
          {
            label: 'Group',
            name: 'group',
            rules: [{ required: true, message: 'Please select group' }],
            placeholder: 'Select Group',
            render: (object) => object?.name ?? "",
            type: 'selectSearch',
            choices: groups,
            width: 200,
          },
          {
            label: 'Area',
            name: 'area',
            rules: [{ required: true, message: 'Please select area' }],
            placeholder: 'Select Area',
            render: (object) => `[${object?.code ?? ""}] ${object?.name ?? ""}`,
            type: 'selectSearch',
            choices: areas,
            width: 200,
          },
          {
            label: 'Debit',
            name: 'debit',
            type: 'number',
            rules: [{ required: true, message: 'Please provide debit' }],
            min: 0,
            placeholder: '0.00',
            width: 200,
          },
          {
            label: 'Credit',
            name: 'credit',
            type: 'number',
            rules: [{ required: true, message: 'Please provide credit' }],
            min: 0,
            placeholder: '0.00',
            width: 200,
          },
        ],
      }
    ],
    processDisplayData: (data) => {
      const processedData = {
        ...data,
        //disbursementDate: data.disbursement.date,
      }
      return processedData
    }
  };

  const accountingDetails = {
    form_name: 'cheque_disbursement',
    form_items: [
      {
        label: 'Account Titles',
        name: 'accountTitles',
        rules: [{ required: true, message: 'Please select account title' }],
        placeholder: 'Select Account Title',
        render: (object) => `[${object?.type}] ${object?.title}` ?? "",
        type: 'selectSearch',
        choices: accountTitles,
      },{
        label: 'Department',
        name: 'department',
        rules: [{ required: true, message: 'Please select department' }],
        placeholder: 'Select Department',
        render: (object) => `[${object?.code ?? ""}] ${object?.name ?? ""}`,
        type: 'selectSearch',
        choices: departments,
      },
      {
        label: 'Group',
        name: 'group',
        rules: [{ required: true, message: 'Please select group' }],
        placeholder: 'Select Group',
        render: (object) => object?.name ?? "",
        type: 'selectSearch',
        choices: groups,
      },
      {
        label: 'Area',
        name: 'area',
        rules: [{ required: true, message: 'Please select area' }],
        placeholder: 'Select Area',
        render: (object) => `[${object?.code ?? ""}] ${object?.name ?? ""}`,
        type: 'selectSearch',
        choices: areas,
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
    ],
  }

  return { formDetails, accountingDetails };
};

export default FormDetails;
