import { useSelector } from 'react-redux';
const { list: poList } = useSelector((state) => state.purchaseOrders.list);

export const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        defaultSortOrder: 'ascend',
        datatype: 'date'
    },
    {
        title: 'R.R No',
        dataIndex: 'rrNumb',
        key: 'rrNum',
        align: 'center',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.number.length - b.number.length,
    },
    {
        title: 'DR/SI',
        dataIndex: 'drSI',
        key: 'drSI',
        align: 'center',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.number.length - b.number.length,
    },
    {
        title: 'Received By',
        dataIndex: 'receivedBy',
        key: 'receivedBy',
        align: 'center',
        defaultSortOrder: 'ascend',
        render: (object) => object.firstName.concat(` ${object.lastName}`),
        sorter: (a, b) =>
        a.preparedBy.firstName
            .concat(` ${a.preparedBy.lastName}`)
            .localeCompare(b.preparedBy.firstName.concat(` ${b.preparedBy.lastName}`)),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.number.length - b.number.length,
    },
];

export const formDetails = {
    form_name: 'inventory',
    form_items: [
        {
            label: 'R.R. Number',
            name: 'rrNum',
            rules: [{ required: true, message: 'Please provide a valid R.R. Number' }],
            placeholder: 'R.R. Number',
        },
        {
            label: 'Date Created',
            name: 'dateCreated',
            type: 'date',
            rules: [{ required: true, message: 'Please select a date' }],
        },
        {
            label: 'Received By',
            name: 'receivedBy',
            rules: [{ required: true, message: 'Please login a valid user' }],
            placeholder: '',
            type: 'readOnly',
            writeOnly: true,
        },
        {
            label: 'Purchase Order',
            name: 'purchaseOrder',
            rules: [{ required: true, message: 'Please select a Purchase Order' }],
            placeholder: 'Purchase Order',
            type: 'select',
            choices: poList,
        },
        {
            label: 'Delivery Receipt No.',
            name: 'drNum',
            rules: [{ required: true, message: 'Please provide a Delivery Receipt No.' }],
            placeholder: 'Delivery Receipt No.',
        },
        {
            label: 'Sales Invoice No.',
            name: 'siNum',
            rules: [{ required: true, message: 'Please provide a Sales Invoice No.' }],
            placeholder: 'Sales Invoice No.',
        },
        {
            label: 'Purchase Order No.',
            name: 'poNum',
            rules: [{ required: true, message: 'Please provide a Purchase Order No.' }],
            placeholder: 'Purchaser Order No.',
        },
        {
            label: 'Delivery Type',
            name: 'deliveryType',
            rules: [{ required: true, message: 'Please provide a Delivery Type' }],
            placeholder: 'Delivery Type',
        },
        {
            label: 'Origin',
            name: 'origin',
            rules: [{ required: true, message: 'Please specify the origin' }],
            placeholder: 'Origin',
        },
        {
            label: 'Status',
            name: 'status',
            rules: [{ required: true, message: 'Please select a sales order status' }],
            placeholder: 'Receiving Receipt Status',
            type: 'select',
            choices: [
                { id: 'pending', name: 'Pending' },
                { id: 'complete', name: 'Complete' },
                { id: 'approved', name: 'Approved' },
            ],
        },
        {
            label: 'Remarks',
            name: 'remarks',
            rules: [{}],
            placeholder: 'Remarks (optional)',
            type: 'textArea',
        },
    ]
};

export const tablePurchaseRequest = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'PRF #',
        dataindex: 'prfNum',
        key: 'prfNum',
    },
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Name',
        dataIndex: 'itemName',
        key: 'itemName',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Previous RR',
        dataIndex: 'prevRR',
        key: 'prevRR',
    },
    {
        title: 'Lacking',
        dataIndex: 'lacking',
        key: 'lacking',
    },
    {
        title: 'Quantity Received',
        dataIndex: 'quantityReceived',
        key: 'quantityReceived',
    },
  ];
  
  export const tableSelectPR = [
    {
        title: 'PRF #',
        dataindex: 'prfNum',
    },
    {
        title: 'Code',
        dataIndex: 'code',
    },
    {
        title: 'Name',
        dataIndex: 'itemName',
    },
    {
        title: 'Quantity Requested',
        dataIndex: 'quantityRequested',
    },
  ];




