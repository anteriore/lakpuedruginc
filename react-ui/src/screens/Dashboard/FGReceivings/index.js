import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, Space, Table, Empty, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import GeneralHelper, {reevalutateMessageStatus, reevalDependencyMsgStats} from '../../../helpers/general-helper';
import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import { listFGReceiving, addFGReceiving, clearData } from './redux';
import { clearData as clearFGIS } from '../FGIssuances/redux';
import { listDepotByCompany, clearData as clearDepot } from '../../Maintenance/Depots/redux';
import InputForm from './InputForm';
import ItemDescription from '../../../components/ItemDescription';

const { Title, Text } = Typography;

const FGReceivings = (props) => {
  const { handleRequestResponse } = GeneralHelper();
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const {
    list, status, statusLevel, 
    statusMessage, action
  } = useSelector((state) => state.dashboard.FGReceivings);

  const { 
    status: statusFGI, statusLevel: statusLevelFGI,  
    statusMessage: statusMessageFGI, action: actionFGI
  } = useSelector(state => state.dashboard.FGIssuances);

  const { 
    status: statusDepot, action: actionDepot,  
    statusLevel: statusLevelDepot, statusMessage: statusMessageDepot
  } = useSelector(state => state.maintenance.depots);

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
    dispatch(clearFGIS());
  }, [dispatch])

  useEffect(() => {
    dispatch(listFGReceiving({ company, message })).then(() => {
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
      status: statusFGI,
      statusMessage: statusMessageFGI,
      action: actionFGI, 
      statusLevel: statusLevelFGI,
      module: 'FG Issuance'
    })
  }, [
    actionFGI, statusMessageFGI, 
    statusFGI, statusLevelFGI
  ]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusDepot,
      statusMessage: statusMessageDepot,
      action: actionDepot, 
      statusLevel: statusLevelDepot,
      module: 'Depot'
    })
  }, [
    actionDepot, statusMessageDepot, 
    statusDepot, statusLevelDepot
  ]);

  const handleAdd = () => {
    setFormTitle('Create FG Receiving Slip');
    setFormData(null);
    setLoading(true);
    dispatch(listDepotByCompany({ company })).then((response) => {
      const onSuccess = () => {
        dispatch(clearFGIS());
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

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      company: {
        id: company,
      },
      depot: {
        id: data.depot,
      },
      receivedBy: {
        id: user.id,
      },
      pis: {
        id: data.pis.id,
      },
    };
    await dispatch(addFGReceiving(payload)).then((response) => {
      setLoading(true);
      const onSuccess = () => {
        history.goBack();
        dispatch(listFGReceiving({ company, message })).then(() => {
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
                  title={`${selectedData.prsNo} Details`}
                  selectedData={selectedData}
                  formItems={formDetails.form_items}
                />
                <Text>{'Received Items: '}</Text>
                <Table
                  dataSource={selectedData.pis.inventoryList}
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

export default FGReceivings;
