import React from 'react';
import { Input, Button, Space, DatePicker } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined, FilterOutlined } from '@ant-design/icons';
import moment from 'moment';

const TableHeader = (columnHeaders) => {
  const newColumnHeaders = [];
  const { hasOwnProperty } = Object.prototype;
  const dateFormat = 'YYYY/MM/DD';

  const filterSearch = (dataIndex, dataValue, dataToString) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : '#545454' }} />
    ),
    onFilter: (value, record) => {
      if (record[dataIndex] === null) {
        return '';
      }
      else if(typeof dataToString === 'function'){
        return record[dataIndex]
        ? dataToString(record[dataIndex]).toLowerCase().includes(value.toLowerCase())
        : '';
      }
      else if (hasOwnProperty.call(record[dataIndex], 'code') && dataValue === 'code') {
        return record[dataIndex].code
          ? record[dataIndex].code.toString().toLowerCase().includes(value.toLowerCase())
          : '';
      }
      else if (hasOwnProperty.call(record[dataIndex], 'name') && dataValue === 'name') {
        return record[dataIndex].name
          ? record[dataIndex].name.toString().toLowerCase().includes(value.toLowerCase())
          : '';
      }
      else if (hasOwnProperty.call(record[dataIndex], 'title') && dataValue === 'title') {
        return record[dataIndex].title
          ? record[dataIndex].title.toString().toLowerCase().includes(value.toLowerCase())
          : '';
      }
      else {
        return record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '';
      }

      
    },
  });

  const filterDate = (dataIndex, dataValue) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <DatePicker.RangePicker
          onChange={(e) => {
            setSelectedKeys([e] || []);
          }}
          format={dateFormat}
          style={{ marginBottom: 8 }}
        />
        <br />
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<FilterOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Filter
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <FilterOutlined style={{ color: filtered ? '#1890ff' : '#545454' }} />
    ),
    onFilter: (value, record) => {
      return (
        moment(new Date(record[dataIndex])).isBetween(value[0], value[1], 'day') ||
        moment(new Date(record[dataIndex])).isSame(value[0], 'day') ||
        moment(new Date(record[dataIndex])).isSame(value[1], 'day')
      );
    },
  });

  const setColumnHeaders = () => {
    columnHeaders.forEach((header) => {
      // add sorter
      if (typeof header.sorter === 'undefined') {
        if (header.datatype === 'string') {
          header = {
            ...header,
            sorter: (a, b) => {
              a = a[header.key] || '';
              b = b[header.key] || '';
              return a.localeCompare(b);
            },
          };
        } else if (header.datatype === 'object') {
          if (typeof header.name === 'undefined' || header.name === null) {
            header.name = 'name';
          }
          
          if(typeof header.toString !== 'function'){
            return header.dataToString = (object) => object[header.name]
          }

          header = {
            ...header,
            sorter: (a, b) => {
              if (typeof a[header.key] !== 'undefined' && a[header.key] !== null) {
                a = a[header.key];
                a = header.dataToString(a);
              } else {
                a = '';
              }

              if (typeof b[header.key] !== 'undefined' && b[header.key] !== null) {
                b = b[header.key];
                b = header.dataToString(b);
              } else {
                b = '';
              }
              return a.localeCompare(b);
            },
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
      if (typeof header.render === 'undefined') {
        if (header.datatype === 'date') {
          header = {
            ...header,
            render: (text) => moment(new Date(text)).format('DD/MM/YYYY'),
          };
        } else if (header.datatype === 'boolean') {
          header = {
            ...header,
            render: (data) => {
              if (data) {
                return <CheckOutlined />;
              }

              return <CloseOutlined />;
            },
          };
        } else if (header.datatype === 'object') {
          header = {
            ...header,
            render: (object) => {
              if (typeof object !== 'undefined' && object !== null) {
                if(typeof header.dataToString !== 'function'){
                  return object[header.name];
                }
                else {
                  return header.dataToString(object)
                }
              }

              return null;
            },
          };
        }
      }

      if (typeof header.filters !== 'undefined' && header.filters !== null) {
        const filters = [];
        header.filters.forEach((filter) => {
          filters.push({
            text: filter[header.filterKey],
            value: filter[header.filterKey],
          });
        });
        header = {
          ...header,
          filters,
          onFilter: (value, record) => record[header.key].includes(value),
        };
      } else if (header.datatype === 'boolean') {
        header = {
          ...header,
          filters: [
            { text: <CheckOutlined />, value: true },
            { text: <CloseOutlined />, value: false },
          ],
          onFilter: (value, record) => record[header.key] === value,
        };
      } else if (header.datatype === 'date') {
        header = {
          ...header,
          defaultSortOrder: header.defaultSortOrder || 'ascend',
          ...filterDate(header.key, header.name),
        };
      } else if (header.datatype !== 'boolean' && header.datatype !== 'date') {
        header = {
          ...header,
          defaultSortOrder: header.defaultSortOrder || 'ascend',
          ...filterSearch(header.key, header.name, header.dataToString),
        };
      }
      newColumnHeaders.push(header);
    });

    return newColumnHeaders;
  };

  return setColumnHeaders();
};

export default TableHeader;
