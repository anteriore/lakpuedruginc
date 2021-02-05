import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, message, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import TableDisplay from '../../../components/TableDisplay';
import { columns } from './data';
import { listProductInventory, clearData } from './redux';

const { Title } = Typography;

const ProductInventories = (props) => {
  const [loading, setLoading] = useState(true);

  const { company } = props;
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.dashboard.productInventories.list);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listProductInventory({ company, message })).then(() => {
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
    <>
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
            <TableDisplay
              columns={columns}
              data={listData}
              handleRetrieve={handleRetrieve}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              updateEnabled={false}
              deleteEnabled={false}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProductInventories;
