import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Tabs, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { columns } from './data';

import TableDisplay from '../../../components/TableDisplay';

import { listOrderSlips, clearData as clearOrderSlips } from '../OrderSlips/redux';
import { listSalesInvoice, clearData as clearSalesInvoice } from '../SalesInvoice/redux';

const { Title } = Typography;
const { TabPane } = Tabs;

const SalesJournalVouchers = (props) => {
  const dispatch = useDispatch();
  const { company, title } = props;

  const [loading, setLoading] = useState(true);

  const orderSlips = useSelector((state) => state.sales.orderSlips.orderSlipsList);
  const salesInvoices = useSelector((state) => state.sales.salesInvoice.salesInvoiceList);
  let salesSlips = [];
  salesSlips = salesSlips.concat(orderSlips).concat(salesInvoices);

  useEffect(() => {
    dispatch(listSalesInvoice(company)).then(() => {
      dispatch(listOrderSlips(company)).then(() => {
        setLoading(false);
      });
    });

    return function cleanup() {
      dispatch(clearOrderSlips());
      dispatch(clearSalesInvoice());
    };
  }, [dispatch, company]);

  const handleUpdate = (data) => {};

  const handleDelete = (data) => {};

  const handleRetrieve = (data) => {};

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={3} style={{ float: 'left' }}>
            {title}
          </Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={20}>
          {loading ? (
            <Skeleton />
          ) : (
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="In House" key="1">
                <TableDisplay
                  columns={columns.all}
                  data={salesSlips}
                  handleRetrieve={handleRetrieve}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  updateEnabled={false}
                  deleteEnabled={false}
                />
              </TabPane>
              <TabPane tab="For BIR" key="2">
                <TableDisplay
                  columns={columns.siOnly}
                  data={salesInvoices}
                  handleRetrieve={handleRetrieve}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  updateEnabled={false}
                  deleteEnabled={false}
                />
              </TabPane>
            </Tabs>
          )}
        </Col>
      </Row>
    </>
  );
};

export default SalesJournalVouchers;
