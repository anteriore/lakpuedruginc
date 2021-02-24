import { useSelector } from 'react-redux';

export const DisplayDetails = () => {
    const columns = [
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

    const itemColumns = [
        {
            title: 'Item',
            dataIndex: 'item',
            render: (object) => `[${object.code}] ${object.name}`,
        },
        {
            title: 'Type',
            dataIndex: 'item',
            render: (object) => object.type.name,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Unit',
            dataIndex: 'item',
            render: (object) => object.unit.code,
        },
    ];

    return { columns, itemColumns };
};

export const FormDetails = () => {
    const poList = useSelector((state) => state.purchaseOrders.list);
    const itemList = useSelector((state) => state.maintenance.items.list);

    const formDetails = {
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
                type: 'selectSearch',
                selectName: 'name',
                choices: poList,
                render: (object) => `${object.number}`,
                rules: [{ required: true }],
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
                label: 'Remarks',
                name: 'remarks',
                rules: [{}],
                placeholder: 'Remarks (optional)',
                type: 'textArea',
            },
        ]
    };

    const tableDetails = {
        label: 'Received Items',
        name: 'receivedItems',
        key: 'id',
        rules: [{ required: true }],
        fields: [
            {
                label: 'Item ID',
                name: 'itemID',
                type: 'hidden',
            },
            {
                label: 'Code',
                name: 'code',
            },
            {
                label: 'Item Name',
                name: 'name',
            },
            {
                label: 'Type',
                name: 'type',
                render: (object) => object.name,
            },
            {
                label: 'Quantity',
                name: 'quantity',
                type: 'number',
                rules: [{ required: true }],
                min: 0,
            },
            {
                label: 'Unit',
                name: 'unit',
                render: (object) => object.code,
            },
        ],

        foreignKey: 'itemID',
        selectedKey: 'id',
        selectData: itemList,
        selectFields: [
            {
                title: 'Item',
                dataIndex: 'item',
                key: 'item',
                render: (object) => `[${object.code}] ${object.name}`,
            },
            {
                title: 'Type',
                dataIndex: 'item',
                key: 'item',
                render: (object) => object.type.name,
            },
            {
                title: 'Unit',
                dataIndex: 'item',
                key: 'item',
                render: (object) => object.unit.code,
            },
        ],

        processData: (data) => {
            var processedData = {
                ...data,
                ...data.item,
                itemID: data.item.id
            }
            delete processedData.item;
            delete processedData.id;
            return processedData
        },
        checkSelected: (selectedData, rowData) => {
            if (typeof selectedData !== 'undefined' && selectedData !== null && selectedData.some((item) => item.itemID === rowData.item.id)) {
                return true;
            }
        },
    };

    return { formDetails, tableDetails };
};