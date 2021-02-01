import { useSelector } from 'react-redux';

export const columns = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        datatype: 'string'
    },
    {
        title: 'Item',
        dataIndex: 'item',
        key: 'item',
        datatype: 'string'
    },
    {
        title: 'Control Number',
        dataIndex: 'controlNumber',
        key: 'controlNumber',
        datatype: 'string'
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        datatype: 'string'
    },
    {
        title: 'Unit',
        dataIndex: 'unit',
        key: 'unit',
        datatype: 'string'
    }
];

const FormDetails = () => {
    const items = useSelector((state) => state.dashboard.inventory.items);
    //const companies = useSelector((state) => state.dashboard.companies.list);

    const formDetails = {
        form_name: 'inventory',
        form_items: [
            {
                label: 'Code',
                name: 'code',
                rules: [{ required: true, message: 'Please provide a valid code' }],
                placeholder: 'Code',
            },
            {
                label: 'Item',
                name: 'item',
                type : 'item',
                selectName: 'itemCode',
                choices: items,
                rules: [{ required: true, message: 'Please select an Item' }],
            },
            {
                label: 'Control Number',
                name: 'controlNumber',
                rules: [{ required: true, message: 'Please provide a valid Control Number' }],
                placeholder: 'Control Number',
            },
            {
                label: 'Quantity',
                name: 'quantity',
                type: 'number',
                min: 0,
                rules: [{ required: true, message: 'Please provide a valid amount' }],
                placeholder: 'Quantity',
            },
            {
                label: 'Date Created',
                name: 'dateCreated',
                type: 'date',
                rules: [{ required: true, message: 'Please select a date' }],
                placeholder: 'DD/MM/YYYY',
            },
            {
                label: 'Expiration',
                name: 'expiration',
                type: 'date',
                rules: [{ required: true, message: 'Please select a date' }],
                placeholder: 'DD/MM/YYYY',
            },
            {
                label: 'Best Before',
                name: 'bestBefore',
                type: 'date',
                rules: [{ required: true, message: 'Please select a date' }],
                placeholder: 'DD/MM/YYYY',
            },
            {
                label: 'Reevaluation',
                name: 'reevaluation',
                type: 'date',
                rules: [{ required: true, message: 'Please select a date' }],
                placeholder: 'DD/MM/YYYY',
            },
            {
                label: 'Retest',
                name: 'retest',
                type: 'date',
                rules: [{ required: true, message: 'Please select a date' }],
                placeholder: 'DD/MM/YYYY',
            },
            {
                label: 'Manufacturing Order Reserved',
                name: 'moReserved',
                type: 'number',
                min: 0,
                rules: [{ required: true, message: 'Please provide a valid amount' }],
                placeholder: 'Manufacturing Order Reserved',
            },
            {
                label: 'Manufacturing Order Quantity',
                name: 'moQuantity',
                type: 'number',
                min: 0,
                rules: [{ required: true, message: 'Please provide a valid amount' }],
                placeholder: 'Manufacturing Order Quantity',
            },
            {
                label:'Packaging Process Quantity',
                name: 'ppQuantity',
                type: 'number',
                min: 0,
                rules: [{ required: true, message: 'Please provide a valid amount' }],
                placeholder: 'Packaging Process Quantity',
            },
        ]
    };

    return { formDetails };
};

export default FormDetails;