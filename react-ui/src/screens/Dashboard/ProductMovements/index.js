import React, { useCallback, useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Row, Col, Typography, Button, Skeleton, Descriptions, Modal, Table, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import _ from 'lodash';
import moment from 'moment';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { formDetails, tableHeader, productModalHeader } from './data';
import { listProductMovements, clearData, createProductMovement } from './redux';
import InputForm from './InputForm';
import statusDialogue from '../../../components/StatusDialogue';
import { clearData as clearDepot, tempListDepot } from '../../Maintenance/Depots/redux';
import {
  clearData as clearPI,
  tempListProductInventory,
} from '../../Maintenance/redux/productInventory';
import { formatPMPayload } from './helpers';

const { Title } = Typography;

const ProductMovements = (props) => {
  const { company, title, actions } = props;
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const [contentLoading, setContentLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [productMovement, setProductMovement] = useState(null);

  const { productMovementList, action, statusMessage, status, statusLevel } = useSelector(
    (state) => state.dashboard.productMovements
  );
  const { id } = useSelector((state) => state.auth.user);

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
    dispatch(listProductMovements(company))
      .then(unwrapResult)
      .then(() => {
        if (isCancelled) {
          dispatch(clearData());
        }
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      })
      .finally(() => {
        setContentLoading(false);
      });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearPI());

      isCancelled = true;
    };
  }, [dispatch, company]);

  const handleAddButton = () => {
    setContentLoading(true);
    dispatch(tempListDepot(company)).then((dataDepot) => {
      dispatch(tempListProductInventory()).then((dataPI) => {
        const promiseList = [dataDepot, dataPI];
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
    setProductMovement(data);
  };

  const onCreate = async (values) => {
    setContentLoading(true);
    await dispatch(createProductMovement(formatPMPayload(id, company, values))).then(() => {
      dispatch(listProductMovements(company)).then(() => {
        setContentLoading(false);
      });
    });
    return 1
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
