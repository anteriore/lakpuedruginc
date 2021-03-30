import React, { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';
import { Row, Typography, Col, Button, Skeleton, Modal, Space, Empty, Table } from 'antd';
import { PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import statusDialogue from '../../../components/StatusDialogue';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import FormDetails ,{ tableHeader } from './data';
import { formatDescItems, formatPayload } from './helpers';
import InputForm from './InputForm';
import {
  listSalesOrder,
  createSalesOrder,
  clearData,
  approveSalesOrder,
  rejectSalesOrder,
} from './redux';
import { clearData as clearPI } from '../../Dashboard/ProductInventories/redux';
import { clearData as clearDepot, tempListDepot } from '../../Maintenance/Depots/redux';
import { clearData as clearClient, tempListClient } from '../../Maintenance/Clients/redux';
import { reevalutateMessageStatus } from '../../../helpers/general-helper';
import ItemDescription from '../../../components/ItemDescription';

const { Title } = Typography;

const SalesOrders = (props) => {
  const { title, company, actions } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { itemColumn, formDetails } = FormDetails();

  const [contentLoading, setContentLoading] = useState(true);
  const [selectedSO, setSelectedSO] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);

  const { path } = useRouteMatch();
  const { salesOrderList, action, statusMessage, status, statusLevel } = useSelector(
    (state) => state.sales.salesOrders
  );
  const { id } = useSelector((state) => state.auth.user);

  const {
    action: actionDepot,
    statusMessage: statusMessageDepot,
    status: statusDepot,
    statusLevel: statusLevelDepot,
  } = useSelector((state) => state.maintenance.depots);

  const {
    action: actionClient,
    statusMessage: statusMessageClient,
    status: statusClient,
    statusLevel: statusLevelClient,
  } = useSelector((state) => state.maintenance.clients);

  const {
    action: actionPI,
    statusMessage: statusMessagePI,
    status: statusPI,
    statusLevel: statusLevelPI,
  } = useSelector((state) => state.maintenance.productInventory);

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
    reevalutateMessageStatus({status, action,statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    if (statusClient !== 'loading') {
      if (actionClient === 'fetch' && statusLevelClient === 'warning') {
        statusDialogue(
          {
            statusLevel: statusLevelClient,
            modalContent: {
              title: `${_.capitalize(statusLevelClient)} - (Client)`,
              content: statusMessageClient,
            },
          },
          'modal'
        );
      }
    }
  }, [actionClient, statusMessageClient, statusClient, statusLevelClient]);

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
    setContentLoading(true);
    dispatch(listSalesOrder(company))
      .then(unwrapResult)
      .then(() => {
        setContentLoading(false)
        if (isCancelled) {
          dispatch(clearData());
        }
      })
      .catch(() => {
        setContentLoading(false)
      });

    
    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearClient());
      dispatch(clearPI());

      isCancelled = true;
    };
  }, [dispatch, company, history]);

  const handleAddButton = () => {
    setContentLoading(true);
    dispatch(tempListDepot(company)).then((dataDepot) => {
      dispatch(tempListClient(company)).then((dataClient) => {
          const promiseList = [dataDepot, dataClient];
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
  };

  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setSelectedSO(data);
  };

  const handleApprove = (data) => {
    dispatch(approveSalesOrder(data.id)).then(() => {
      dispatch(listSalesOrder(company)).then(() => {
        setDisplayModal(false);
      });
    });
  };

  const handleReject = (data) => {
    dispatch(rejectSalesOrder(data.id)).then(() => {
      dispatch(listSalesOrder(company)).then(() => {
        setDisplayModal(false);
      });
    });
  };

  const onCreate = async (value) => {
    setContentLoading(true);
    await dispatch(createSalesOrder(formatPayload(id, company, value))).then(() => {
      dispatch(listSalesOrder(company)).then(() => {
        setContentLoading(false);
      }).catch(() => {
        setContentLoading(false)
      });
    }).catch(() => {
      setContentLoading(false)
    });
    return 1
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm title="New Sales Order" onSubmit={onCreate} company={company} />
      </Route>
      <Route path={`${path}`}>
        <Row gutter={[8, 24]}>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>{title}</Title>
            {actions.includes('create') && (
              <Button
                loading={contentLoading}
                icon={<PlusOutlined />}
                onClick={() => handleAddButton()}
              >
                Add
              </Button>
            )}
          </Col>
          <Col span={20}>
            {contentLoading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={tableHeader}
                data={salesOrderList}
                updateEnabled={false}
                deleteEnabled={false}
                handleRetrieve={handleRetrieve}
              />
            )}
          </Col>
        </Row>
        <Modal
          title="Sales Order Details"
          visible={displayModal}
          onOk={() => {
            setDisplayModal(false);
            setSelectedSO(null);
          }}
          onCancel={() => {
            setDisplayModal(false);
            setSelectedSO(null);
          }}
          width={1000}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          {selectedSO === null ? (
            <Skeleton />
          ) : (
            <>
              <ItemDescription
                title="Sales Order Details"
                selectedData={selectedSO}
                formItems={formatDescItems(formDetails.form_items)}
              />
              <Title level={5} style={{ marginRight: 'auto', marginTop: '2%', marginBottom: '1%' }}>
                Sales Order Product Items:
              </Title>
              <Table
                dataSource={selectedSO.products}
                columns={itemColumn}
                pagination={false}
                locale={{ emptyText: <Empty description="No Item Seleted." /> }}
              />
              {_.toLower(selectedSO.status) === 'pending' && (
                <>
                  <Space>
                    <Button
                      style={{ backgroundColor: '#3fc380', marginRight: '1%' }}
                      icon={<CheckOutlined />}
                      onClick={() => handleApprove(selectedSO)}
                      type="primary"
                    >
                      Approve
                    </Button>
                    <Button
                      style={{ marginRight: '1%' }}
                      icon={<CloseOutlined />}
                      onClick={() => handleReject(selectedSO)}
                      type="primary"
                      danger
                    >
                      Reject
                    </Button>
                  </Space>
                </>
              )}
            </>
          )}
        </Modal>
      </Route>
    </Switch>
  );
};

export default SalesOrders;
