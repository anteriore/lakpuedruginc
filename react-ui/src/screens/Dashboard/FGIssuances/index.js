import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, Space, Table, Popconfirm, Empty, message } from 'antd';
import { PlusOutlined, CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import { listFGIssuance, addFGIssuance, cancelFGIssuance, clearData } from './redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';
import FormScreen from '../../../components/forms/FormScreen';
import ItemDescription from '../../../components/ItemDescription';
import GeneralHelper, {reevalutateMessageStatus, reevalDependencyMsgStats} from '../../../helpers/general-helper';


const { Title, Text } = Typography;

const FGIssuances = (props) => {
  const { handleRequestResponse } = GeneralHelper();
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const { list, status, statusLevel, statusMessage, action } = useSelector((state) => state.dashboard.FGIssuances);
  const { 
    status: statusDepot, statusLevel: statusLevelDepot, 
    statusMessage: statusMessageDepot, action: actionDepot
  } = useSelector((state) => state.maintenance.depots)
  const user = useSelector((state) => state.auth.user);

  const { company, actions } = props;
  const { formDetails, tableDetails } = FormDetails();

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearDepot());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listFGIssuance({ company, message })).then(() => {
      if (isMounted.current){
        setLoading(false);
      }
    });

    return function cleanup() {
      isMounted.current = false
      performCleanup();
    };
  }, [dispatch, company, performCleanup]);

  useEffect(() => {
    reevalutateMessageStatus({status, action, statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusDepot,
      statusMessage: statusMessageDepot,
      action: actionDepot, 
      statusLevel: statusLevelDepot,
      module: "Depot"
    })
  }, [
    actionDepot, statusMessageDepot, 
    statusDepot, statusLevelDepot
  ]);

  const handleAdd = () => {
    setFormTitle('Create FG Issuance');
    setFormData(null);
    setLoading(true);
    dispatch(listDepot({ company, message })).then((response) => {
        const onSuccess = () => {
          history.push(`${path}/new`);
          setLoading(false);
        }

        const onFail = () => {
          setLoading(false);
        }
        handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleUpdate = () => {};

  const handleDelete = () => {};

  const handleRetrieve = (data) => {
    setSelectedData(data);
    setDisplayModal(true);
  };

  const handleCancel = (data) => {
    setLoading(true);
    dispatch(cancelFGIssuance(data)).then((response) => {
      const onSuccess = () => {
        setDisplayModal(false);
        setSelectedData(null);
        dispatch(listFGIssuance({ company, message })).then(() => {
          setLoading(false);
        });
      };

      const onFail = () => {
        setDisplayModal(false);
        setSelectedData(null);
        setLoading(false);
      }
      handleRequestResponse([response], onSuccess, onFail, '');
    })
  };

  const onSubmit = async (data) => {
    const inventoryList = [];
    data.inventoryList.forEach((inventory) => {
      inventoryList.push({
        product: {
          id: inventory.product.id,
        },
        quantity: inventory.quantity,
      });
    });
    const payload = {
      ...data,
      company: {
        id: company,
      },
      fromDepot: {
        id: data.fromDepot,
      },
      toDepot: {
        id: data.toDepot,
      },
      requestedBy: {
        id: user.id,
      },
      inventoryList,
    };
    await dispatch(addFGIssuance(payload)).then((response) => {
      setLoading(true);
      const onSuccess = () => {
        history.goBack();
        dispatch(listFGIssuance({ company, message })).then(() => {
          setLoading(false);
        });
      };

      const onFail = () => {
        setLoading(false);
      }
      handleRequestResponse([response], onSuccess, onFail, '');
    });
    setFormData(null);
    return 1
  };

  return (
    <Switch>
      <Route exact path={`${path}/new`}>
        <FormScreen
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={() => {
            setFormData(null);
          }}
          formDetails={formDetails}
          formTable={tableDetails}
        />
      </Route>
      <Route path={`${path}/:id`}>
        <FormScreen
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={() => {
            setFormData(null);
          }}
          formDetails={formDetails}
          formTable={tableDetails}
        />
      </Route>
      <Route>
        <Row>
          <Col span={20}>
            <Title level={3} style={{ float: 'left' }}>
              {props.title}
            </Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={20}>
            {actions.includes('create') && (
              <Button
                style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
                icon={<PlusOutlined />}
                onClick={() => {
                  handleAdd();
                }}
                loading={loading}
              >
                Add
              </Button>
            )}
            {loading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={columns}
                data={list}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                updateEnabled={false}
                deleteEnabled={false}
              />
            )}
          </Col>
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
              <Space direction="vertical" size={20} style={{ width: '100%' }}>
                <ItemDescription
                  title={`${selectedData.pisNo} Details`}
                  selectedData={selectedData}
                  formItems={formDetails.form_items}
                />
                <Text>{'Issued Items: '}</Text>
                <Table
                  dataSource={
                    selectedData[tableDetails.name] !== null &&
                    typeof selectedData[tableDetails.name] !== 'undefined'
                      ? selectedData[tableDetails.name]
                      : []
                  }
                  columns={tableDetails.renderTableColumns(tableDetails.fields)}
                  pagination={false}
                  locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                />
                {selectedData.status === 'Pending' && ( // add approval permissions here
                <>
                  <Text>{'Actions: '}</Text>
                  <Space>
                    <Popconfirm
                      title="Would you like to perform this action?"
                      icon={<QuestionCircleOutlined />}
                      onConfirm={(e) => {
                        handleCancel(selectedData)
                      }}
                      onCancel={(e) => {
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        style={{ marginRight: '1%' }}
                        icon={<CloseOutlined />}
                        onClick={(e) => {
                        }}
                        type="primary"
                        danger
                      >
                        Cancel
                      </Button>
                    </Popconfirm>
                  </Space>
                </>
              )}
              </Space>
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default FGIssuances;
