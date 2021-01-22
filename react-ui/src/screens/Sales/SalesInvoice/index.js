import React, { useCallback, useEffect, useState } from 'react';
import { Button, Row, Col, Typography, Skeleton } from 'antd';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import GeneralStyles from '../../../data/styles/styles.general';
import { PlusOutlined } from '@ant-design/icons';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader } from './data';
import { useDispatch, useSelector } from 'react-redux';
import { listSalesInvoice, clearData } from './redux';
import { clearData as clearDepot, listDepot } from '../../Maintenance/Depots/redux';
import { clearData as clearSO, listSalesOrder } from '../SalesOrders/redux';
import { unwrapResult } from '@reduxjs/toolkit';
import InputForm from './InputForm';
import statusDialogue from '../../../components/StatusDialogue';

const {Title} = Typography;

const SalesInvoice = (props) => {
  const {title, company} = props;
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const [contentLoading, setContentLoading] = useState(true);
  const { salesInvoiceList, action, statusMessage, responseCode, status, statusLevel } = useSelector((state) => state.sales.salesInvoice)

  const pushErrorPage = useCallback((status) => {
    history.push({
      pathname: `/error/${status === 400 ? 403 : status}`,
      state: {
        moduleList: '/sales',
      },
    });
  }, [history]);

  useEffect(() => {
    if (status !== 'loading'){
      if (action === 'fetch' && statusLevel === 'warning'){
        statusDialogue({statusMessage, statusLevel}, 'message')
      }
  
      if(action !== 'fetch'){
        statusDialogue({statusMessage, statusLevel}, 'message')
      }
    }
  },[status, action, statusMessage, statusLevel])

  useEffect(() => {
    let isCancelled = false;
    dispatch(listSalesInvoice(company))
    .then(unwrapResult)
    .then(() => {
      if(isCancelled){
        dispatch(clearData());
      }
    }).catch(rejectedValueOrSerializedError => {
      console.log(rejectedValueOrSerializedError)
    })

    return function cleanup(){
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearSO());

      isCancelled = true;
    }

  },[dispatch, company, history, pushErrorPage]);

  const handleAddButton = () => {

    history.push(`${path}/new`)
  }

  const handleRetrieve = (data) => {
    console.log(data)
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
        <Row gutter={[8,24]}>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>
              {title}
            </Title>
            <Button icon={<PlusOutlined/>} onClick={() => handleAddButton()}>
              Add
            </Button>
          </Col>
          <Col span={20}>
            { status === 'loading' ? (<Skeleton/>) : (
              <TableDisplay
                columns={tableHeader}
                data={salesInvoiceList}
                updateEnabled={false}
                deleteEnabled={false}
                handleRetrieve={handleRetrieve}
              />
            ) }
          </Col>
        </Row>
      </Route>
    </Switch>
  )
}

export default SalesInvoice;