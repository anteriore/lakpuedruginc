import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Button, Row, Col, Typography, Skeleton, Modal, Table, Empty } from 'antd';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader, formDetails } from './data';
import { listSalesInvoice, clearData, createSalesInvoice } from './redux';
import { clearData as clearDepot, listDepot } from '../../Maintenance/Depots/redux';
import { clearData as clearSO, listSalesOrder } from '../SalesOrders/redux';
import InputForm from './InputForm';
import { listProductInventory } from '../../Dashboard/ProductInventories/redux';
import { formatPayload } from './helpers';
import ItemDescription from '../../../components/ItemDescription';
import { formatDescItems } from '../OrderSlips/helpers';
import FormDetails from '../OrderSlips/data';
import GeneralHelper, {reevalDependencyMsgStats, reevalutateMessageStatus} from '../../../helpers/general-helper';

const { Title } = Typography;

const SalesInvoice = (props) => {
  const { title, company, actions } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const { handleRequestResponse } = GeneralHelper();
  const { itemColumns } = FormDetails();
  const { 
    salesInvoiceList, 
    action, statusMessage, 
    status, statusLevel } = useSelector(
    (state) => state.sales.salesInvoice
  );
  const { id } = useSelector((state) => state.auth.user);

  const [displayModal, setDisplayModal] = useState(false);
  const [selectedSI, setSelectedSI] = useState(null);
  const [contentLoading, setContentLoading] = useState(true);

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

  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearDepot());
    dispatch(clearSO());
  }, [dispatch])

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
    dispatch(listSalesInvoice(company))
    .then(() => {
      if (isMounted.current) {
        setContentLoading(false)
      } else {
        performCleanup();
      }
    });

  
    return function cleanup() {
      isMounted.current = false;
    };
  }, [dispatch, company, performCleanup]);

  const handleAddButton = () => {
    setContentLoading(true);
    dispatch(listDepot({company})).then((resp1) => {
      dispatch(listProductInventory({company})).then((resp2) => {
        dispatch(listSalesOrder(company)).then((resp3) => {
          if(isMounted.current){
            const onSuccess = () => {
                history.push(`${path}/new`);
                setContentLoading(false);
            }
            const onFail = () => {
              setContentLoading(false);
            }
            handleRequestResponse([resp1, resp2, resp3], onSuccess, onFail, '');
          }
          else {
            performCleanup()
          }
        });
      });
    });
  };

  const handleRetrieve = (data) => {
    setSelectedSI(data);
    setDisplayModal(true);
  };

  const onCreate = async (value, salesOrder, salesInvoiceProducts) => {
    setContentLoading(true)
    const payload = formatPayload({
      id,
      company,
      value,
      salesOrder,
      salesInvoiceProducts,
    });

    await dispatch(createSalesInvoice(payload)).then((response) => {
      const onSuccess = () => {
        dispatch(listSalesInvoice(company)).then(() => {
          setDisplayModal(false);
          setContentLoading(false);
        });
      };

      const onFail = () => {
        setDisplayModal(false);
        setContentLoading(false);
      }
      handleRequestResponse([response], onSuccess, onFail, '');
    });
    return 1
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm title="New Sales Invoice" onSubmit={onCreate} company={company} />
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
              <ItemDescription
                title="Sales Invoice Details"
                selectedData={selectedSI}
                formItems={formatDescItems(formDetails.form_items)}
              />
              <Title level={5} style={{ marginRight: 'auto', marginTop: '2%', marginBottom: '1%' }}>
                Sales Invoice Product Items:
              </Title>
              <Table
                dataSource={selectedSI.orderedProducts}
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

export default SalesInvoice;
