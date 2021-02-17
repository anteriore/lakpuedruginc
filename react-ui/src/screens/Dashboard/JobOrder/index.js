import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Button, Row, Col, Typography, Skeleton, Modal, Descriptions } from 'antd';
import GeneralStyles from '../../../data/styles/styles.general';
import { PlusOutlined } from '@ant-design/icons';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader } from './data';
import { listJobOrders } from './redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { clearData } from '../../Sales/OrderSlips/redux';
import { useDispatch, useSelector } from 'react-redux';

const { Title } = Typography;

const JobOrder = (props) => {
  const {title, company} = props; 
  const {path} = useRouteMatch();
  const {history} = useHistory();
  const dispatch = useDispatch();
  const { jobOrderList, action, statusMessage, status, statusLevel } = useSelector(state => state.dashboard.jobOrders)
  
  const [contentLoading, setContentLoading] = useState(false)

  useEffect(() => {
    let isCancelled = false;
    dispatch(listJobOrders()).then(unwrapResult).then(() => {
      if(isCancelled){
        dispatch(clearData());
      }
    }).catch((rejectedValueOrSerializedError) => {
      console.log(rejectedValueOrSerializedError)
    });

    setContentLoading(false);
    return function cleanup() {
      dispatch(clearData());
      isCancelled = true;
    }

  },[dispatch])

  const handleDelete = () => {

  }

  const handleRetrieve = () => {

  }

  return (
    <Switch>
      <Route path={`${path}/new`}>
        
      </Route>
      <Route>
        <Row gutter={[8,24]}>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>
              {title}
            </Title>
            <Button icon={<PlusOutlined />}>
              Add
            </Button>
          </Col>
          <Col span={20}>
            { contentLoading ? (
              <Skeleton/>
            ) : (
              <TableDisplay
                columns={tableHeader}
                data={jobOrderList}
                handleDelete={handleDelete}
                updateEnabled={false}
                deleteEnabled={true}
                handleRetrieve={handleRetrieve}
              />
            )}
          </Col>
        </Row>
      </Route>
    </Switch>
  )
}

export default JobOrder;