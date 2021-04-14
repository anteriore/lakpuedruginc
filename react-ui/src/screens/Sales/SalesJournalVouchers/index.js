import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Row, Col, Typography, Tabs, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { columns } from './data';

import TableDisplay from '../../../components/TableDisplay';

import { listOrderSlips, clearData as clearOrderSlips } from '../OrderSlips/redux';
import { listSalesInvoice, clearData as clearSalesInvoice } from '../SalesInvoice/redux';
import { reevalutateMessageStatus } from '../../../helpers/general-helper';

const { Title } = Typography;
const { TabPane } = Tabs;

const SalesJournalVouchers = (props) => {
  const dispatch = useDispatch();
  const { company, title } = props;

  const [loading, setLoading] = useState(true);

  const {
    orderSlipsList, 
    status, 
    statusLevel, 
    statusMessage, 
    action 
  } = useSelector((state) => state.sales.orderSlips);
  
  const {
    salesInvoiceList
  } = useSelector((state) => state.sales.salesInvoice);
  
  let salesSlips = [];
  salesSlips = salesSlips.concat(orderSlipsList).concat(salesInvoiceList);
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearOrderSlips());
    dispatch(clearSalesInvoice());
  },[dispatch])

  useEffect(() => {
    reevalutateMessageStatus({status, action, statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    dispatch(listSalesInvoice(company))
    dispatch(listOrderSlips(company)).then(() => {
      if (isMounted.current){
        setLoading(false);
      }else{
        performCleanup();
      }
    })

    return function cleanup() {
      isMounted.current = false;
    };
  }, [dispatch, company, performCleanup]);

  const handleUpdate = () => {};

  const handleDelete = () => {};

  const handleRetrieve = () => {};

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
                  data={salesInvoiceList}
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
