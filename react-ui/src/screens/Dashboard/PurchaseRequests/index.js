import React, { useState, useEffect, useCallback, useRef } from 'react';
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

import { listPR, cancelPR, addPR, deletePR, approvePR, rejectPR, clearData, updatePR } from './redux';
import { listD, clearData as clearDepartment } from '../../Maintenance/DepartmentArea/redux';
import { listItemSummary, clearData as clearItem } from '../../Maintenance/Items/redux';
import { DisplayDetails, FormDetails } from './data';
import { processDataForSubmission, loadDataForUpdate } from './helpers';
import InputForm from './InputForm';
import TableDisplay from '../../../components/TableDisplay';
import ItemDescription from '../../../components/ItemDescription';
import GeneralHelper, {reevalutateMessageStatus} from '../../../helpers/general-helper';

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

  const {list, status, statusLevel, statusMessage, action} = useSelector((state) => state.dashboard.purchaseRequests);

  const { company, title, actions } = props;
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleRequestResponse } = GeneralHelper();
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearItem());
    dispatch(clearDepartment());
  }, [dispatch])

  useEffect(() => {
    dispatch(listPR({ company, message })).then(() => {
      dispatch(listD({ company, message })).then(() => {
        if(isMounted.current){
          setLoading(false);
        }
      });
    });

    return function cleanup() {
      isMounted.current = false;
      performCleanup()
    };
  }, [dispatch, company, performCleanup]);

  useEffect(() => {
    reevalutateMessageStatus({status, action, statusMessage, statusLevel})
  },[status, action, statusMessage, statusLevel]);

  const handleAdd = () => {
    setFormTitle('Create Purchase Request');
    setFormMode('add');
    setFormData(null);
    history.push(`${path}/new`);
  };

  const handleUpdate = (data) => {
      setFormTitle('Edit Purchase Request');
      setFormMode('edit');
      setLoading(true);
      const itemData = list.find((item) => item.id === data.id);
      dispatch(listItemSummary({ company, message })).then((response) => {
        if(isMounted.current){
          const onSuccess = () => {
            const inputData = loadDataForUpdate(itemData, response.payload.data);
            setFormData(inputData);
            history.push(`${path}/${data.id}`);
          }
          const onFail = () => {
            setLoading(false);
          }
          handleRequestResponse([response], onSuccess, onFail, '');
        }
      });
  };

  const handleDelete = (data) => {
    setLoading(true);
    dispatch(deletePR(data.id)).then((response) => {
      const onSuccess = () => {
        dispatch(listPR({ company, message })).then(() => {
          setLoading(false);
        });
      }
      const onFail = () => {
        setLoading(false);
      }

      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setSelectedData(data);
  };

  const handleApprove = (data) => {
    setLoading(true);
    dispatch(approvePR({ id: data.id })).then((response) => {
      const onSuccess = () => {
        closeModal();
        dispatch(listPR({ company, message })).then(() => {
          setLoading(false);
        });
      }
      const onFail = () => {
        setLoading(false);
      }

      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleReject = (data) => {
    setLoading(true);
    dispatch(rejectPR({ id: data.id })).then((response) => {
      const onSuccess = () => {
        closeModal();
        dispatch(listPR({ company, message })).then(() => {
          setLoading(false);
        });
      }
      const onFail = () => {
        setLoading(false);
      }

      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  
  const handleCancel = () => {
    setDisplayCancelModal(true)
  };

  const onCancelPR = () => {
    dispatch(cancelPR({ id: selectedData.id, remarks: remarks })).then((response) => {
      const onSuccess = () => {
        closeModal();
        dispatch(listPR({ company, message })).then(() => {
          setLoading(false);
        });
      }
      const onFail = () => {
        setLoading(false);
      }

      handleRequestResponse([response], onSuccess, onFail, '');
    });

  }

  const handleCancelRemarks = (data) => {
    setRemarks(data)
  }

  const onSubmit = async (data) => {
    const payload = processDataForSubmission(data, company);

    if (formMode === 'edit') {
      payload.id = formData.id;
      await dispatch(updatePR(payload)).then((response) => {
        setLoading(true);
        const onSuccess = () => {
          history.goBack();
          dispatch(listPR({ company, message })).then(() => {
            setLoading(false);
          });
        }
        const onFail = () => {
          setLoading(false);
        }
  
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    }else {
      await dispatch(addPR(payload)).then((response) => {
        setLoading(true);
        const onSuccess = () => {
          history.goBack();
          dispatch(listPR({ company, message })).then(() => {
            setLoading(false);
          });
        }
        const onFail = () => {
          setLoading(false);
        }
  
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    }
    return 1
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
                data={list}
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
