import React, { useEffect, useState, useCallback, useRef } from 'react';
import _ from 'lodash';
import { Row, Typography, Col, Button, Skeleton, Modal, Space, Empty, Table } from 'antd';
import { PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { tableHeader } from './data';
import { formatDescItems, formatPayload } from './helpers';
import InputForm from './InputForm';
import {
  listSalesOrder,
  createSalesOrder,
  clearData,
  approveSalesOrder,
  rejectSalesOrder,
} from './redux';
import { clearData as clearDepot, listDepotByCompany } from '../../Maintenance/Depots/redux';
import { clearData as clearClient, listClient } from '../../Maintenance/Clients/redux';
import {
  clearData as clearPI,
  listProductInventory,
} from '../../Dashboard/ProductInventories/redux';
import GeneralHelper, {
  reevalutateMessageStatus,
  reevalDependencyMsgStats,
} from '../../../helpers/general-helper';
import ItemDescription from '../../../components/ItemDescription';

const { Title } = Typography;

const SalesOrders = (props) => {
  const { handleRequestResponse } = GeneralHelper();
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
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearDepot());
    dispatch(clearClient());
    dispatch(clearPI());
  }, [dispatch]);

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusClient,
      statusMessage: statusMessageClient,
      action: actionClient,
      statusLevel: statusLevelClient,
      module: 'Clients',
    });
  }, [actionClient, statusMessageClient, statusClient, statusLevelClient]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusPI,
      statusMessage: statusMessagePI,
      action: actionPI,
      statusLevel: statusLevelPI,
      module: 'Product Inventories',
    });
  }, [actionPI, statusMessagePI, statusPI, statusLevelPI]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusDepot,
      statusMessage: statusMessageDepot,
      action: actionDepot,
      statusLevel: statusLevelDepot,
      module: 'Depots',
    });
  }, [actionDepot, statusMessageDepot, statusDepot, statusLevelDepot]);

  useEffect(() => {
    setContentLoading(true);
    dispatch(listSalesOrder(company)).then(() => {
      if (isMounted.current) {
        setContentLoading(false);
      }
    });

    return function cleanup() {
      isMounted.current = false;
      performCleanup();
    };
  }, [dispatch, company, performCleanup]);

  const handleAddButton = () => {
    setContentLoading(true);
    dispatch(listDepotByCompany({ company })).then((resp1) => {
      dispatch(listClient({ company })).then((resp2) => {
        dispatch(listProductInventory({ company })).then((resp3) => {
          if (isMounted.current) {
            const onSuccess = () => {
              history.push(`${path}/new`);
              setContentLoading(false);
            };
            const onFail = () => {
              setContentLoading(false);
            };
            handleRequestResponse([resp1, resp2, resp3], onSuccess, onFail, '');
          }
        });
      });
    });
  };

  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setSelectedSO(data);
  };

  const handleApprove = (data) => {
    dispatch(approveSalesOrder(data.id)).then((response) => {
      setContentLoading(true);
      const onSuccess = () => {
        dispatch(listSalesOrder(company)).then(() => {
          setDisplayModal(false);
          setContentLoading(false);
        });
      };

      const onFail = () => {
        setDisplayModal(false);
        setContentLoading(false);
      };
      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleReject = (data) => {
    dispatch(rejectSalesOrder(data.id)).then((response) => {
      setContentLoading(true);
      const onSuccess = () => {
        dispatch(listSalesOrder(company)).then(() => {
          setDisplayModal(false);
          setContentLoading(false);
        });
      };

      const onFail = () => {
        setDisplayModal(false);
        setContentLoading(false);
      };
      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const onCreate = async (value) => {
    setContentLoading(true);
    await dispatch(createSalesOrder(formatPayload(id, company, value))).then((response) => {
      setContentLoading(true);
      const onSuccess = () => {
        dispatch(listSalesOrder(company)).then(() => {
          setDisplayModal(false);
          setContentLoading(false);
        });
      };

      const onFail = () => {
        setDisplayModal(false);
        setContentLoading(false);
      };
      handleRequestResponse([response], onSuccess, onFail, '');
    });
    return 1;
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
