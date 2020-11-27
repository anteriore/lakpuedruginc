import React, {useEffect, useState} from 'react';
import { Row, Typography, Col, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import GeneralStyles from '../../../datas/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import {tableHeader} from './data';
import { useDispatch, useSelector } from 'react-redux';
import { listSalesOrder } from './redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import InputForm from './InputForm';

const {Title} = Typography;

const SalesOrders = (props) => {
  const { title, company} = props;
  const [contentLoading, setContentLoading] = useState(true)
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { salesOrderList } = useSelector((state) => state.sales.salesOrders)

  useEffect(() => {
    dispatch(listSalesOrder(company)).then(() => {
      setContentLoading(false)
    })
  },[dispatch, company])

  const handleAddButton = () => {
    history.push(`${path}/new`);
  }

  const handleEditButton = () => {

  }

  const handleDeleteButton = ()=> {

  } 

  return(
    <Switch>
       <Route path={`${path}/new`}>
        <InputForm title="New Sales Order" company={company} />
      </Route>
      <Route path={`${path}/:id`}>
        <InputForm title="Edit Sales Order" company={company} />
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
                data={salesOrderList}
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

export default SalesOrders;