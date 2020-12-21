import React, { useEffect, useState } from 'react';
import { Row, Typography, Col, Button, Skeleton, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import GeneralStyles from '../../../datas/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader } from './data';
import { listSalesOrder, createSalesOrder, updateSalesOrder, deleteSalesOrder } from './redux';
import { formatPayload } from './helpers';
import InputForm from './InputForm';

const { Title } = Typography;

const SalesOrders = (props) => {
  const { title, company } = props;
  const [contentLoading, setContentLoading] = useState(true);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { salesOrderList, action, statusMessage } = useSelector((state) => state.sales.salesOrders);
  const { id } = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(listSalesOrder(company)).then(() => {
      setContentLoading(false);
    });
  }, [dispatch, company]);

  useEffect(() => {
    if (action !== 'get' && action !== '') {
      if (action === 'pending') {
        message.info(statusMessage);
      } else if (action === 'error') {
        message.error(statusMessage);
      } else {
        message.success(statusMessage);
      }
    }
  }, [statusMessage, action]);

  const handleAddButton = () => {
    history.push(`${path}/new`);
  };

  const handleEditButton = (value) => {
    const { id } = value;
    setOrderId(value.id);
    history.push(`${path}/${id}/edit`);
  };

  const handleDeleteButton = (row) => {
    dispatch(deleteSalesOrder(row))
      .then(() => {
        dispatch(listSalesOrder(company));
      })
      .catch((err) => {
        message.error(`Something went wrong! details: ${err}`);
      });
  };

  const onCreate = (value) => {
    dispatch(createSalesOrder(formatPayload(id, company, value))).then(() => {
      dispatch(listSalesOrder(company));
    });
  };

  const onUpdate = (value) => {
    const order = formatPayload(id, company, value);
    order.id = orderId;
    dispatch(updateSalesOrder(order)).then(() => {
      dispatch(listSalesOrder(company));
    });
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm title="New Sales Order" onSubmit={onCreate} company={company} />
      </Route>
      <Route path={`${path}/:id/edit`}>
        <InputForm title="Edit Sales Order" onSubmit={onUpdate} company={company} />
      </Route>
      <Route path={`${path}`}>
        <Row gutter={[8, 24]}>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>{title}</Title>
            <Button icon={<PlusOutlined />} onClick={() => handleAddButton()}>
              Add
            </Button>
          </Col>
          <Col span={20}>
            {contentLoading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={tableHeader}
                data={salesOrderList}
                handleUpdate={handleEditButton}
                handleDelete={handleDeleteButton}
              />
            )}
          </Col>
        </Row>
      </Route>
    </Switch>
  );
};

export default SalesOrders;
