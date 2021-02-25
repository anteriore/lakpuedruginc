import { useSelector } from 'react-redux';

export const DisplayDetails = () => {
  const departments = useSelector((state) => state.maintenance.departmentArea.deptList);

  const columns = [
    {
      title: 'PRF Number',
      dataIndex: 'number',
      key: 'number',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'PRF Date',
      dataIndex: 'date',
      key: 'date',
      datatype: 'date',
    },
    {
      title: 'Date Needed',
      dataIndex: 'dateNeeded',
      key: 'dateNeeded',
      datatype: 'date',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      filters: departments,
      filterKey: 'name',
      datatype: 'object',
      dataToString: (department) => {
        return department.name;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      datatype: 'string',
    },
  ];

  const itemColumns = [
    {
      title: 'Type',
      dataIndex: 'item',
      key: 'item',
      render: (object) => object.type.name,
    },
    {
      title: 'Code',
      dataIndex: 'item',
      key: 'item',
      render: (object) => object.code,
    },
    {
      title: 'Name',
      dataIndex: 'item',
      key: 'item',
      render: (object) => object.name,
    },
    {
      title: 'Unit',
      dataIndex: 'item',
      key: 'item',
      render: (object) => object.unit.name,
    },
    {
      title: 'Quantity Requested',
      dataIndex: 'quantityRequested',
      key: 'quantityRequested',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return { columns, itemColumns };
};

export const FormDetails = () => {
  const items = useSelector((state) => state.maintenance.items.list);
  const departments = useSelector((state) => state.maintenance.departmentArea.deptList);

  const formDetails = {
    form_name: 'purchase_request',
    form_items: [
      {
        label: 'PRF Number',
        name: 'number',
        placeholder: 'AUTOGENERATED UPON CREATION',
        readOnly: true,
      },
      {
        label: 'PRF Date',
        name: 'date',
        type: 'date',
        rules: [{ required: true }],
      },
      {
        label: 'Date Needed',
        name: 'dateNeeded',
        type: 'date',
        rules: [{ required: true }],
      },
      {
        label: 'Department',
        name: 'department',
        type: 'selectSearch',
        selectName: 'name',
        choices: departments,
        render: (department) => `[${department.code}] ${department.name}`,
        rules: [{ required: true }],
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

  const tableDetails = {
    label: 'Requested Items',
    name: 'requestedItems',
    key: 'id',
    rules: [{ required: true }],
    fields: [
      {
        label: 'Item ID',
        name: 'itemID',
        type: 'hidden',
      },
      {
        label: 'Item Name',
        name: 'name',
      },
      {
        label: 'Code',
        name: 'code',
      },
      {
        label: 'Type',
        name: 'type',
        render: (object) => object.name,
      },
      {
        label: 'Unit of Measurement',
        name: 'unit',
        render: (object) => object.name,
      },
      {
        label: 'Current Stocks',
        name: 'stockQuantity',
        type: 'readOnly',
      },
      {
        label: 'Pending PR',
        name: 'prfQuantity',
      },
      {
        label: 'Pending PO',
        name: 'poQuantity',
      },
      {
        label: 'Quarantined',
        name: 'quarantineQuantity',
      },
      {
        label: 'Quantity Requested',
        name: 'quantityRequested',
        type: 'number',
        rules: [{ required: true }],
        min: 0,
      },
      {
        label: 'Lacking',
        name: 'quantityLacking',
        render: (object) => {
          return object.stockQuantity - object.quantityRequested < 0
            ? -(object.stockQuantity - object.quantityRequested)
            : 0;
        },
      },
      {
        label: 'Quantity Remaining',
        name: 'quantityRemaining',
        render: (object) => {
          return object.stockQuantity - object.quantityRequested > 0
            ? object.stockQuantity - object.quantityRequested
            : 0;
        },
      },
    ],
    foreignKey: 'itemID',
    selectedKey: 'id',
    selectData: items,
    selectFields: [
      {
        title: 'Item Name',
        dataIndex: 'item',
        key: 'item',
        render: (object) => object.name,
      },
      {
        title: 'Code',
        dataIndex: 'item',
        key: 'item',
        render: (object) => object.code,
      },
      {
        title: 'Type',
        dataIndex: 'item',
        key: 'item',
        render: (object) => object.type.name,
      },
      {
        title: 'Unit of Measurement',
        dataIndex: 'item',
        key: 'item',
        render: (object) => object.unit.name,
      },
      {
        title: 'Current Stocks',
        dataIndex: 'stockQuantity',
        key: 'stockQuantity',
      },
      {
        title: 'PRF Quantity',
        dataIndex: 'prfQuantity',
        key: 'prfQuantity',
      },
      {
        title: 'PO Quantity',
        dataIndex: 'poQuantity',
        key: 'poQuantity',
      },
      {
        title: 'Quarantined',
        dataIndex: 'quarantineQuantity',
        key: 'quarantineQuantity',
      },
    ],
    processData: (data) => {
      const processedData = {
        ...data,
        ...data.item,
        itemID: data.item.id,
      };
      delete processedData.item;
      delete processedData.id;
      return processedData;
    },
    checkSelected: (selectedData, rowData) => {
      if (
        typeof selectedData !== 'undefined' &&
        selectedData !== null &&
        selectedData.some((item) => item.itemID === rowData.item.id)
      ) {
        return true;
      }
    },
  };

  return { formDetails, tableDetails };
};
