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
  Input,
  Space,
  Popconfirm,
  message,
} from 'antd';
import { PlusOutlined, CheckOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { listPR, cancelPR, addPR, deletePR, approvePR, rejectPR, clearData } from './redux';
import { listD, clearData as clearDepartment } from '../../Maintenance/DepartmentArea/redux';
import { listItemSummary, clearData as clearItem } from '../../Maintenance/Items/redux';
import { DisplayDetails, FormDetails } from './data';
import { processDataForSubmission, loadDataForUpdate } from './helpers';
import InputForm from './InputForm';
import TableDisplay from '../../../components/TableDisplay';
import ItemDescription from '../../../components/ItemDescription';
import GeneralHelper from '../../../helpers/general-helper';

const { Title, Text } = Typography;
const { TextArea } = Input;

const PurchaseRequests = (props) => {
  const [loading, setLoading] = useState(true);

  const [displayCancelModal, setDisplayCancelModal] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [remarks, setRemarks] = useState(null);

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
  const { handleRequestResponse } = GeneralHelper();

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
    history.push(`${path}/new`);
  };

  const handleUpdate = (data) => {
    if (data.status === 'Pending') {
      setFormTitle('Edit Purchase Request');
      setFormMode('edit');
      setLoading(true);
      const itemData = listData.find((item) => item.id === data.id);
      dispatch(listItemSummary({ company, message })).then((response) => {
        const inputData = loadDataForUpdate(itemData, response.payload.data);
        setFormData(inputData);
        history.push(`${path}/${data.id}`);
      });
    } else {
      message.error('This action may only be performed on pending purchase requests.');
    }
  };

  const handleDelete = (data) => {
    setLoading(true);
    dispatch(deletePR(data.id)).then(() => {
      dispatch(listPR({ company, message })).then((response) => {
        const onSuccess = () => {
          setLoading(false);
          message.success(`Successfully deleted Purchase Request ${data.number}`);
        }

        const onFail = () => {
          setLoading(false);
          message.error(`Unable to delete Purchase Request`);
        }

        handleRequestResponse([response], onSuccess, onFail, '');
      });
    });
  };
  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setSelectedData(data);
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

  
  const handleCancel = () => {
    setDisplayCancelModal(true)
  };

  const onCancelPR = () => {
    dispatch(cancelPR({ id: selectedData.id, remarks: remarks })).then(() => {
      closeModal();
      dispatch(listPR({ company, message })).then(() => {});
    });

  }

  const handleCancelRemarks = (data) => {
    setRemarks(data)
  }

  const onSubmit = (data) => {
    const payload = processDataForSubmission(data, company);

    if (formMode === 'edit') {
      payload.id = formData.id;
    }

    dispatch(addPR(payload)).then((response) => {
      if (response.payload.status === 200) {
        message.success(`Successfully saved ${response.payload.data.number}`);
        dispatch(listPR({ company, message })).then(() => {
          history.goBack();
          setLoading(false);
        });
      } else {
        setLoading(false);
        if (formMode === 'add') {
          message.error(
            `Unable to add Purchase Request. Please double check the provided information.`
          );
        } else {
          message.error(`Something went wrong. Unable to update ${data.number}.`);
        }
      }
    });
  };

  const handleCancelButton = () => {
    setFormData(null);
    setLoading(false);
  };

  const closeModal = () => {
    setDisplayCancelModal(false);
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
            {actions.includes('create') && (
              <Button
                style={{ float: 'right', marginRight: '1%' }}
                icon={<PlusOutlined />}
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
                data={listData}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                updateEnabled={actions.includes('update')}
                deleteEnabled={actions.includes('delete')}
              />
            </Col>
          )}
        </Row>
        <Modal
          visible={displayCancelModal}
          title={`Cancel ${selectedData?.number ?? ''}`}
          onOk={() => {
            onCancelPR()
          }}
          onCancel={() => {
            closeModal()
          }}
        >
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Text>{'Remarks (Reason for cancellation): '}</Text>
            <TextArea 
              rows={3} 
              maxLength={200} 
              placeholder={`Please indicate the reason for cancellation`} 
              onChange={(e) => handleCancelRemarks(e.target.value)}
              defaultValue={selectedData?.remarks ?? ''}
            />
          </Space>
        </Modal>
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
              <ItemDescription
                title={`Purchase Request ${selectedData.number} Details`}
                selectedData={selectedData}
                formItems={formDetails.form_items}
              />
              <Text>{'Requested Items: '}</Text>
              <Table
                dataSource={selectedData !== null ? selectedData.requestedItems : []}
                columns={itemColumns}
                pagination={false}
                locale={{ emptyText: <Empty description="No Item Seleted." /> }}
              />
              {(selectedData.status === 'Pending' || selectedData.status === 'Approved') && ( // add approval permissions here
                <>
                  <Text>{'Actions: '}</Text>
                  {selectedData.status === 'Pending' ? (
                    <Space>
                      <Popconfirm
                        title="Would you like to perform this action?"
                        icon={<QuestionCircleOutlined />}
                        onConfirm={(e) => {
                          handleApprove(selectedData);
                        }}
                        onCancel={(e) => {
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          style={{ backgroundColor: '#3fc380', marginRight: '1%' }}
                          icon={<CheckOutlined />}
                          type="primary"
                        >
                          Approve
                        </Button>
                      </Popconfirm>
                      
                      <Popconfirm
                        title="Would you like to perform this action?"
                        icon={<QuestionCircleOutlined />}
                        onConfirm={(e) => {
                          handleReject(selectedData);
                        }}
                        onCancel={(e) => {
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          style={{ marginRight: '1%' }}
                          icon={<CloseOutlined />}
                          type="primary"
                          danger
                        >
                          Reject
                        </Button>
                      </Popconfirm>
                      
                      
                    </Space>
                  ):(
                    <Space>
                      <Button
                        style={{ marginRight: '1%' }}
                        icon={<CloseOutlined />}
                        onClick={(e) => {
                          handleCancel();
                        }}
                        type="primary"
                        danger
                      >
                        Cancel
                      </Button>
                    </Space>
                  )}
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
