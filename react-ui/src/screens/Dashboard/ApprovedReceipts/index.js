import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Typography, Button, Modal, Skeleton, Empty, Descriptions, Space, message, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
import TableDisplay from '../../../components/TableDisplay';
import { DisplayDetails, FormDetails } from './data';
import { formatPayload } from './helpers';
import InputForm from './InputForm';
import { listApprovedReceipts, addApprovedReceipt, clearData,} from './redux';
import { clearData as clearRR, listRR } from '../../Dashboard/ReceivingReceipts/redux';
import { clearData as clearItem, listItemSummary} from '../../Maintenance/Items/redux';

const { Title, Text } = Typography;

const ApprovedReceipts = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { title, company, actions } = props;
  const { id } = useSelector((state) => state.auth.user);
  const { path } = useRouteMatch();

  const [displayModal, setDisplayModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');

  const { columns, itemColumns } = DisplayDetails();
  const { formDetails, tableDetails } = FormDetails();
  const [selectedData, setSelectedData] = useState(null);
  const arList = useSelector((state) => state.dashboard.approvedReceipts.list);


  useEffect(() => {
    let isCancelled = false;
    
    dispatch(listApprovedReceipts({ company, message })).then(() => {
      setLoading(false);
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearRR());
      dispatch(clearItem());
      isCancelled = true;
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create Approved Receipt');
    setFormMode('add');
    setSelectedData(null);
    dispatch(listRR({ company, message })).then(() => {
      dispatch(listItemSummary({ company, message })).then(() => {
        history.push(`${path}/new`);
      })
    })
  };

  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setSelectedData(data);
  };

  const onSubmit = (data) => {
    const payload = formatPayload(id, company, data)
    
    if (formMode === 'edit') {
      payload.id = selectedData.id;
    }

    dispatch(addApprovedReceipt(payload)).then((response) => {
      if (response.payload.status === 200) {
        message.success(`Successfully saved ${response.payload.data.number}`);
        dispatch(listApprovedReceipts({ company: company, message })).then(() => {
          history.goBack();
          setLoading(false)
        });
      } else {
        setLoading(false);
        if(formMode === 'add'){
          message.error(`Unable to add Approved Receipt. Please double check the provided information.`);
        }
        else {
          message.error(`Something went wrong. Unable to update ${data.number}.`);
        }
      }
    })
  };

  const handleCancelButton = () => {
    setSelectedData(null);
    setLoading(false)
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm
          title={formTitle}
          onSubmit={onSubmit}
          values={selectedData}
          onCancel={handleCancelButton}
          formDetails={formDetails}
          formTable={tableDetails}
        />
      </Route>
      <Route path={`${path}/:id`}>
        <InputForm
          title={formTitle}
          onSubmit={onSubmit}
          values={selectedData}
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
            {actions.includes("create") && 
            <Button
              style={{ float: 'right', marginRight: '1%' }}
              icon={<PlusOutlined />}
              onClick={(e) => {
                handleAdd()
              }}
            >
              Add
            </Button>
            }
          </Col>
        </Row>
        <Row>
          {loading ? (
            <Skeleton />
          ) : (
            <Col span={20}>
              <TableDisplay
                columns={columns}
                data={arList}
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
            setSelectedData(null);
          }}
          onCancel={() => {
            setDisplayModal(false);
            setSelectedData(null);
          }}
          width={1000}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          {selectedData === null ? (
            <Skeleton />
          ) : (
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <Descriptions
                bordered
                title={`Approved Receipt ${selectedData.number} Details`}
                size="default"
                layout="vertical"
              >
                {formDetails.form_items.map((item) => {
                  if (!item.writeOnly) {
                    if (selectedData[item.name] === null && item.toggle) {
                      return null;
                    }
                    if (item.type === 'select' || item.type === 'selectSearch') {
                      const itemData = selectedData[item.name];
                      if(itemData !== null && typeof itemData !== 'undefined'){
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
                          {moment(new Date(selectedData[item.name])).format('DD/MM/YYYY')}
                        </Descriptions.Item>
                      );
                    }
                    if (item.type === 'list') {
                      return null;
                    }

                    return (
                      <Descriptions.Item label={item.label}>
                        {selectedData[item.name]}
                      </Descriptions.Item>
                    );
                  }

                  return null;
                })}
              </Descriptions>
              <Title level={5} style={{ marginRight: 'auto', marginTop: '2%', marginBottom: '1%' }}>
                Approved Item:
              </Title>
              <Descriptions title={`[${selectedData.item.code}] ${selectedData.item.name}`} size="default">
                <Descriptions.Item label="Received">{selectedData.receivedQuantity}</Descriptions.Item>
                <Descriptions.Item label="Approved">{selectedData.approvedQuantity}</Descriptions.Item>
                <Descriptions.Item label="Rejected">{selectedData.rejectedQuantity}</Descriptions.Item>
                <Descriptions.Item label="QC Sample">{selectedData.qcSamples}</Descriptions.Item>
                <Descriptions.Item label="Total">{selectedData.totalQuantity}</Descriptions.Item>
                <Descriptions.Item label="Expiration">{selectedData.expiration}</Descriptions.Item>
                <Descriptions.Item label="Best Before">{selectedData.bestBefore}</Descriptions.Item>
                <Descriptions.Item label="Reevaluation">{selectedData.reevaluation}</Descriptions.Item>
                <Descriptions.Item label="Retest">{selectedData.retest}</Descriptions.Item>
              </Descriptions>
              
              <Text>{'Approved Item:'}</Text>
              <Table
                dataSource={[
                  `[${selectedData.item.code}] ${selectedData.item.name}`,
                  selectedData.receivedQuantity,
                  selectedData.approvedQuantit,
                  selectedData.rejectedQuantity,
                  selectedData.qcSamples,
                  selectedData.totalQuantity,
                  selectedData.expiration,
                  selectedData.bestBefore,
                  selectedData.reevaluation,
                  selectedData.retest
                ]}
                columns={itemColumns}
                pagination={false}
                locale={{ emptyText: <Empty description = "No Item Selected." /> }}
              />
            </Space>
          )}
        </Modal>
      </Route>
    </Switch>
  );
};

export default ApprovedReceipts;
