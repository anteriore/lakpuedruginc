import React, { useEffect, useState } from 'react';
import { Row, Typography, Col, Button, Skeleton, message } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import GeneralStyles from '../../../datas/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { PlusOutlined } from '@ant-design/icons';
import { tableHeader } from './data';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderSlips } from './redux';
import InputForm from './InputForm';

const { Title } = Typography;

const OrderSlips = (props) => {
  const {title, company} = props;
  const history = useHistory();
  const { path } = useRouteMatch();
  const [contentLoading, setContentLoading] = useState(true);
  const { orderSlipsList } = useSelector((state) => state.sales.orderSlips);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrderSlips(company)).then(() => {
      setContentLoading(false)
    })
  },[dispatch, listOrderSlips,company])

  const handleAddButton = () => {
    history.push(`${path}/new`);
  }

  const handleEditButton = () => {

  }

  const handleDeleteButton = () => {

  }

  const onCreate = () => {

  }

  const onUpdate = () => {

  }

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm title="New Order Slip" onSubmit={onCreate} company={company} />
      </Route>
      <Route path={`${path}/:id/edit`}>
        <InputForm title="Edit Order Slip" onSubmit={onUpdate} company={company} />
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
              <Skeleton/>
            ) : (
              <TableDisplay
                columns={tableHeader}
                data={orderSlipsList}
                handleUpdate={handleEditButton}
                handleDelete={handleDeleteButton}
              />
            )}
          </Col>
        </Row>
      </Route>
    </Switch>
  )
}

export default OrderSlips;