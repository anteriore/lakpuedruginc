import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import moment from 'moment';
import { Table, Typography } from 'antd';

const { Text } = Typography;

export const columns = [
  {
    title: 'Number',
    dataIndex: 'chequePrinting',
    key: 'chequePrinting',
    datatype: 'object',
    dataToString: (object) => {
      return `${object?.number}`;
    },
  },
  {
    title: 'Payee',
    dataIndex: 'chequePrinting',
    key: 'chequePrinting',
    datatype: 'object',
    dataToString: (object) => {
      return `[${object?.vendor?.code}] ${object?.vendor?.name}`;
    },
  },
  {
    title: 'Cheque Number',
    dataIndex: 'chequePrinting',
    key: 'chequePrinting',
    datatype: 'object',
    dataToString: (object) => {
      return `${object?.chequeNumber}`;
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
  const [selectedAccount, setSelectedAccount] = useState(null);

  const formDetails = {
    form_name: 'cheque_disbursement',
    form_items: [
      {
        label: 'Cheque Disbursement',
        name: 'chequePrinting',
        type: 'selectTable',
        render: (object) => `${object.number}`,
        rules: [{ required: true }],
        //allowEmpty: true,
        placeholder: 'Select Cheque Disbursement',
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
      
    ],
    account_titles: {
      label: 'Account Titles',
      name: 'accountTitles',
      type: 'listTable',
      rules: [{ required: true }],
      fields: [
        {
          label: 'Account Titles',
          name: 'accountTitle',
          rules: [{ required: true, message: 'Please select account title' }],
          placeholder: 'Select Account Title',
          render: (object) => `[${object?.type}] ${object?.title}` ?? "",
          type: 'selectSearch',
          choices: accountTitles,
          width: 200,
          onChange: (e) => {
            const accountTitle = accountTitles.find((data) => data.id === e)
            setSelectedAccount(accountTitle)
          }
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
          dependencies: ['accountTitle'],
          rules: [{ required: true, message: 'Please provide debit' }],
          isVisible: (selectedAccount?.type ?? "") === "Debit",
          initialValue: 0,
          min: 0,
          width: 200,
        },
        {
          label: 'Credit',
          name: 'credit',
          type: 'number',
          rules: [{ required: true, message: 'Please provide credit' }],
          isVisible: (selectedAccount?.type ?? "") === "Credit",
          initialValue: 0,
          min: 0,
          width: 200,
        },
      ],
      handleAdd: (values) => {
        const accountTitle = accountTitles.find((data) => data.id === values.accountTitle)
        const department = departments.find((data) => data.id === values.department)
        const group = groups.find((data) => data.id === values.group)
        const area = areas.find((data) => data.id === values.area)
        return {
          ...values,
          accountTitle,
          department,
          group,
          area
        }
      },
      summary: (data) => {
        let totalCredit = 0;
        let totalDebit = 0;
        data.forEach((item) => {
          totalCredit += (item?.credit ?? 0)
          totalDebit += (item?.debit ?? 0)
        });
  
        return (
          <Table.Summary.Row>
            <Table.Summary.Cell>Total Credit</Table.Summary.Cell>
            <Table.Summary.Cell>
              <Text>{totalCredit}</Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell>Total Debit</Table.Summary.Cell>
            <Table.Summary.Cell>
              <Text>{totalDebit}</Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        );
      },
    },
    form_table: [
      {
        label: 'Number',
        name: 'number',
      },
      {
        label: 'Date',
        name: 'date',
        render: (data) => `${moment(new Date(data.date)).format('DD/MM/YYYY')}`
      },
      {
        label: 'Payee',
        name: 'vendor',
        render: (data) => `[${data.vendor.code}] ${data.vendor.name}`
      },
      {
        label: 'Remarks',
        name: 'remarks',
      },
      {
        label: 'Amount',
        name: 'totalAmount',
      },
    ],
    processDisplayData: (data) => {
      const processedData = {
        ...data,
        //disbursementDate: data.disbursement.date,
      }
      return processedData
    }
  };

  return { formDetails };
};

export default FormDetails;
