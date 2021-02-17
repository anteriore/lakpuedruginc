import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Skeleton, message} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';

import { columns } from './data';
import { listEngineeringInventory, clearData } from './redux';

const { Title } = Typography;

const EngineeringInventories = (props) => {
  const [loading, setLoading] = useState(true);

  const { company } = props;
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.dashboard.engineeringInventories.list);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listEngineeringInventory({ company, message })).then(() => {
      setLoading(false);

      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      isCancelled = true;
    };
  }, [dispatch, company]);


  const handleUpdate = (data) => {
  };

  const handleDelete = (data) => {
  };

  const handleRetrieve = (data) => {
  };

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
                  data={listData}
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
