import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Row, Col, Typography, Skeleton, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';

import { columns } from './data';
import { listEngineeringInventory, clearData } from './redux';
import {reevalutateMessageStatus} from '../../../helpers/general-helper';


const { Title } = Typography;

const EngineeringInventories = (props) => {
  const [loading, setLoading] = useState(true);

  const { company } = props;
  const dispatch = useDispatch();
  const {list, status, statusMessage, statusLevel, action } = useSelector((state) => state.dashboard.engineeringInventories);
  const isMounted = useRef(true);

  useEffect(() => {
    reevalutateMessageStatus({status, action, statusMessage, statusLevel});
  }, [status, action, statusMessage, statusLevel]);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
  },[dispatch]);

  useEffect(() => {
    dispatch(listEngineeringInventory({ company, message })).then(() => {
      if (isMounted.current){
        setLoading(false);
      } else {
        performCleanup();
      }
    });

    return function cleanup() {
      isMounted.current = false
    };
  }, [dispatch, company, performCleanup]);

  const handleUpdate = () => {};

  const handleDelete = () => {};

  const handleRetrieve = () => {};

  return (
    <Switch>
      <Route>
        <Row>
          <Col span={20}>
            <Title level={3} style={{ float: 'left' }}>
              {props.title}
            </Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={20}>
            {loading ? (
              <Skeleton />
            ) : (
              <>
                <TableDisplay
                  columns={columns}
                  data={list}
                  handleRetrieve={handleRetrieve}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  updateEnabled={false}
                  deleteEnabled={false}
                />
              </>
            )}
          </Col>
        </Row>
      </Route>
    </Switch>
  );
};

export default EngineeringInventories;
