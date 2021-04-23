import React, { useCallback, useEffect } from 'react';
import { Col, Row, Table, Empty } from 'antd';
import { useHistory, useRouteMatch } from 'react-router-dom';
import TableHeader from '../TableDisplay/TableHeader';

const Report = (props) => {
  const { data, columns, renderReportDetails } = props;
  const history = useHistory();
  const { path } = useRouteMatch();

  const onFail = useCallback(() => {
    history.push(`${path.replace(new RegExp('/report'), '')}`);
    return null;
  }, [history, path]);

  useEffect(() => {
    if (data === null || typeof data === 'undefined' || data?.length === 0) {
      onFail();
    }
  }, [data, onFail]);

  return (
    <div>
      {renderReportDetails()}
      {typeof columns !== 'undefined' ? (
        <Row>
          <Col span={24}>
            <Table
              dataSource={data}
              columns={TableHeader({ columns, hasSorter: false, hasFilter: false })}
              pagination={{ simple: true }}
              locale={{ emptyText: <Empty description="No Data." /> }}
            />
          </Col>
        </Row>
      ) : (
        onFail()
      )}
    </div>
  );
};

export default Report;
