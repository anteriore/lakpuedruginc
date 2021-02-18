import React from 'react';
import { Col, Row, Table, Empty } from 'antd';
import TableHeader from '../TableDisplay/TableHeader';
const Report = (props) => {
  const { data, columns, renderReportDetails } = props;

  return (
    <div>
      {renderReportDetails()}
      <Row>
        <Col span={24}>
          <Table
            dataSource={data}
            columns={TableHeader({columns: columns, hasSorter: false, hasFilter: false})}
            pagination={false}
            locale={{ emptyText: <Empty description="No Data." /> }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Report;
