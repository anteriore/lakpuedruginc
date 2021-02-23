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
        dataIndex: 'number',
        key: 'rrNum',
        align: 'center',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.number.length - b.number.length,
    },
    {
        title: 'DR',
        dataIndex: 'drNumber',
        key: 'drNumber',
        align: 'center',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.number.length - b.number.length,
    },
    {
        title: 'SI',
        dataIndex: 'siNumber',
        key: 'siNumber',
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
    form_name: 'receivingReceipts',
    form_items: [
        {
            label: 'R.R. Number',
            name: 'rrNum',
            rules: [{ required: true, message: 'Please provide a valid R.R. Number' }],
            placeholder: 'R.R. Number',
        },
        {
            label: 'Date Created',
            name: 'date',
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
            render: (object) => {
                return `[${object.code}] ${object.name}`;
            },
            type: 'select',
            choices: [],
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
            rules: [{ required: true, message: 'Please select a receipt status' }],
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

  export const tabelDetails = [
    {
        title: 'Item Code',
        dataIndex: 'item',
        key: 'itemCode',
        render: (object) => object.code,
        
    },
    {
        title: 'Name',
        dataIndex: 'item',
        key: 'itemName',
        render: (object) => object.name,
    },
    {
        title: 'Type',
        dataIndex: 'item',
        key: 'itemType',
        render: (object) => object.type.name,
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        type: 'number',
        key: 'itemQuantity',
        min: 0,
        rules: [{ required: true, message: 'Please input a valid quantity' }],
    },
    {
        title: 'Unit',
        dataIndex: 'item',
        key: 'itemUnit',
        render: (object) => object.unit.name,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'itemStatus',
        type: 'select',
        rules: [{ required: true, message: 'Please select an item status' }],
        choices: [
            { id: 'quarantined', name: 'Quarantined' },
            { id: 'tempStat1', name: 'Temp Status 1' },
            { id: 'tempStat2', name: 'Temp Status 2' },
        ],
    },
  ];
