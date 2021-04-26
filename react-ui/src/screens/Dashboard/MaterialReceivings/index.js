import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, Space, Table, Empty, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import {
  listMaterialReceiving,
  addMaterialReceiving,
  deleteMaterialReceiving,
  clearData,
} from './redux';
import {
  listMaterialIssuanceByStatus,
  clearData as clearMaterialIssuance,
} from '../MaterialIssuances/redux';
import InputForm from './InputForm';
import ItemDescription from '../../../components/ItemDescription';
import GeneralHelper, {
  reevalutateMessageStatus,
  reevalDependencyMsgStats,
} from '../../../helpers/general-helper';

const { Title, Text } = Typography;

const MaterialReceivings = (props) => {
  const { title } = props;
  const { handleRequestResponse } = GeneralHelper();
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const { list, status, statusLevel, statusMessage, action } = useSelector(
    (state) => state.dashboard.materialReceivings
  );

  const {
    status: statusMI,
    statusLevel: statusLevelMI,
    statusMessage: statusMessageMI,
    action: actionMI,
  } = useSelector((state) => state.dashboard.materialIssuances);

  const user = useSelector((state) => state.auth.user);

  const { company, actions } = props;
  const { formDetails, tableDetails } = FormDetails();

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearMaterialIssuance());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listMaterialReceiving({ company, message })).then(() => {
      if (isMounted.current) {
        setFormData(null);
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
      status: statusMI,
      statusMessage: statusMessageMI,
      action: actionMI,
      statusLevel: statusLevelMI,
      module: title,
    });
  }, [actionMI, statusMessageMI, statusMI, statusLevelMI, title]);

  const handleAdd = () => {
    setFormTitle('Create Material Receiving');
    setFormData(null);
    setLoading(true);
    dispatch(listMaterialIssuanceByStatus({ status: 'Pending', message })).then((response) => {
      if (isMounted.current) {
        const onSuccess = () => {
          history.push(`${path}/new`);
          setLoading(false);
        };

        const onFailed = () => {
          setLoading(false);
        };
        handleRequestResponse([response], onSuccess, onFailed, '');
      }
    });
  };

  const handleUpdate = () => {};

  const handleDelete = (data) => {
    if (data.status === 'Pending') {
      dispatch(deleteMaterialReceiving(data.id)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listMaterialReceiving({ company, message })).then(() => {
            setLoading(false);
            message.success(`Successfully deleted ${data.mrsNo}`);
          });
        } else {
          setLoading(false);
          message.error(`Unable to delete ${data.mrsNo}`);
        }
      });
    } else {
      message.error('This action can only be performed on pending material issuances.');
    }
  };

  const handleRetrieve = (data) => {
    setSelectedData(data);
    setDisplayModal(true);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      company: {
        id: company,
      },
      receivedBy: {
        id: user.id,
      },
      mis: {
        id: data.mis.id,
      },
    };

    await dispatch(addMaterialReceiving(payload)).then((response) => {
      setLoading(true);
      const onSuccess = () => {
        history.goBack();
        dispatch(listMaterialReceiving({ company, message })).then(() => {
          setLoading(false);
        });
      };

      const onFail = () => {
        setLoading(false);
      };
      handleRequestResponse([response], onSuccess, onFail, '');
    });

    setFormData(null);
    return 1;
  };

  return (
    <Switch>
      <Route exact path={`${path}/new`}>
        <InputForm
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
        <InputForm
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
                loading={loading}
                onClick={() => {
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
                  title={`${selectedData.mrsNo} Details`}
                  selectedData={selectedData}
                  formItems={formDetails.form_items}
                />
                <Text>{'Received Items: '}</Text>
                <Table
                  dataSource={selectedData.mis.inventoryList}
                  columns={tableDetails.renderTableColumns(tableDetails.fields)}
                  pagination={false}
                  locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                />
              </Space>
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default MaterialReceivings;
