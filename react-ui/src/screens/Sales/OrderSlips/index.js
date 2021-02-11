import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { Row, Typography, Col, Button, Skeleton, Modal, Descriptions } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader, formDetails } from './data';
import InputForm from './InputForm';
import { formatPayload } from './helpers';
import {
  listOrderSlips,
  createOrderSlips,
  clearData,
} from './redux';
import { clearData as clearDepot, tempListDepot } from '../../Maintenance/Depots/redux';
import { clearData as clearSO, listSalesOrder } from '../SalesOrders/redux';
import { tempListProductInventory } from '../../Maintenance/redux/productInventory';
import { unwrapResult } from '@reduxjs/toolkit';
import statusDialogue from '../../../components/StatusDialogue';

const { Title } = Typography;

const OrderSlips = (props) => {
  const { title, company, actions } = props;
  const history = useHistory();
  const { path } = useRouteMatch();
  const [contentLoading, setContentLoading] = useState(true);
  const { orderSlipsList, action, statusMessage, status, statusLevel } = useSelector((state) => state.sales.orderSlips);
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedOS, setSelectedOS] = useState(null);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user);

  const {
    action: actionPI,
    statusMessage: statusMessagePI,
    status: statusPI,
    statusLevel: statusLevelPI,
  } = useSelector((state) => state.maintenance.productInventory);

  const {
    action: actionDepot,
    statusMessage: statusMessageDepot,
    status: statusDepot,
    statusLevel: statusLevelDepot,
  } = useSelector((state) => state.maintenance.depots);

  const {
    action: actionSO,
    statusMessage: statusMessageSO,
    status: statusSO,
    statusLevel: statusLevelSO,
  } = useSelector((state) => state.sales.salesOrders);

  const pushErrorPage = useCallback(
    (statusCode) => {
      history.push({
        pathname: `/error/${statusCode === 400 || statusCode === 404 ? 403 : statusCode}`,
        state: {
          moduleList: '/sales',
        },
      });
    },
    [history]
  );

  useEffect(() => {
    if (status !== 'loading') {
      if (action === 'fetch' && statusLevel !== 'success') {
        statusDialogue({ statusMessage, statusLevel }, 'message');
      }

      if (action !== 'fetch') {
        statusDialogue({ statusMessage, statusLevel }, 'message');
      }
    }
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    if (statusSO !== 'loading') {
      if (actionSO === 'fetch' && statusLevelSO === 'warning') {
        statusDialogue(
          {
            statusLevel: statusLevelSO,
            modalContent: {
              title: `${_.capitalize(statusLevelSO)} - (Sales Order)`,
              content: statusMessageSO,
            },
          },
          'modal'
        );
      }
    }
  }, [actionSO, statusMessageSO, statusSO, statusLevelSO]);

  useEffect(() => {
    if (statusPI !== 'loading') {
      if (actionPI === 'fetch' && statusLevelPI === 'warning') {
        statusDialogue(
          {
            statusLevel: statusLevelPI,
            modalContent: {
              title: `${_.capitalize(statusLevelPI)} - (Product Inventory)`,
              content: statusMessagePI,
            },
          },
          'modal'
        );
      }
    }
  }, [actionPI, statusMessagePI, statusPI, statusLevelPI]);

  useEffect(() => {
    if (statusDepot !== 'loading') {
      if (actionDepot === 'fetch' && statusLevelDepot === 'warning') {
        statusDialogue(
          {
            statusLevel: statusLevelDepot,
            modalContent: {
              title: `${_.capitalize(statusLevelDepot)} - (Depot)`,
              content: statusMessageDepot,
            },
          },
          'modal'
        );
      }
    }
  }, [actionDepot, statusMessageDepot, statusDepot, statusLevelDepot]);

  useEffect(() => {
    setContentLoading(true);
    let isCancelled = false;
    dispatch(listOrderSlips(company)).then(unwrapResult).then(() => {
      if(isCancelled) {
        dispatch(clearData());
      }
      setContentLoading(false)
    }).catch((rejectValueOrSerializedError) => {
      console.log(rejectValueOrSerializedError)
    })

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearSO());
      isCancelled = true;
    };
  }, [dispatch, company, pushErrorPage]);

  const handleAddButton = () => {
    setContentLoading(true);
    dispatch(tempListDepot(company)).then((dataDepot) => {
      dispatch(tempListProductInventory()).then((dataPI) => {
        dispatch(listSalesOrder(company)).then((dataSO) => {
          const promiseList = [dataDepot, dataPI, dataSO];
          const promiseResult = _.some(promiseList, (o) => {
            return o.type.split(/[/?]/g)[1] === 'rejected';
          });

          if (!promiseResult) {
            const promiseValues = _.some(promiseList, (o) => {
              return o.payload.status !== 200 && o.payload.data.length === 0;
            });

            if (!promiseValues) {
              history.push(`${path}/new`);
            }
            setContentLoading(false);
          } else {
            const { payload } = _.find(promiseList, (o) => o.type.split(/[/?]/g)[1] === 'rejected');
            pushErrorPage(payload.status);
          }
        });
      });
    });
  };

  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setSelectedOS(data);
  };

  const onCreate = (value, salesOrder, orderedProducts) => {
    const payload = formatPayload(id, company, value, salesOrder, orderedProducts);

    dispatch(createOrderSlips(payload)).then(() => {
      dispatch(listOrderSlips(company));
    });
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm title="New Order Slip" onSubmit={onCreate} company={company} />
      </Route>
      <Route path={`${path}`}>
        <Row gutter={[8, 24]}>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>{title}</Title>
            {actions.includes("create") &&
            <Button loading={contentLoading} icon={<PlusOutlined />} onClick={() => handleAddButton()}>
              Add
            </Button>}
          </Col>
          <Col span={20}>
            {contentLoading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={tableHeader}
                data={orderSlipsList}
                updateEnabled={false}
                deleteEnabled={false}
                handleRetrieve={handleRetrieve}
              />
            )}
          </Col>
        </Row>
        <Modal
          title="Order Slips Details"
          visible={displayModal}
          onOk={() => {
            setDisplayModal(false);
            setSelectedOS(null);
          }}
          onCancel={() => {
            setDisplayModal(false);
            setSelectedOS(null);
          }}
          width={1000}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          {selectedOS === null ? (
            <Skeleton />
          ) : (
            <>
              <Descriptions
                bordered
                title={`Ordser Slip ${selectedOS.number}`}
                size="default"
                layout="vertical"
              >
                {formDetails.form_items.map((item) => {
                  if (!item.writeOnly && item.type !== 'readOnly') {
                    if (item.type === 'select' || item.type === 'selectSearch') {
                      const itemData = selectedOS[item.name];
                      return (
                        <Descriptions.Item key={item.name} label={item.label}>
                          {typeof itemData === 'object'
                            ? typeof itemData.code === 'undefined'
                              ? itemData.number
                              : itemData.code
                            : itemData}
                        </Descriptions.Item>
                      );
                    }

                    if (item.type === 'date') {
                      return (
                        <Descriptions.Item key={item.name} label={item.label}>
                          {moment(new Date(selectedOS[item.name])).format('DD/MM/YYYY')}
                        </Descriptions.Item>
                      );
                    }

                    return (
                      <Descriptions.Item key={item.name} label={item.label}>
                        {typeof selectedOS[item.name] === 'object' && selectedOS[item.name] !== null
                          ? selectedOS[item.name].code
                          : selectedOS[item.name]}
                      </Descriptions.Item>
                    );
                  }

                  return null;
                })}
              </Descriptions>
              <Title level={5} style={{ marginRight: 'auto', marginTop: '2%', marginBottom: '1%' }}>
                Ordered Product Items:
              </Title>
              {selectedOS.orderedProducts.map((item) => {
                return (
                  <Descriptions title={`[${item.product.finishedGood.name}]`} size="default">
                    <Descriptions.Item label="Depot">{item.depot.code}</Descriptions.Item>
                    <Descriptions.Item label="Order Slip No">{item.orderSlipNo}</Descriptions.Item>
                    <Descriptions.Item label="Sales Order Product ID">
                      {item.salesOrderProductId}
                    </Descriptions.Item>
                    <Descriptions.Item label="Amount">{item.amount}</Descriptions.Item>
                    <Descriptions.Item label="Unit Price">{item.unitPrice}</Descriptions.Item>
                  </Descriptions>
                );
              })}
            </>
          )}
        </Modal>
      </Route>
    </Switch>
  );
};

export default OrderSlips;
