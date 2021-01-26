import React, { useCallback, useEffect, useState } from 'react';
import { Button, Row, Col, Typography, Skeleton, Modal, Descriptions } from 'antd';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import _ from 'lodash';
import moment from 'moment';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader, formDetails } from './data';
import { listSalesInvoice, clearData, createSalesInvoice } from './redux';
import { clearData as clearDepot, tempListDepot } from '../../Maintenance/Depots/redux';
import { clearData as clearSO, tempListSalesOrder } from '../SalesOrders/redux';
import InputForm from './InputForm';
import statusDialogue from '../../../components/StatusDialogue';
import { tempListProductInventory } from '../../Maintenance/redux/productInventory';
import { formatPayload } from './helpers';

const { Title } = Typography;

const SalesInvoice = (props) => {
  const { title, company } = props;
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const { salesInvoiceList, action, statusMessage, status, statusLevel } = useSelector(
    (state) => state.sales.salesInvoice
  );
  const { id } = useSelector((state) => state.auth.user);

  const [displayModal, setDisplayModal] = useState(false);
  const [selectedSI, setSelectedSI] = useState(null);

  const {
    action: actionDepot,
    statusMessage: statusMessageDepot,
    status: statusDepot,
    statusLevel: statusLevelDepot,
  } = useSelector((state) => state.maintenance.depots);

  const {
    action: actionPI,
    statusMessage: statusMessagePI,
    status: statusPI,
    statusLevel: statusLevelPI,
  } = useSelector((state) => state.maintenance.productInventory);

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
    let isCancelled = false;
    dispatch(listSalesInvoice(company))
      .then(unwrapResult)
      .then(() => {
        if (isCancelled) {
          dispatch(clearData());
        }
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearSO());

      isCancelled = true;
    };
  }, [dispatch, company, history, pushErrorPage]);

  const handleAddButton = () => {
    dispatch(tempListDepot(company)).then((dataDepot) => {
      dispatch(tempListProductInventory()).then((dataPI) => {
        dispatch(tempListSalesOrder(company)).then((dataSO) => {
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
          } else {
            const { payload } = _.find(promiseList, (o) => o.type.split(/[/?]/g)[1] === 'rejected');
            pushErrorPage(payload.status);
          }
        });
      });
    });
  };

  const handleRetrieve = (data) => {
    setSelectedSI(data);
    setDisplayModal(true);
  };

  const onCreate = (value, salesOrder, salesInvoiceProducts) => {
    const payload = formatPayload({
      id,
      company,
      value,
      salesOrder,
      salesInvoiceProducts,
    });

    dispatch(createSalesInvoice(payload)).then(() => {
      dispatch(listSalesInvoice(company));
    });
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm title="New Sales Invoice" onSubmit={onCreate} company={company} />
      </Route>
      {/* <Route path={`${path}/:id/edit`}>
        <InputForm title="Edit Order Slip" onSubmit={onUpdate} company={company} />
      </Route> */}
      <Route path={`${path}`}>
        <Row gutter={[8, 24]}>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>{title}</Title>
            <Button icon={<PlusOutlined />} onClick={() => handleAddButton()}>
              Add
            </Button>
          </Col>
          <Col span={20}>
            {status === 'loading' ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={tableHeader}
                data={salesInvoiceList}
                updateEnabled={false}
                deleteEnabled={false}
                handleRetrieve={handleRetrieve}
              />
            )}
          </Col>
        </Row>
        <Modal
          title="Sales Invoice Details"
          visible={displayModal}
          onOk={() => {
            setDisplayModal(false);
            setSelectedSI(null);
          }}
          onCancel={() => {
            setDisplayModal(false);
            setSelectedSI(null);
          }}
          width={1000}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          {selectedSI === null ? (
            <Skeleton />
          ) : (
            <>
              <Descriptions
                bordered
                title={`Sales Invoice ${selectedSI.number}`}
                size="default"
                layout="vertical"
              >
                {formDetails.form_items.map((item) => {
                  if (!item.writeOnly && item.type !== 'readOnly') {
                    if (item.type === 'select' || item.type === 'selectSearch') {
                      const itemData = selectedSI[item.name];
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
                          {moment(new Date(selectedSI[item.name])).format('DD/MM/YYYY')}
                        </Descriptions.Item>
                      );
                    }

                    return (
                      <Descriptions.Item key={item.name} label={item.label}>
                        {typeof selectedSI[item.name] === 'object' && selectedSI[item.name] !== null
                          ? selectedSI[item.name].code
                          : selectedSI[item.name]}
                      </Descriptions.Item>
                    );
                  }

                  return null;
                })}
              </Descriptions>
              <Title level={5} style={{ marginRight: 'auto', marginTop: '2%', marginBottom: '1%' }}>
                Sales Invoice Product Items:
              </Title>
              {selectedSI.orderedProducts.map((item) => {
                return (
                  <Descriptions title={`[${item.product.finishedGood.name}]`} size="default">
                    <Descriptions.Item label="Depot">{item.depot.code}</Descriptions.Item>
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

export default SalesInvoice;
