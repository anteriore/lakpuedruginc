import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Row, Typography, Col, Button, Skeleton, Modal, Table, Empty } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { tableHeader } from './data';
import InputForm from './InputForm';
import { formatDescItems, formatPayload } from './helpers';
import { listOrderSlips, createOrderSlips, clearData } from './redux';
import { clearData as clearDepot, listDepot } from '../../Maintenance/Depots/redux';
import { clearData as clearSO, listSalesOrder } from '../SalesOrders/redux';
import { listProductInventory } from '../../Dashboard/ProductInventories/redux';
import ItemDescription from '../../../components/ItemDescription';
import GeneralHelper, {
  reevalDependencyMsgStats,
  reevalutateMessageStatus,
} from '../../../helpers/general-helper';

const { Title } = Typography;

const OrderSlips = (props) => {
  const { title, company, actions } = props;
  const { formDetails, itemColumns } = FormDetails();
  const { handleRequestResponse } = GeneralHelper();
  const history = useHistory();
  const { path } = useRouteMatch();
  const [contentLoading, setContentLoading] = useState(true);
  const { orderSlipsList, action, statusMessage, status, statusLevel } = useSelector(
    (state) => state.sales.orderSlips
  );
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedOS, setSelectedOS] = useState(null);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user);
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearDepot());
    dispatch(clearSO());
  }, [dispatch]);

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

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusSO,
      statusMessage: statusMessageSO,
      action: actionSO,
      statusLevel: statusLevelSO,
      module: title,
    });
  }, [actionSO, statusMessageSO, statusSO, statusLevelSO, title]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusPI,
      statusMessage: statusMessagePI,
      action: actionPI,
      statusLevel: statusLevelPI,
      module: title,
    });
  }, [actionPI, statusMessagePI, statusPI, statusLevelPI, title]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusDepot,
      statusMessage: statusMessageDepot,
      action: actionDepot,
      statusLevel: statusLevelDepot,
      module: title,
    });
  }, [actionDepot, statusMessageDepot, statusDepot, statusLevelDepot, title]);

  useEffect(() => {
    setContentLoading(true);
    dispatch(listOrderSlips(company)).then(() => {
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
    dispatch(listDepot({ company })).then((resp1) => {
      dispatch(listProductInventory({ company })).then((resp2) => {
        dispatch(listSalesOrder(company)).then((resp3) => {
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
    setSelectedOS(data);
  };

  const onCreate = async (value, salesOrder, orderedProducts) => {
    setContentLoading(true);
    const payload = formatPayload(id, company, value, salesOrder, orderedProducts);

    await dispatch(createOrderSlips(payload)).then((response) => {
      const onSuccess = () => {
        dispatch(listOrderSlips(company)).then(() => {
          setContentLoading(false);
        });
      };
      const onFail = () => {
        setContentLoading(false);
      };

      handleRequestResponse([response], onSuccess, onFail, '');
    });
    return 1;
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
              <ItemDescription
                title="Order Slips Details"
                selectedData={selectedOS}
                formItems={formatDescItems(formDetails.form_items)}
              />
              <Title level={5} style={{ marginRight: 'auto', marginTop: '2%', marginBottom: '1%' }}>
                Ordered Product Items:
              </Title>
              <Table
                dataSource={selectedOS.orderedProducts}
                columns={itemColumns}
                pagination={false}
                locale={{ emptyText: <Empty description="No Item Seleted." /> }}
              />
            </>
          )}
        </Modal>
      </Route>
    </Switch>
  );
};

export default OrderSlips;
