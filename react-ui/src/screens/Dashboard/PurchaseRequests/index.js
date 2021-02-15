import React, { useState, useEffect } from 'react';
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
import { PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { listPR, addPR, deletePR, approvePR, rejectPR, clearData } from './redux';
import { listD, clearData as clearDepartment } from '../../Maintenance/DepartmentArea/redux';
import { listItemSummary, clearData as clearItem } from '../../Maintenance/Items/redux';
import { DisplayDetails, FormDetails } from './data';
import { processDataForSubmission, loadDataForUpdate } from './helpers';
import InputForm from './InputForm';
import TableDisplay from '../../../components/TableDisplay';

const { Title, Text } = Typography;

const PurchaseRequests = (props) => {
  const [loading, setLoading] = useState(true);

  const [displayModal, setDisplayModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const { columns, itemColumns } = DisplayDetails();
  const { formDetails, tableDetails } = FormDetails();

  const listData = useSelector((state) => state.dashboard.purchaseRequests.list);

  const { company, title, actions } = props;
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listPR({ company, message })).then(() => {
      dispatch(listD({ company, message })).then(() => {
        setLoading(false);
        if (isCancelled) {
          dispatch(clearData());
        }
      });
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearItem());
      dispatch(clearDepartment());
      isCancelled = true;
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create Purchase Request');
    setFormMode('add');
    setFormData(null);
    dispatch(listItemSummary({ company, message })).then(() => {
      history.push(`${path}/new`);
    })
  }

  const handleUpdate = (data) => {
    if(data.status === 'Pending'){
      setFormTitle('Edit Purchase Request');
      setFormMode('edit');
      setLoading(true);
      const itemData = listData.find((item) => item.id === data.id);
      dispatch(listItemSummary({ company, message })).then((response) => {
        const inputData = loadDataForUpdate(itemData, response.payload.data)
        setFormData(inputData);
        history.push(`${path}/${data.id}`);
      })
    }
    else {
      message.error("This action may only be performed on pending purchase requests.")
    }
  };

  const handleDelete = (data) => {
    setLoading(true);
    dispatch(deletePR(data.id)).then(() => {
      dispatch(listPR({ company, message })).then(() => {
        setLoading(false);
        message.success(`Successfully deleted Purchase Request ${data.number}`);
      });
    });
  };
  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setSelectedData(data)
  };

  const handleApprove = (data) => {
    dispatch(approvePR({ id: data.id })).then(() => {
      closeModal();
      dispatch(listPR({ company, message })).then(() => {});
    });
  };

  const handleReject = (data) => {
    dispatch(rejectPR({ id: data.id })).then(() => {
      closeModal();
      dispatch(listPR({ company, message })).then(() => {});
    });
  };

  const onSubmit = (data) => {
    const payload = processDataForSubmission(data, company)

    if (formMode === 'edit') {
      payload.id = formData.id;
    }

    dispatch(addPR(payload)).then((response) => {
      if (response.payload.status === 200) {
        message.success(`Successfully saved ${response.payload.data.number}`);
        dispatch(listPR({ company: company, message })).then(() => {
          history.goBack();
          setLoading(false)
        });
      } else {
        setLoading(false);
        if(formMode === 'add'){
          message.error(`Unable to add Purchase Request. Please double check the provided information.`);
        }
        else {
          message.error(`Something went wrong. Unable to update ${data.number}.`);
        }
      }
    })
  };
  
  const handleCancelButton = () => {
    setFormData(null);
    setLoading(false)
  };

  const closeModal = () => {
    setDisplayModal(false);
    setSelectedData(null);
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={handleCancelButton}
          formDetails={formDetails}
          formTable={tableDetails}
        />
      </Route>
      <Route path={`${path}/:id`}>
        <InputForm
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
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
                data={listData}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                updateEnabled={actions.includes("update")}
                deleteEnabled={actions.includes("delete")}
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
                title={`Purchase Request ${selectedData.number} Details`}
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
              <Text>{'Requested Items: '}</Text>
              <Table
                dataSource={selectedData !== null ? selectedData.requestedItems : []}
                columns={itemColumns}
                pagination={false}
                locale={{ emptyText: <Empty description="No Item Seleted." /> }}
              />
              {selectedData.status === 'Pending' && ( // add approval permissions here
                <>
                  <Text>{'Actions: '}</Text>
                  <Space>
                    <Button
                      style={{ backgroundColor: '#3fc380', marginRight: '1%' }}
                      icon={<CheckOutlined />}
                      onClick={(e) => {
                        handleApprove(selectedData);
                      }}
                      type="primary"
                    >
                      Approve
                    </Button>
                    <Button
                      style={{ marginRight: '1%' }}
                      icon={<CloseOutlined />}
                      onClick={(e) => {
                        handleReject(selectedData);
                      }}
                      type="primary"
                      danger
                    >
                      Reject
                    </Button>
                  </Space>
                </>
              )}
            </Space>
          )}
        </Modal>
      </Route>
    </Switch>
  );
};

export default PurchaseRequests;
