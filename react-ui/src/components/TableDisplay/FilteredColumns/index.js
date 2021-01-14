import React from 'react';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const FilteredColumns = (rawColumns, onEdit, onDelete) => {
  let filteredColumn = rawColumns.slice();
  const actionColumn = [
    {
      title: 'Actions',
      render: (row) => {
        return (
          <div>
            <Button
              icon={<EditOutlined />}
              type="text"
              onClick={() => {
                onEdit(row);
              }}
            >
              Edit
            </Button>
            <Button
              icon={<DeleteOutlined />}
              type="text"
              onClick={() => {
                onDelete(row);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
      align: 'center',
    },
  ];

  filteredColumn = filteredColumn.concat(actionColumn);

  return filteredColumn;
};

export default FilteredColumns;
