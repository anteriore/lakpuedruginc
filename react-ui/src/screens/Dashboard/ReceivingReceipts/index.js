import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Row,
  Col,
  Table,
  Typography,
  Button,
  Modal,
  Skeleton,
  Empty,
  Descriptions,
  Space,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
import TableDisplay from '../../../components/TableDisplay';
import { DisplayDetails, FormDetails, TollingFormDetails } from './data';
import { formatPayload } from './helpers';
import InputForm from './InputForm';
import TollingInputForm from './TollingInputForm';
import { listRR, addRR, clearData } from './redux';
import { clearData as clearPO, listPO } from '../../Purchasing/redux';
import { clearData as clearItem, listI } from '../../Maintenance/Items/redux';
import GeneralHelper, {
  reevalutateMessageStatus,
  reevalDependencyMsgStats,
} from '../../../helpers/general-helper';

const { Title, Text } = Typography;

const ReceivingReceipts = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleRequestResponse } = GeneralHelper();
  const { title, company, actions } = props;
  const { path } = useRouteMatch();
  const { id } = useSelector((state) => state.auth.user);

  const [displayModal, setDisplayModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formTitle, setFormTitle] = useState('');

  const { columns, itemColumns } = DisplayDetails();
  const { formDetails, tableDetails } = FormDetails();
  const { formDetails: formTollingDetails, tableDetails: tableTollingDetails } = TollingFormDetails();
  const [receivingReceipt, setReceivingReceipt] = useState(null);
  const { list, status, statusLevel, statusMessage, action } = useSelector(
    (state) => state.dashboard.receivingReceipts
  );
  const {
    status: statusItems,
    statusLevel: statusLevelItems,
    statusMessage: statusMessageItems,
    action: actionItems,
  } = useSelector((state) => state.maintenance.items);
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearPO());
    dispatch(clearItem());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listRR({ company, message })).then(() => {
      if (isMounted.current) {
        setLoading(false);
      }
    });

    return function cleanup() {
      isMounted.current = false;
      performCleanup();
    };
  }, [dispatch, company, performCleanup]);

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusItems,
      statusMessage: statusMessageItems,
      action: actionItems,
      statusLevel: statusLevelItems,
      module: title,
    });
  }, [actionItems, statusMessageItems, statusItems, statusLevelItems, title]);

  const handleAdd = () => {
    setFormTitle('Create Receiving Receipt');
    setReceivingReceipt(null);
    setLoading(true);
    dispatch(listPO({ company, message })).then((resp1) => {
      dispatch(listI({ company, message })).then((resp2) => {
        if (isMounted.current) {
          const onSuccess = () => {
            history.push(`${path}/new`);
            setLoading(false);
          };
          const onFail = () => {
            setLoading(false);
          };
          handleRequestResponse([resp1, resp2], onSuccess, onFail, '');
        }
      });
    });
  };

  const handleAddTolling = () => {
    setFormTitle('Create Receiving Receipt');
    setReceivingReceipt(null);
    setLoading(true);
    console.log(formTollingDetails)
    console.log(tableTollingDetails)
    dispatch(listPO({ company, message })).then((resp1) => {
      dispatch(listI({ company, message })).then((resp2) => {
        if (isMounted.current) {
          const onSuccess = () => {
            history.push(`${path}/tolling`);
            setLoading(false);
          };
          const onFail = () => {
            setLoading(false);
          };
          handleRequestResponse([resp1, resp2], onSuccess, onFail, '');
        }
      });
    });
  };

  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setReceivingReceipt(data);
  };

  const onSubmit = async (data) => {
    const payload = formatPayload(id, company, data);

    await dispatch(addRR(payload)).then((response) => {
      setLoading(true);
      const onSuccess = () => {
        history.goBack();
        dispatch(listRR({ company, message })).then(() => {
          setLoading(false);
        });
      };
      const onFail = () => {
        setLoading(false);
      };

      handleRequestResponse([response], onSuccess, onFail, '');
    });
    return 1;
  };

  const handleCancelButton = () => {
    setReceivingReceipt(null);
    setLoading(false);
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm
          title={formTitle}
          onSubmit={onSubmit}
          values={receivingReceipt}
          onCancel={handleCancelButton}
          formDetails={formDetails}
          formTable={tableDetails}
        />
      </Route>
      <Route path={`${path}/tolling`}>
        <TollingInputForm
          title={formTitle}
          onSubmit={onSubmit}
          values={receivingReceipt}
          onCancel={handleCancelButton}
          formDetails={formTollingDetails}
          formTable={tableTollingDetails}
        />
      </Route>
      <Route path={path}>
        <Row>
          <Col span={20}>
            <Title level={3} style={{ float: 'left' }}>
              {title}
            </Title>
            {actions.includes('create') && (
              <Button
                style={{ float: 'right', marginRight: '1%' }}
                icon={<PlusOutlined />}
                loading={loading}
                onClick={(e) => {
                  handleAdd();
                }}
              >
                Add
              </Button>
            )}
            {actions.includes('create') && (
              <Button
                style={{ float: 'right', marginRight: '1%' }}
                icon={<PlusOutlined />}
                loading={loading}
                onClick={(e) => {
                  handleAddTolling();
                }}
              >
                Add Tolling
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          {loading ? (
            <Skeleton />
          ) : (
            <Col span={20}>
              <TableDisplay
                columns={columns}
                data={list}
                updateEnabled={false}
                deleteEnabled={false}
                handleRetrieve={handleRetrieve}
              />
            </Col>
          )}
        </Row>
        <Modal
          visible={displayModal}
          onOk={() => {
            setDisplayModal(false);
            setReceivingReceipt(null);
          }}
          onCancel={() => {
            setDisplayModal(false);
            setReceivingReceipt(null);
          }}
          width={1000}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          {receivingReceipt === null ? (
            <Skeleton />
          ) : (
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <Descriptions
                bordered
                title={`Receiving Receipt ${receivingReceipt.number} Details`}
                size="default"
                layout="vertical"
              >
                {formDetails.form_items.map((item) => {
                  if (!item.writeOnly) {
                    if (receivingReceipt[item.name] === null && item.toggle) {
                      return null;
                    }
                    if (item.type === 'select' || item.type === 'selectSearch') {
                      const itemData = receivingReceipt[item.name];
                      if (itemData !== null && typeof itemData !== 'undefined') {
                        return (
                          <Descriptions.Item label={item.label}>
                            {itemData[item.selectName]}
                          </Descriptions.Item>
                        );
                      }
                    }
                    if (item.type === 'date') {
                      return (
                        <Descriptions.Item label={item.label}>
                          {moment(new Date(receivingReceipt[item.name])).format('DD/MM/YYYY')}
                        </Descriptions.Item>
                      );
                    }
                    if (item.type === 'list') {
                      return null;
                    }

                    return (
                      <Descriptions.Item label={item.label}>
                        {receivingReceipt[item.name]}
                      </Descriptions.Item>
                    );
                  }

                  return null;
                })}
              </Descriptions>
              <Text>Received Items:</Text>
              <Table
                dataSource={receivingReceipt !== null ? receivingReceipt.receivedItems : []}
                columns={itemColumns}
                pagination={false}
                locale={{ emptyText: <Empty description="No Item Selected." /> }}
              />
            </Space>
          )}
        </Modal>
      </Route>
    </Switch>
  );
};

export default ReceivingReceipts;
