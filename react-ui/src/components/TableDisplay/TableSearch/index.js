import React from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';

const TableSearch = (columnHeaders) => {
  const newColumnHeaders = [];

  const columnSearch = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      if(record[dataIndex] === null){
        return ''
      }
      else if (record[dataIndex].hasOwnProperty('name')) {
        return record[dataIndex].name
          ? record[dataIndex].name.toString().toLowerCase().includes(value.toLowerCase())
          : '';
      }
      if (record[dataIndex].hasOwnProperty('title')) {
        return record[dataIndex].title
          ? record[dataIndex].title.toString().toLowerCase().includes(value.toLowerCase())
          : '';
      }
      else if (record[dataIndex].hasOwnProperty('code')) {
        return record[dataIndex].code
          ? record[dataIndex].code.toString().toLowerCase().includes(value.toLowerCase())
          : '';
      }
      else {
        return record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '';
      }

      return record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '';
    },
  });
  // eslint-disable-next-line no-unused-vars
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  columnHeaders.forEach((header) => {
    // add sorter
    if (typeof header.sorter === 'undefined') {
      if (header.datatype === 'string') {
        header = {
          ...header,
          sorter: (a, b) => {
            a = a[header.key] || '';
            b = b[header.key] || '';
            return a.localeCompare(b)
          }
        };
      } else if (header.datatype === 'date') {
        header = {
          ...header,
          sorter: (a, b) => new Date(a[header.key]) - new Date(b[header.key]),
        };
      } else {
        header = {
          ...header,
          sorter: (a, b) => a[header.key] - b[header.key],
        };
      }
    }

    // add filter/search bar
    if (header.datatype === 'date') {
      // TODO: Date Filter/Search Bar

      if (typeof header.render === 'undefined') {
        header = {
          ...header,
          render: (text) => moment(new Date(text)).format('DD/MM/YYYY'),
        };
      }
    }
    else if(header.datatype === 'boolean'){
      if (typeof header.render === 'undefined') {
        header = {
          ...header,
          render: (data) => {
            if(data){
              return <CheckOutlined />
            }
            else {
              return <CloseOutlined />
            }
          },
        };
      }
    }
    else {
      header = {
        ...header,
        ...columnSearch(header.key),
      };
    }
    newColumnHeaders.push(header);
  });

  return newColumnHeaders;
};

export default TableSearch;
