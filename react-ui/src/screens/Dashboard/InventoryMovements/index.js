import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, Space, Table, Empty, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import { listInventoryMovement, addInventoryMovement, clearData } from './redux';
import { listInventory, clearData as clearInventory } from '../Inventory/redux';
import InputForm from './InputForm';
import ItemDescription from '../../../components/ItemDescription';
import GeneralHelper, {reevalutateMessageStatus, reevalDependencyMsgStats} from '../../../helpers/general-helper';

const { Title, Text } = Typography;

const InventoryMovements = (props) => {
  const {title} = props
  const { handleRequestResponse } = GeneralHelper();
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const {
    list, status, statusLevel, 
    statusMessage, action
  } = useSelector((state) => state.dashboard.inventoryMovements);
  const {
    status: statusInventory, statusLevel: statusLevelInventory, 
    statusMessage: statusMessageInventory, action: actionInventory
  } = useSelector((state) => state.dashboard.inventory)
  const user = useSelector((state) => state.auth.user);

  const { company, actions } = props;
  const { formDetails, tableDetails } = FormDetails();

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearInventory());
  },[dispatch])

  useEffect(() => {
    dispatch(listInventoryMovement({ company, message })).then(() => {
      if (isMounted.current){
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
    reevalutateMessageStatus({status, action, statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusInventory,
      statusMessage: statusMessageInventory,
      action: actionInventory, 
      statusLevel: statusLevelInventory,
      module: title
    })
  }, [
    actionInventory, statusMessageInventory, 
    statusInventory, statusLevelInventory, title
  ]);

  const handleAdd = () => {
    setFormTitle('Create Inventory Movement Slip');
    setFormData(null);
    setLoading(true);
    dispatch(listInventory({ company, message })).then((response) => {
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

  const onSubmit = async (data) => {
    const inventory = [];

    data.inventory.forEach((item) => {
      inventory.push({
        controlNumber: item.controlNumber,
        item: {
          id: item.item.id,
        },
        quantity: item.quantity,
      });
    });
    const payload = {
      ...data,
      company: {
        id: company,
      },
      requestedBy: {
        id: user.id,
      },
      inventory,
    };
    
    await dispatch(addInventoryMovement(payload)).then((response) => {
      setLoading(true);
      const onSuccess = () => {
        history.goBack();
        dispatch(listInventoryMovement({ company, message })).then(() => {
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
                  title={`${selectedData.number} Details`}
                  selectedData={{
                    ...selectedData,
                    classification: {
                      name: selectedData.classification
                    }
                  }}
                  formItems={formDetails.form_items}
                />
                <Text>{'Items: '}</Text>
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
              </Space>
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default InventoryMovements;
