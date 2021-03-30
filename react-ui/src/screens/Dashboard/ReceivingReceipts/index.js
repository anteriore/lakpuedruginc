import React, { useEffect, useState } from 'react';
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
import { DisplayDetails, FormDetails } from './data';
import { formatPayload } from './helpers';
import InputForm from './InputForm';
import { listRR, addRR, clearData } from './redux';
import { clearData as clearPO, listPO } from '../../Purchasing/redux';
import { clearData as clearItem, listItemSummary } from '../../Maintenance/Items/redux';

const { Title, Text } = Typography;

const ReceivingReceipts = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { title, company, actions } = props;
  const { path } = useRouteMatch();
  const { id } = useSelector((state) => state.auth.user);

  const [displayModal, setDisplayModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');

  const { columns, itemColumns } = DisplayDetails();
  const { formDetails, tableDetails } = FormDetails();
  const [receivingReceipt, setReceivingReceipt] = useState(null);
  const rrList = useSelector((state) => state.dashboard.receivingReceipts.list);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listRR({ company, message })).then(() => {
        setLoading(false);
        if (isCancelled) {
          dispatch(clearData());
        }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearPO());
      dispatch(clearItem());
      isCancelled = true;
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create Receiving Receipt');
    setFormMode('add');
    setReceivingReceipt(null);
    setLoading(true)
    dispatch(listPO({ company, message })).then(() => {
      dispatch(listItemSummary({ company, message })).then(() => {
        setLoading(false)
        history.push(`${path}/new`);
      });
    });
  };

  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setReceivingReceipt(data);
  };

  const onSubmit = async (data) => {
    const payload = formatPayload(id, company, data);

    if (formMode === 'edit') {
      payload.id = receivingReceipt.id;
    }

    await dispatch(addRR(payload)).then((response) => {
      if (response.payload.status === 200) {
        message.success(`Successfully saved ${response.payload.data.number}`);
        setLoading(true);
        history.goBack();
        dispatch(listRR({ company, message })).then(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
        if (formMode === 'add') {
          message.error(
            `Unable to add Receiving Receipt. Please double check the provided information.`
          );
        } else {
          message.error(`Something went wrong. Unable to update ${data.number}.`);
        }
      }
    });
    return 1
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
      <Route path={`${path}/:id`}>
        <InputForm
          title={formTitle}
          onSubmit={onSubmit}
          values={receivingReceipt}
          onCancel={handleCancelButton}
          formDetails={formDetails}
          formTable={tableDetails}
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
          </Col>
        </Row>
        <Row>
          {loading ? (
            <Skeleton />
          ) : (
            <Col span={20}>
              <TableDisplay
                columns={columns}
                data={rrList}
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
