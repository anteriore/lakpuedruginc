import React from 'react';
import { Col, Row, Table, Empty } from 'antd';
import { useHistory, useRouteMatch } from 'react-router-dom';
import TableHeader from '../TableDisplay/TableHeader';
const Report = (props) => {
  const { data, columns, renderReportDetails } = props;
  const history = useHistory();
  const { path } = useRouteMatch();

  const onFail = () => {
    history.push(`${path.replace(new RegExp('/report'), '')}`);
    return null
  }

  

  return (
    <div>
      {renderReportDetails()}
      {typeof columns !== 'undefined' ? (
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
      ):(
        onFail()
      )}
    </div>
  );
};

export default Report;
