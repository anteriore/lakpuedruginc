import React, { useEffect, useState, useCallback } from 'react';
import { Row, Typography, Col, Button, Skeleton, Modal, Table, Empty } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import FormDetails ,{ tableHeader } from './data';
import InputForm from './InputForm';
import { formatDescItems, formatPayload } from './helpers';
import { listOrderSlips, createOrderSlips, clearData } from './redux';
import { clearData as clearDepot, tempListDepot } from '../../Maintenance/Depots/redux';
import { clearData as clearSO, listSalesOrder } from '../SalesOrders/redux';
import { tempListProductInventory } from '../../Maintenance/redux/productInventory';
import ItemDescription from '../../../components/ItemDescription';
import GeneralHelper, { reevalDependencyMsgStats, reevalutateMessageStatus } from '../../../helpers/general-helper';

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
    reevalutateMessageStatus({status, action,statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusSO,
      statusMessage: statusMessageSO,
      action: actionSO, 
      statusLevel: statusLevelSO,
      module: title
    })
  }, [actionSO, statusMessageSO, statusSO, statusLevelSO, title]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusPI,
      statusMessage: statusMessagePI,
      action: actionPI, 
      statusLevel: statusLevelPI,
      module: title
    })
  }, [actionPI, statusMessagePI, statusPI, statusLevelPI, title]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusDepot,
      statusMessage: statusMessageDepot,
      action: actionDepot, 
      statusLevel: statusLevelDepot,
      module: title
    })
  }, [actionDepot, statusMessageDepot, statusDepot, statusLevelDepot, title]);

  useEffect(() => {
    setContentLoading(true);
    let isCancelled = false;
    dispatch(listOrderSlips(company))
    .then(unwrapResult)
    .then(() => {
      if (isCancelled) {
        dispatch(clearData());
      }
      setContentLoading(false);
    })

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearSO());
      isCancelled = true;
    };
  }, [dispatch, company]);

  const onSuccess = useCallback(() => {
    history.push(`${path}/new`);
	},[history, path])

	const onFail = useCallback(() => {
		history.goBack();
		setContentLoading(false);
	},[history])

  const handleAddButton = () => {
    setContentLoading(true);
    dispatch(tempListDepot(company)).then((dataDepot) => {
      dispatch(tempListProductInventory()).then((dataPI) => {
        dispatch(listSalesOrder(company)).then((dataSO) => {
          const dataList = [dataDepot, dataPI, dataSO];
          handleRequestResponse(dataList, onSuccess, onFail, '/sales')
          setContentLoading(false);
        });
      });
    });
  };

  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setSelectedOS(data);
  };

  const onCreate = (value, salesOrder, orderedProducts) => {
    setContentLoading(true);
    const payload = formatPayload(id, company, value, salesOrder, orderedProducts);

    dispatch(createOrderSlips(payload)).then(() => {
      dispatch(listOrderSlips(company)).then(() => {
        setContentLoading(false);
      }).catch(() => {
        setContentLoading(false)
      });
    }).catch(() => {
      setContentLoading(false)
    });;
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
