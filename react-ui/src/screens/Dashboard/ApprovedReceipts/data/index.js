export const columns = [
    {
        title: 'A.R. No',
        dataIndex: 'number',
        key: 'rrNum',
        align: 'center',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.number.length - b.number.length,
    },
    {
        title: 'R.R. No',
        dataIndex: 'receivingReceipt',
        key: 'rrNumber',
        align: 'center',
        defaultSortOrder: 'ascend',
        dataToString: (object) => {
            return object.number
        },
    },
    {
        title: 'Material Type',
        dataIndex: 'item',
        key: 'itemType',
        align: 'center',
        defaultSortOrder: 'ascend',
        dataToString: (object) => {
            return object.type.name
        }
    },
    {
        title: 'Total Items',
        dataIndex: 'totalQuantity',
        key: 'totalQuantity',
        align: 'center',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.number.length - b.number.length,
    },
    {
        title: 'Control Number',
        dataIndex: 'controlNumber',
        key: 'controlNumber',
        align: 'center',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.number.length - b.number.length,
    },
    {
        title: 'DR',
        dataIndex: 'receivingReceipt',
        key: 'drNumber',
        align: 'center',
        defaultSortOrder: 'ascend',
        dataToString: (object) => {
            return object.drNumber
        }
    },
    {
        title: 'SI',
        dataIndex: 'receivingReceipt',
        key: 'siNumber',
        align: 'center',
        defaultSortOrder: 'ascend',
        dataToString: (object) => {
            return object.siNumber
        }
    },
];

export const formDetails = {
    form_name: 'approvedReceipts',
    form_items: [
        {
            label: 'Receiving Receipt',
            name: 'receivingReceipt',
            rules: [{ required: true, message: 'Please select a Receiving Receipt' }],
            render: (object) => {
                return `${object.number}`;
            },
            type: 'select',
            choices: [],
        },
        {
            label: 'Received Item',
            name: 'item',
            rules: [{ required: true, message: 'Please select a Receiving Receipt' }],
            render: (item) => {
                return `[${item.code}] ${item.name}`;
            },
            type: 'select',
            choices: [],
        },
        {
            label: 'A.R. Number',
            name: 'number',
            rules: [{ required: true, message: 'Please provide a valid A.R. Number' }],
            placeholder: 'A.R. Number',
        },
        {
            label: 'Control Number',
            name: 'controlNumber',
            rules: [{ required: true, message: 'Please provide a valid Control Number' }],
            placeholder: 'Control Number',
        },
        {
            label: 'Max Containers',
            name: 'maxContainers',
            type: 'number',
            min: 0,
            rules: [{ required: true, message: 'Please provide a valid Max Containers' }],
            placeholder: 'Max Containers',
        },
        {
            label: 'Specified Gravity',
            name: 'specifiedGravity',
            type: 'number',
            min: 0,
            rules: [{ required: true, message: 'Please provide a valid Specified Gravity' }],
            placeholder: 'Specified Gravity',
        },
        {
            label: 'Date',
            name: 'date',
            type: 'date',
            rules: [{ required: true, message: 'Please select a date' }],
        },
        {
            label: 'Date Created',
            name: 'dateCreated',
            type: 'date',
            rules: [{ required: true, message: 'Please select a date' }],
        },
        {
            label: 'Date Modified',
            name: 'modified',
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
            label: 'Remarks',
            name: 'remarks',
            rules: [{}],
            placeholder: 'Remarks (optional)',
            type: 'textArea',
        },
    ]
};

export const tableDetails = {
    label: 'Approved Item',
    name: 'approvedItem',
    key: 'id',
    rules: [{ required: true }],
    fields: [
    {
        title: 'Item Code',
        dataIndex: 'receivingReceipt',
        key: 'itemCode',
        type: 'readOnly',
        render: (item) => item.code,
    },
    {
        title: 'Unit',
        dataIndex: 'receivingReceipt',
        key: 'itemUnit',
        type: 'readOnly',
        render: (item) => item.unit.code,
    },
    {
        title: 'Received Quantity',
        dataIndex: 'receivingQuantity',
        type: 'number',
        key: 'receivingQuantity',
        min: 0,
        rules: [{ required: true, message: 'Please input a valid quantity' }],
    },
    {
        title: 'Approved Quantity',
        dataIndex: 'approvedQuantity',
        type: 'number',
        key: 'approvedQuantity',
        min: 0,
        rules: [{ required: true, message: 'Please input a valid quantity' }],
    },
    {
        title: 'Rejected Quantity',
        dataIndex: 'rejectedQuantity',
        type: 'number',
        key: 'rejectedQuantity',
        min: 0,
        rules: [{ required: true, message: 'Please input a valid quantity' }],
    },
    {
        title: 'QC Samples',
        dataIndex: 'qcSamples',
        type: 'number',
        key: 'qcSamples',
        min: 0,
        rules: [{ required: true, message: 'Please input a valid quantity' }],
    },
    {
        title: 'Total Quantity',
        dataIndex: 'totalQuantity',
        type: 'number',
        key: 'totalQuantity',
        min: 0,
        rules: [{ required: true, message: 'Please input a valid quantity' }],
    },
    {
        label: 'Expiration',
        dataIndex: 'expiration',
        key: 'expiration',
        type: 'date',
        rules: [{ required: true, message: 'Please select an expiration date' }],
    },
    {
        label: 'Best Before',
        dataIndex: 'bestBefore',
        key: 'bestBefore',
        type: 'date',
        rules: [{ required: true, message: 'Please select an best before date' }],
    },
    {
        label: 'Re-eval',
        dataIndex: 'reevaluation',
        key: 'reevaluation',
        type: 'date',
        rules: [{ required: true, message: 'Please select a reevaluation date' }],
    },
    {
        label: 'Re-test',
        dataIndex: 'retest',
        key: 'retest',
        type: 'date',
        rules: [{ required: true, message: 'Please select a retest date' }],
    },
]};



