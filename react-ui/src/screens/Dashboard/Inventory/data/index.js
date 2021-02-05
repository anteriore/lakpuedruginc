export const columns = [
    {
        title: 'Item ID',
<<<<<<< Updated upstream
        dataIndex: 'id',
        key: 'id',
=======
        dataIndex: 'item',
        key: 'itemName',
        render: (object) => object.name,
>>>>>>> Stashed changes
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
    },
    {
        title: 'Unit',
<<<<<<< Updated upstream
        dataIndex: 'unit',
        key: 'unit',
        datatype: 'string'
=======
        dataIndex: 'item',
        key: 'itemUnit',
        render: (object) => object.unit.name,
>>>>>>> Stashed changes
    },
    {
        title: 'Date Created',
        dataIndex: 'dateCreated',
        key: 'date',
<<<<<<< Updated upstream
        datatype: 'string'
=======
        datatype: 'date'
>>>>>>> Stashed changes
    },
];

const FormDetails = () => {
    const formDetails = {
        form_name: 'inventory',
        form_items: [
            {
                label: 'Item ID',
                name: 'id',
                type : 'number',
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
<<<<<<< Updated upstream
                name: 'moReserved',
=======
                name: 'moqReserved',
>>>>>>> Stashed changes
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