import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Typography, Button, message, Skeleton, Modal, Table, Empty, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns, itemColumns } from './data';
import { listClient, addClient, getClient, deleteClient, clearData, updateClient } from './redux';
import { listCluster, clearData as clearCluster } from '../ClusterCodes/redux';
import { listInstitution, clearData as clearInstitution } from '../InstitutionalCodes/redux';
import { listS, clearData as clearS } from '../SalesReps/redux';
import FormScreen from '../../../components/forms/FormScreen';
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';
import ItemDescription from '../../../components/ItemDescription';

const { Title, Text } = Typography;

const Clients = (props) => {
  const [loading, setLoading] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const [loadingItem, setLoadingItem] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayData, setDisplayData] = useState(null);

  const { company, actions } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { list: clients, statusMessage, action, status, statusLevel } = useSelector(
    (state) => state.maintenance.clients
  );
  const { formDetails } = FormDetails();
  const { handleRequestResponse } = GeneralHelper();
  const isMounted = useRef(true);

  useEffect(() => {
    dispatch(listClient({ company, message })).then(() => {
      if (isMounted.current) {
        setFormData(null);
        setLoading(false);
      }
    });

    return function cleanup() {
      isMounted.current = false;
      dispatch(clearData());
      dispatch(clearCluster());
      dispatch(clearInstitution());
      dispatch(clearS());
    };
  }, [dispatch, company]);

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  const handleAdd = () => {
    setFormTitle('Add Client');
    setFormMode('add');
    setFormData(null);
    setLoading(true);
    dispatch(listCluster()).then((response1) => {
      dispatch(listInstitution({ company, message })).then((response2) => {
        dispatch(listS({ company, message })).then((response3) => {
          if (isMounted.current) {
            const onSuccess = () => {
              history.push(`${path}/new`);
              setLoading(false);
            };
            const onFail = () => {
              setLoading(false);
            };
            handleRequestResponse([response1, response2, response3], onSuccess, onFail, '');
          }
        });
      });
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Edit Client');
    setFormMode('edit');
    const clientData = clients.find((client) => client.id === data.id);
    const formData = {
      ...clientData,
      salesRep: clientData.salesRep !== null ? clientData.salesRep.id : null,
      clusterCode: clientData.clusterCode !== null ? clientData.clusterCode.id : null,
      institutionalCode:
        clientData.institutionalCode !== null ? clientData.institutionalCode.id : null,
    };
    setFormData(formData);
    dispatch(listCluster()).then((response1) => {
      dispatch(listInstitution({ company, message })).then((response2) => {
        dispatch(listS({ company, message })).then((response3) => {
          if (isMounted.current) {
            const onSuccess = () => {
              history.push(`${path}/${data.id}`);
              setLoading(false);
            };
            const onFail = () => {
              setLoading(false);
            };
            handleRequestResponse([response1, response2, response3], onSuccess, onFail, '');
          }
        });
      });
    });
  };

  const handleDelete = (data) => {
    dispatch(deleteClient(data.id)).then((response) => {
      setLoading(true);
      const onSuccess = () => {
        dispatch(listClient({ company, message })).then(() => {
          setLoading(false);
        });
      };
      const onFail = () => {
        setLoading(false);
      };

      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleRetrieve = (data) => {
    setLoadingItem(true);
    dispatch(getClient({ id: data.id })).then((response) => {
      const onSuccess = () => {
        setDisplayModal(true);
        setDisplayData(response.payload.data);
        setLoadingItem(false);
      };
      const onFail = () => {
        setDisplayModal(false);
      };

      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleCancelButton = () => {
    setFormData(null);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      company: {
        id: company,
      },
      salesRep: {
        id: data.salesRep,
      },
      clusterCode: {
        id: data.clusterCode,
      },
      institutionalCode: {
        id: data.institutionalCode,
      },
    };
    if (formMode === 'edit') {
      payload.id = formData.id;

      await dispatch(updateClient(payload)).then((response) => {
        setLoading(true);
        const onSuccess = () => {
          history.goBack();
          dispatch(listClient({ company, message })).then(() => {
            setLoading(false);
          });
        };
        const onFail = () => {
          setLoading(false);
        };

        handleRequestResponse([response], onSuccess, onFail, '');
      });
    } else if (formMode === 'add') {
      await dispatch(addClient(payload)).then((response) => {
        setLoading(true);
        const onSuccess = () => {
          history.goBack();
          dispatch(listClient({ company, message })).then(() => {
            setLoading(false);
          });
        };
        const onFail = () => {
          setLoading(false);
        };

        handleRequestResponse([response], onSuccess, onFail, '');
      });
    }
    setFormData(null);
    return 1;
  };

  const closeModal = () => {
    setDisplayModal(false);
    setLoadingItem(true);
    setDisplayData(null);
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <FormScreen
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={handleCancelButton}
          formDetails={formDetails}
        />
      </Route>
      <Route path={`${path}/:id`}>
        <FormScreen
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={handleCancelButton}
          formDetails={formDetails}
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
                loading={loading}
                onClick={(e) => {
                  handleAdd();
                }}
              >
                Add
              </Button>
            )}
            {loading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={columns}
                data={clients}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                updateEnabled={actions.includes('update')}
                deleteEnabled={actions.includes('delete')}
              />
            )}
          </Col>
          <Modal
            title="Client Details"
            visible={displayModal}
            onOk={closeModal}
            onCancel={closeModal}
            width={1000}
            cancelButtonProps={{ style: { display: 'none' } }}
          >
            {loadingItem ? (
              <Skeleton />
            ) : (
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <ItemDescription
                  title={`${displayData.name}`}
                  selectedData={displayData}
                  formItems={formDetails.form_items}
                />
                <Text>{'Client References: '}</Text>
                <Table
                  dataSource={displayData !== null ? displayData.clientReferencesList : []}
                  columns={itemColumns}
                  pagination={false}
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No client references."
                      />
                    ),
                  }}
                />
              </Space>
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default Clients;
