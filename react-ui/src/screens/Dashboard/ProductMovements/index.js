import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Row, Col, Typography, Button, Skeleton, Descriptions, Modal, Table, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { formDetails, tableHeader, productModalHeader } from './data';
import { listProductMovements, clearData, createProductMovement } from './redux';
import InputForm from './InputForm';
import { clearData as clearDepot, listDepotByCompany } from '../../Maintenance/Depots/redux';
import {
  clearData as clearPI,
  listProductInventory,
} from '../../Maintenance/redux/productInventory';
import { formatPMPayload } from './helpers';
import GeneralHelper, {
  reevalutateMessageStatus,
  reevalDependencyMsgStats,
} from '../../../helpers/general-helper';

const { Title } = Typography;

const ProductMovements = (props) => {
  const { handleRequestResponse } = GeneralHelper();
  const { company, title, actions } = props;
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const [contentLoading, setContentLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [productMovement, setProductMovement] = useState(null);
  const isMounted = useRef(true);

  const { productMovementList, action, statusMessage, status, statusLevel } = useSelector(
    (state) => state.dashboard.productMovements
  );
  const { id } = useSelector((state) => state.auth.user);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearDepot());
    dispatch(clearPI());
  }, [dispatch]);

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

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusPI,
      statusMessage: statusMessagePI,
      action: actionPI,
      statusLevel: statusLevelPI,
      module: 'Product Inventory',
    });
  }, [actionPI, statusMessagePI, statusPI, statusLevelPI]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusDepot,
      statusMessage: statusMessageDepot,
      action: actionDepot,
      statusLevel: statusLevelDepot,
      module: 'Depot',
    });
  }, [actionDepot, statusMessageDepot, statusDepot, statusLevelDepot]);

  useEffect(() => {
    dispatch(listProductMovements(company)).then(() => {
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
    dispatch(listDepotByCompany({ company })).then((response1) => {
      dispatch(listProductInventory({ company })).then((response2) => {
        if (isMounted.current) {
          const onSuccess = () => {
            history.push(`${path}/new`);
            setContentLoading(false);
          };
          const onFail = () => {
            setContentLoading(false);
          };
          handleRequestResponse([response1, response2], onSuccess, onFail, '');
        }
      });
    });
  };

  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setProductMovement(data);
  };

  const onCreate = async (values) => {
    setContentLoading(true);
    formatPMPayload(id, company, values);
    await dispatch(createProductMovement(formatPMPayload(id, company, values))).then((response) => {
      const onSuccess = () => {
        dispatch(listProductMovements(company)).then(() => {
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
        <InputForm title="New Product Movement" onSubmit={onCreate} company={company} />
      </Route>
      <Route path={`${path}`}>
        <Row>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>{title}</Title>
            {actions.includes('create') && (
              <Button
                loading={contentLoading}
                onClick={() => handleAddButton()}
                icon={<PlusOutlined />}
                primary
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
                data={productMovementList}
                deleteEnabled={false}
                updateEnabled={false}
                handleRetrieve={handleRetrieve}
              />
            )}
          </Col>
        </Row>
        <Modal
          title="Product Movement Details"
          visible={displayModal}
          onOk={() => {
            setDisplayModal(false);
            setProductMovement(null);
          }}
          onCancel={() => {
            setDisplayModal(false);
            setProductMovement(null);
          }}
          width={1000}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          {productMovement === null ? (
            <Skeleton />
          ) : (
            <>
              <Descriptions
                bordered
                title={`Product Movement ${productMovement.number}`}
                size="default"
                layout="vertical"
              >
                {formDetails.form_items.map((item) => {
                  if (item.type === 'select') {
                    const itemData = productMovement[item.name];
                    return (
                      <Descriptions.Item key={item.name} label={item.label}>
                        {typeof itemData === 'object' ? itemData.code : itemData}
                      </Descriptions.Item>
                    );
                  }

                  if (item.type === 'date') {
                    return (
                      <Descriptions.Item key={item.name} label={item.label}>
                        {moment(new Date(productMovement[item.name])).format('DD/MM/YYYY')}
                      </Descriptions.Item>
                    );
                  }

                  return (
                    <Descriptions.Item key={item.name} label={item.label}>
                      {typeof productMovement[item.name] === 'object' &&
                      productMovement[item.name] !== null
                        ? productMovement[item.name].code
                        : productMovement[item.name]}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
              <Title level={5} style={{ marginRight: 'auto', marginTop: '2%', marginBottom: '1%' }}>
                Product Movement Items:
              </Title>
              <Table
                dataSource={productMovement.products}
                columns={productModalHeader}
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

export default ProductMovements;
