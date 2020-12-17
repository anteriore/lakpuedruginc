import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Typography } from 'antd';

const { Text } = Typography;

export const columns = [
  {
    title: 'Code',
    dataIndex: 'finishedGood',
    key: 'finishedGood',
    datatype: 'string',
    render: (object) => object.code,
    sorter: (a, b) => a.finishedGood.code.localeCompare(b.finishedGood.code),
  },
  {
    title: 'Name',
    dataIndex: 'finishedGood',
    key: 'finishedGood',
    datatype: 'string',
    render: (object) => object.name,
    sorter: (a, b) => a.finishedGood.name.localeCompare(b.finishedGood.name),
  },
  {
    title: 'Active Ingredient Group',
    dataIndex: 'activeIngredientGroup',
    key: 'activeIngredientGroup',
    datatype: 'string',
    render: (object) => object.name,
    sorter: (a, b) => a.activeIngredientGroup.name.localeCompare(b.activeIngredientGroup.name),
  },
];

const FormDetails = () => {
  const finishedGoods = useSelector((state) => state.maintenance.finishedGoods.list)
  const items = useSelector((state) => state.maintenance.items.list)

  const formDetails = {
    form_name: 'depot',
    form_items: [
      {
        label: 'Finished Good',
        name: 'finishedGood',
        type: 'select',
        selectName: "name",
        choices: finishedGoods,
        render: finishedGood => `[${finishedGood.code}] ${finishedGood.name}`,
        rules: [{ required: true }],
      },
      {
        label: 'Date',
        name: 'date',
        type: 'date',
        rules: [{ required: true }]
      },
      {
        label: 'Ingredient Group Name',
        name: 'activeIngredientGroup',
        rules: [{ message: 'Please provide a valid name for the recipe\'s ingredient group' }],
        placeholder: 'Ingredient Group Name',
      },
      {
        label: 'Ingredients',
        name: 'ingredients',
        type: 'list',
        selectName: 'id',
        rules: [{ required: true }],
        fields: [
          {
            name: 'id',
            type: 'hidden',
          },
          {
            label: 'Item',
            name: 'item',
            type: 'select',
            selectName: "name",
            choices: items,
            render: item => `[${item.code}] ${item.name}`,
            rules: [{ required: true, message: 'Item is required' }],
            placeholder: 'Item',
          },
          {
            label: 'Quantity',
            name: 'quantity',
            rules: [{ required: true, pattern: new RegExp("^[0-9]*\.?[0-9]*$"), message: 'Please enter a valid quantity' }],
            placeholder: 'Quantity',

          },
          {
            label: 'Remarks',
            name: 'remarks',
            type: 'string',
            rules: [{ message: 'Please provide a valid remark' }],
            placeholder: 'Remarks',
          },
        ]
      },
      {
        label: 'Remarks',
        name: 'remarks',
        type: 'textArea',
        rules: [{ message: 'Please provide a valid remark' }],
        placeholder: 'Remarks',
      },
    ],
  };

  return {formDetails}

}

export default FormDetails