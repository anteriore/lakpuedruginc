import React, {useState} from 'react';
import {
  Input,
  Button,
  Search,
  Space
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

const TableSearch = (columnHeaders) => {
  let newColumnHeaders = [];
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('');

  const columnSearch = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  })

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();

    setSearchText(selectedKeys[0]);
    setSearchColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('')
  };

  columnHeaders.forEach(header => {
    //add sorter
    if(typeof(header.sorter) === "undefined"){
      if(header.datatype === 'string'){
        header = {
          ...header,
          sorter: (a, b) => a[header.key].localeCompare(b[header.key])
        }
      }
      else if(header.datatype === 'date'){
        header = {
          ...header,
          sorter: (a, b) => new Date(a[header.key]) - new Date(b[header.key])
        }
      }
      else {
        header = {
          ...header,
          sorter: (a, b) => a[header.key] - b[header.key]
        }
      }
      
    }
    

    //add filter/search bar
    if(header.datatype === 'date'){
      //TODO: Date Filter/Search Bar
      
      if(typeof(header.render) === "undefined"){
        header = {
          ...header,
          render: (text) => moment(new Date(text)).format("DD/MM/YYYY"), 
        }
      }
      
    }
    else {
      header = {
        ...header, 
        ...columnSearch(header.key)
      }
    }
    newColumnHeaders.push(header)
  });

  return newColumnHeaders;
}

export default TableSearch;