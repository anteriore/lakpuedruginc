/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import TableSearch from './TableSearch';

const TableDisplay = (props) => {
  const { columns: col, handleDelete, handleRetrieve, handleUpdate, data } = props;
  const [defaultpageSize, setDefaultPageSize] = useState(5);
  const [pageSize, setPageSize] = useState(defaultpageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataCount, setDataCount] = useState(0);
  const [columns, setColumns] = useState(TableSearch(col));

  /*
    columns must have an id
    
    Sample columns:
    {
        title: 'PRF Number',
        dataIndex: 'number',
        key: 'number',
        sorter: (a, b) => a.id - b.id //custom sorter
    },
    {
        title: 'PRF Date',
        dataIndex: 'date',
        key: 'date',
        datatype: "date" //adds the render, sorter and filter/search bar based on datatype 
    },

    */

  const onChangePageSize = (currPage, newPageSize) => {
    if (pageSize !== newPageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1);
    }
  };

  const columnfilter = () => {
    let filteredColumn = columns.slice();
    const editpart = [
      {
        title: 'Actions',
        render: (row) => {
          return (
            <div style={styles.crudColumn}>
              <Button
                icon={<EditOutlined />}
                type="text"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdate(row);
                }}
              >
                Edit
              </Button>
              <Popconfirm
                title="Would you like to delete this item?"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={(e) => {
                  e.stopPropagation();
                  handleDelete(row);
                }}
                onCancel={(e) => {
                  e.stopPropagation();
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  icon={<DeleteOutlined />}
                  type="text"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Delete
                </Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];

    filteredColumn = filteredColumn.concat(editpart);

    return filteredColumn;
  };

  return (
    <Table
      dataSource={data}
      columns={columnfilter()}
      pagination={{
        onChange: (page, size) => {
          setCurrentPage(page);
        },
        showTotal: (total) => `Total ${total} items`,
        onShowSizeChange: (current, size) => {
          onChangePageSize(current, size);
        },
        current: currentPage,
        showQuickJumper: true,
        defaultPageSize: defaultpageSize,
        pageSizeOptions: [defaultpageSize, '20', '50', '100'],
        showSizeChanger: true,
        total: dataCount,
      }}
      onRow={(record, rowIndex) => {
        return {
          onClick: () => {
            if(handleRetrieve !== null)
              handleRetrieve(record);
          }, // click row
        };
      }}
    />
  );
};

export default TableDisplay;

const styles = {
  crudColumn: {
    display: 'flex',
    flexDirection: 'row',
  },
};
