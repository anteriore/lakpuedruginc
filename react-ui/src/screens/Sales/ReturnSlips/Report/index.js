import React from 'react';
import { Col, Row, Typography, Table, Empty } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import moment from 'moment';

const { Title } = Typography;

const Report = (props) => {
    const { title, company, data, columns, dateRange } = props
    const companies = useSelector((state) => state.company.companyList);
    console.log("props: ", props)

    const renderTableColumns = (inputColumns) => {
        const tableColumns = []
        console.log(inputColumns)
        inputColumns.forEach((header) => {
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
                      return object[header.name];
                    }
        
                    return null;
                  },
                };
              }
            }
        
            if (header.datatype !== 'boolean' && header.datatype !== 'date') {
              header = {
                ...header,
                defaultSortOrder: header.defaultSortOrder || 'ascend',
              };
            }
            tableColumns.push(header);
          });

        return tableColumns;
    }

    return (
        <div>
            <Row>
                <Col span={12} style={{display: 'flex'}}><Title level={5}>{`Report: ${title}`}</Title></Col>
                <Col span={12} style={{display: 'flex'}}><Title level={5}>{`Dates: ${dateRange || 'all'}`}</Title></Col>
            </Row>
            <Row>
                <Col span={12} style={{display: 'flex'}}><Title level={5}>{`Company: ${companies.find(companyData => companyData.id === company).name}`}</Title></Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table
                        dataSource={data}
                        columns={renderTableColumns(columns)}
                        pagination={false}
                        locale={{ emptyText: <Empty description="No Data." /> }}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Report;
