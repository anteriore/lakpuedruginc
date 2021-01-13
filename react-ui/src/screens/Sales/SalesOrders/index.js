import React, { useEffect, useState } from 'react';
import { Row, Typography, Col, Button, Skeleton, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader } from './data';
import { formatPayload } from './helpers';
import InputForm from './InputForm';

import {
  listSalesOrder,
  createSalesOrder,
  updateSalesOrder,
  deleteSalesOrder,
  clearData,
} from './redux';
import { clearData as clearDepot } from '../../Maintenance/Depots/redux';
import { clearData as clearClient } from '../../Maintenance/Clients/redux';
import { clearData as clearPI } from '../../Maintenance/redux/productInventory';
import { listDepot } from '../../Maintenance/Depots/redux';
import { listClient } from '../../Maintenance/Clients/redux';
import {listProductInventory} from '../../Maintenance/redux/productInventory';
import { NO_DATA_FOUND, NO_DATA_FOUND_DESC } from '../../../data/constants/response-message.constant';

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

  // useEffect(() => {
  //   let isCancelled = false;
  //   dispatch(listSalesOrder({ company, message })).then(() => {
  //     setContentLoading(false);
  //     if (isCancelled) {
  //       dispatch(clearData());
  //     }
  //   });

  //   return function cleanup() {
  //     dispatch(clearData());
  //     dispatch(clearDepot());
  //     dispatch(clearClient());
  //     dispatch(clearPI());
  //     isCancelled = true;
  //   };
  // }, [dispatch, company])

  useEffect(() => {
    let isCancelled = false;
    const salesOrderPayload = {
      company,
      fnCallback: (response) => {
        const {status} = response;
        switch(status){
          case 200:
            if(response.data.length === 0){
              message.warning(response.statusText);
            }
            break;
          case 400:
          case 500: 
            history.push({
              pathname: `/error/${status === 400 ? 403 : status}`,
              state: {
                moduleList: '/sales'
              }
            });
            break;
          default:
            break;
        }
      }
    }

    dispatch(listSalesOrder(salesOrderPayload)).then(() => {
      setContentLoading(false);
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearClient());
      dispatch(clearPI());
      isCancelled = true;
    };
  },[dispatch, company, history])

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
    setContentLoading(true)
    const payload = {
      company,
      fnCallback: (response) => {
        const {status} = response;
        switch(status){
          case 200:
            if(response.data.length === 0){
              Modal.warning({
                title: NO_DATA_FOUND,
                content: NO_DATA_FOUND_DESC(response.config.url.split(/[/?]/g)[1])
              })
            }
            break;
          case 400:
          case 500:
            history.push({
              pathname: `/error/${status === 400 ? 403 : status}`,
              state: {
                moduleList: '/sales/sales-orders'
              }
            });
            break;
          default:
            break;
        }
      }
    } 

    dispatch(listDepot(payload)).then((data) => {
      if(typeof data.payload !== 'undefined'){
        if(data.payload.status === 200 && data.payload.data.length !== 0){
          dispatch(listClient(payload)).then((data) => {
            if(data.payload.status === 200 && data.payload.data.length !== 0){
              dispatch(listProductInventory(payload)).then((data) => {
                if(data.payload.status === 200 && data.payload.data.length !== 0){
                  history.push(`${path}/new`);
                  setContentLoading(false);
                } else if(data.payload.status === 200 && data.payload.data.length === 0) {
                  setContentLoading(false);
                }
              })
            } else if(data.payload.status === 200 && data.payload.data.length === 0) {
              setContentLoading(false);
            }
          })
        } else if(data.payload.status === 200 && data.payload.data.length === 0) {
          setContentLoading(false);
        }
      }
    })
  };

  const handleEditButton = (value) => {
    const { id: rowId } = value;
    setOrderId(value.id);
    history.push(`${path}/${rowId}/edit`);
  };

  const handleDeleteButton = (row) => {
    dispatch(deleteSalesOrder(row))
      .then(() => {
        dispatch(listSalesOrder({ company, message }));
      })
      .catch((err) => {
        message.error(`Something went wrong! details: ${err}`);
      });
  };

  const handleRetrieve = (data) => {
    console.log(data);
    
  }

  const onCreate = (value) => {
    const salesOrderPayload = {
      company,
      fnCallback: (response) => {
        const {status} = response;
        switch(status){
          case 200:
            if(response.data.length === 0){
              message.warning(response.statusText);
              setContentLoading(false);
            }else{
              setContentLoading(false);
            }
            break;
          case 400:
          case 500: 
            history.push({
              pathname: `/error/${status === 400 ? 403 : status}`,
              state: {
                moduleList: '/sales'
              }
            });
            break;
          default:
            break;
        }
      }
    }

    dispatch(createSalesOrder(formatPayload(id, company, value))).then(() => {
      dispatch(listSalesOrder(salesOrderPayload));
    });
  };

  const onUpdate = (value) => {
    const salesOrderPayload = {
      company,
      fnCallback: (response) => {
        const {status} = response;
        switch(status){
          case 200:
            if(response.data.length === 0){
              message.warning(response.statusText);
              setContentLoading(false);
            }else{
              setContentLoading(false);
            }
            break;
          case 400:
          case 500: 
            history.push({
              pathname: `/error/${status === 400 ? 403 : status}`,
              state: {
                moduleList: '/sales'
              }
            });
            break;
          default:
            break;
        }
      }
    }

    const order = formatPayload(id, company, value);
    order.id = orderId;
    dispatch(updateSalesOrder(order)).then(() => {
      dispatch(listSalesOrder(salesOrderPayload));
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
                handleRetrieve={handleRetrieve}
              />
            )}
          </Col>
        </Row>
      </Route>
    </Switch>
  );
};

export default SalesOrders;
