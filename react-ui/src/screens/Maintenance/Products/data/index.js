import { useSelector } from "react-redux";

export const tableHeaderFinishedGoods = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
];

export const tableHeader = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: 'Lot #',
    dataIndex: 'lotNumber',
    key: 'lotNumber',
    align: 'center',
    datatype: 'string',
  },
  {
    title: 'Finished Goods',
    dataIndex: 'finishedGood',
    key: 'finishedGood',
    align: 'center',
    datatype: 'object',
    render: (object) => `${object.name}`
  },
  {
    title: 'Quantity Per Box',
    dataIndex: 'quantityPerBox',
    key: 'quantityPerBox',
    align: 'center',
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    align: 'center',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    align: 'center',
    name: 'code',
    datatype: 'object',
  },
  {
    title: 'Division',
    dataIndex: 'division',
    key: 'division',
    align: 'center',
    name: 'code',
    datatype: 'object',
  },
];

const FormDetails = () => {
  const { list: listDepot } = useSelector((state) => state.maintenance.depots);
  const { list: listClassification } = useSelector((state) => state.maintenance.classification);
  const { list: listPC } = useSelector((state) => state.maintenance.productCategories);
  const { list: listPD } = useSelector((state) => state.maintenance.productDivisions);
  const {list: listFG } = useSelector((state) => state.maintenance.finishedGoods);
  const { unitList: listUnit } = useSelector((state) => state.maintenance.units)

  const formDetails = {
    form_name: 'products',
    form_items: [
      {
        label: 'Finished Good',
        name: 'finishedGood',
        rules: [{ required: true, message: 'Please select a product' }],
        placeholder: 'Product',
        type: 'selectSearch',
        choices: listFG,
        render: (object) => `[${object.code}] ${object.name}`
      },
      {
        label: 'Depot',
        name: 'depot',
        rules: [{ required: true, message: 'Please select a depot' }],
        placeholder: 'Depot',
        type: 'selectSearch',
        choices: listDepot,
        render: (object) => `[${object.code}] ${object.name}`
      },
      {
        label: 'Lot #',
        name: 'lotNumber',
        rules: [{ required: true, message: 'Please provide a proper product number' }],
        placeholder: 'Lot Number',
      },
      {
        label: 'Expiration (in years)',
        name: 'expiration',
        type: 'number',
        min: 0,
        rules: [{ required: true, message: 'Please enter a valid value for expiration (in years)' }],
        placeholder: 'Product expiration',
      },
      {
        label: 'Classification',
        name: 'classification',
        rules: [{ required: true, message: 'Please select a classification' }],
        placeholder: 'Classification',
        type: 'selectSearch',
        choices: listClassification,
        render: (object) => `[${object.code}] ${object.name}`
      },
      {
        label: 'Category',
        name: 'category',
        rules: [{ required: true, message: 'Please select a category' }],
        placeholder: 'Category',
        type: 'selectSearch',
        choices: listPC,
        render: (object) => `[${object.code}] ${object.title}`
      },
      {
        label: 'Division',
        name: 'division',
        rules: [{ required: true, message: 'Please select a division' }],
        placeholder: 'Division',
        type: 'selectSearch',
        choices: listPD,
        render: (object) => `[${object.code}] ${object.title}`
      },
      {
        label: 'Unit Price',
        name: 'unitPrice',
        rules: [{ required: true, message: 'Please provide a unit price' }],
        min: 1,
        max: 99999999999,
        placeholder: 'Product Unit Price',
        type: 'number',
      },
      {
        label: 'Small UOM',
        name: 'smallUnit',
        rules: [{ required: true, message: 'Please select unit product for small UOM' }],
        placeholder: 'Small UOM',
        type: 'selectSearch',
        choices: listUnit,
        render: (object) => `${object.code}`
      },
      {
        label: 'Big UOM',
        name: 'bigUnit',
        rules: [{ required: true, message: 'Please select unit product for big UOM' }],
        placeholder: 'Big UOM',
        type: 'selectSearch',
        choices: listUnit,
        render: (object) => `${object.code}`
      },
      {
        label: 'Quantity/Box',
        name: 'quantityPerBox',
        rules: [{ required: true, message: 'Please provide product quantity per box' }],
        min: 1,
        max: 50,
        placeholder: 'Product quantity per box',
        type: 'number',
      },
      {
        label: 'Reorder Level',
        name: 'reorderLevel',
        rules: [{ required: true, message: 'Please provide product reorder level' }],
        min: 1,
        max: 50,
        placeholder: 'Product reorder level',
        type: 'number',
      },
    ],
  };

  return { formDetails };
}

export default FormDetails;
