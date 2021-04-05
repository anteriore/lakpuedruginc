import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import moment from 'moment';
import { listOrderSlipsByDepotAndStatus, clearData as clearOS } from '../../../Sales/OrderSlips/redux';
import { listSalesInvoiceByDepotAndStatus, clearData as clearSI } from '../../../Sales/SalesInvoice/redux';

export const DisplayDetails = () => {
    const columns = [
        {
            title: 'D.M. No.',
            dataIndex: 'number',
            key: 'number',
            //defaultSortOrder: 'ascend',
            //sorter: (a, b) => a.number.length - b.number.length,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
            defaultSortOrder: 'ascend',
            datatype: 'date'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            defaultSortOrder: 'ascend',
            datatype: 'object',
            dataToString: (object) => {
                return object.code
            }
        },
        {
            title: 'Client',
            dataIndex: 'reference',
            key: 'reference',
            align: 'center',
            defaultSortOrder: 'ascend',
            datatype: 'object',
            dataToString: (object) => {
                return object.salesOrder.client.name
            }
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.number.length - b.number.length,
        },
        {
            title: 'Depot',
            dataIndex: 'depot',
            key: 'depot',
            align: 'center',
            defaultSortOrder: 'ascend',
            datatype: 'object',
            dataToString: (object) => {
                return object.code
            }
        },
    ];

    return { columns };
};

export const FormDetails = () => {
    const dispatch = useDispatch();
    const depots = useSelector((state) => state.maintenance.depots.list);
    //const clients = useSelector((state) => state.maintenance.clients.list);
    const orderSlips = useSelector((state) => state.sales.orderSlips.orderSlipsList);
    const salesInvoices = useSelector((state) => state.sales.salesInvoice.salesInvoiceList);
    const memoTypes = useSelector((state) => state.maintenance.memoTypes.memoList);
    const [displayModal, setDisplayModal] = useState(false);
    let salesSlips = [];
    salesSlips = salesSlips.concat(orderSlips).concat(salesInvoices);

    const formDetails = {
        form_name: 'debit_memo',
        toggle_name: 'reference',
        form_items: [
            {
                label: 'Debit Memo No.',
                name: 'number',
                placeholder: 'AUTOGENERATED UPON CREATION',
                readOnly: true,
            },
            {
                label: 'Date',
                name: 'date',
                type: 'date',
                rules: [{ required: true, message: 'Please select a date' }],
            },
            {
                label: 'Depot',
                name: 'depot',
                type: 'selectSearch',
                selectName: 'name',
                choices: depots,
                render: (object) => `[${object.code}] ${object.name}`,
                rules: [{ required: true }],
                onChange: (e) => {
                  dispatch(clearOS());
                  dispatch(clearSI());
                  dispatch(listOrderSlipsByDepotAndStatus({ message, depot: e, statuses: ['Pending'] }));
                  dispatch(listSalesInvoiceByDepotAndStatus({ depot: e, statuses: ['Pending'] }));
                }, 
            },
            {
                label: 'Memo Type',
                name: 'type',
                type: 'selectSearch',
                selectName: 'name',
                choices: memoTypes,
                render: (object) => `[${object.code}] ${object.name}`,
                rules: [{ required: true }],
            },
            /*{
                label: 'Client',
                name: 'client',
                type: 'selectSearch',
                selectName: 'name',
                readOnly: true,
                choices: clients,
                render: (object) => `[${object.code}] ${object.name}`,
                rules: [{ required: true }],
            },*/
            {
                label: 'Amount Paid',
                name: 'amount',
                type: 'number',
                min: 0,
                rules: [{ required: true, message: 'Please provide an Amount Paid' }],
                placeholder: 'Max Containers',
            },
            {
                label: 'Remarks',
                name: 'remarks',
                rules: [{}],
                placeholder: 'Remarks (optional)',
                type: 'textArea',
            },
        ],
        memo_items: [
            {
                label: 'DR/OS',
                name: 'reference',
                type: 'selectTable',
                rules: [{ required: true }],
                allowEmpty: true,
                placeholder: 'Select DR/OS',
                displayModal,
                setDisplayModal,
                dataSource: salesSlips,
                columns: [
                    {
                        label: 'Sales Slip ID',
                        name: 'id',
                        type: 'hidden',
                    },
                    {
                        title: 'DR/OS Number',
                        dataIndex: 'number',
                        key: 'number',
                    },
                    {
                        title: 'Type',
                        dataIndex: 'type',
                        key: 'type',
                    },
                    {
                        title: 'Date',
                        dataIndex: 'date',
                        key: 'date',
                        render: (date) => moment(new Date(date)).format('DD/MM/YYYY'),
                    },
                    {
                        title: 'Client',
                        dataIndex: 'salesOrder',
                        key: 'salesOrder',
                        render: (object) => object.client.name,
                    },
                    {
                        title: 'Amount',
                        dataIndex: 'totalAmount',
                        key: 'totalAmount',
                    },
                ],
                rowKey: 'id',
                getValueProps: (value) => {
                    if (typeof value !== 'undefined') {
                        return { value };
                    }
                },
                emptyText:
                  'No data retrieved for sales slips in the selected depot. Please select another depot.',
            },
        ],
    };

    return { formDetails };
};
