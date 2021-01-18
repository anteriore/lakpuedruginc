import React, { useEffect, useState, useCallback } from 'react';
import { Row, Typography, Col, Button, Skeleton, message, Modal } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader } from './data';
import InputForm from './InputForm';
import { formatPayload } from './helpers';
import {
  listOrderSlips,
  createOrderSlips,
  updateOrderSlips,
  deleteOrderSlips,
  clearData,
} from './redux';
import {
  NO_DATA_FOUND,
  NO_DATA_FOUND_DESC,
} from '../../../data/constants/response-message.constant';
import { clearData as clearDepot, listDepot } from '../../Maintenance/Depots/redux';
import { clearData as clearSO, listSalesOrder } from '../SalesOrders/redux';
import { setConnectionEffect } from '../../../helpers/general-helper';
import { listProductInventory } from '../../Maintenance/redux/productInventory';

const { Title } = Typography;

const OrderSlips = (props) => {
  const { title, company } = props;
  const history = useHistory();
  const { path } = useRouteMatch();
  const [contentLoading, setContentLoading] = useState(true);
  const { orderSlipsList, action, statusMessage } = useSelector((state) => state.sales.orderSlips);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user);

  const pushErrorPage = useCallback(
    (status) => {
      history.push({
        pathname: `/error/${status === 400 ? 403 : status}`,
        state: {
          moduleList: '/sales',
        },
      });
    },
    [history]
  );

  const actionOSPayload = useCallback(
    (alertType) => {
      const payload = {
        company,
        fnCallback: (response) => {
          setConnectionEffect(
            response,
            () => {
              alertType === 'modal'
                ? Modal.warning({
                    title: NO_DATA_FOUND,
                    content: NO_DATA_FOUND_DESC(response.config.url.split(/[/?]/g)[1]),
                  })
                : message.warning(response.statusText);
            },
            () => pushErrorPage(response.status),
            null
          );
        },
      };

      return payload;
    },
    [company, pushErrorPage]
  );

  useEffect(() => {
    let isCancelled = false;
    dispatch(listOrderSlips(actionOSPayload('message'))).then(() => {
      setContentLoading(false);
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearSO());
      isCancelled = true;
    };
  }, [dispatch, company, history, pushErrorPage, actionOSPayload]);

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
    setContentLoading(true);

    dispatch(listDepot(actionOSPayload('modal'))).then((dataDepot) => {
      dispatch(listProductInventory(actionOSPayload('modal'))).then((dataPI) => {
        dispatch(listSalesOrder(actionOSPayload('modal'))).then((dataSO) => {
          const promiseList = [dataDepot, dataPI, dataSO];
          const promiseResult = _.some(promiseList, (o) => {
            return o.type.split(/[/?]/g)[1] === 'rejected' && typeof o.payload === 'undefined';
          });

          if (!promiseResult) {
            const promiseValues = _.some(promiseList, (o) => {
              return o.payload.status !== 200 && o.payload.data.length === 0;
            });
            if (!promiseValues) {
              history.push(`${path}/new`);
              setContentLoading(false);
            } else {
              setContentLoading(false);
            }
          } else {
            setContentLoading(false);
          }
        });
      });
    });
  };

  const handleEditButton = (value) => {
    const { id: rowId } = value;
    dispatch(listDepot(actionOSPayload('modal'))).then((dataDepot) => {
      dispatch(listProductInventory(actionOSPayload('modal'))).then((dataPI) => {
        dispatch(listSalesOrder(actionOSPayload('modal'))).then((dataSO) => {
          const promiseList = [dataDepot, dataPI, dataSO];
          const promiseResult = _.some(promiseList, (o) => {
            return o.type.split(/[/?]/g)[1] === 'rejected' && typeof o.payload === 'undefined';
          });

          if (!promiseResult) {
            const promiseValues = _.some(promiseList, (o) => {
              return o.payload.status !== 200 && o.payload.data.length === 0;
            });
            if (!promiseValues) {
              history.push(`${path}/${rowId}/edit`);
              setOrderId(id);
              setContentLoading(false);
            } else {
              setContentLoading(false);
            }
          } else {
            setContentLoading(false);
          }
        });
      });
    });
  };

  const handleDeleteButton = (row) => {
    dispatch(deleteOrderSlips(row))
      .then(() => {
        dispatch(listOrderSlips(actionOSPayload('message')));
      })
      .catch((err) => {
        message.error(`Something went wrong! details: ${err}`);
      });
  };

  const onCreate = (value, salesOrder, orderedProducts) => {
    const payload = formatPayload(id, company, value, salesOrder, orderedProducts);

    dispatch(createOrderSlips(payload)).then(() => {
      dispatch(listOrderSlips(actionOSPayload('message')));
    });
  };

  const onUpdate = (value, salesOrder, orderedProducts) => {
    const order = formatPayload(id, company, value, salesOrder, orderedProducts);
    order.id = orderId;

    dispatch(updateOrderSlips(order)).then(() => {
      dispatch(listOrderSlips(actionOSPayload('message')));
    });
  };

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
              <Skeleton />
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
  );
};

export default OrderSlips;
