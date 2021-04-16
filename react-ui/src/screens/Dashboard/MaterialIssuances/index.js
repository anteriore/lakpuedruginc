import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, Space, Table, Empty, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import {
  listMaterialIssuance,
  addMaterialIssuance,
  clearData,
} from './redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';
import { listInventoryByStock, clearData as clearInventory } from '../Inventory/redux';
import FormScreen from '../../../components/forms/FormScreen';
import ItemDescription from '../../../components/ItemDescription';
import GeneralHelper, {reevalutateMessageStatus, reevalDependencyMsgStats} from '../../../helpers/general-helper';

const { Title, Text } = Typography;

const MaterialIssuances = (props) => {
  const { title } = props;
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const { list, status, statusLevel, statusMessage, action } = useSelector((state) => state.dashboard.materialIssuances);
  const {
    status: statusInventory, action: actionInventory, 
    statusLevel: statusLevelInventory, statusMessage: statusMessageInventory 
  } = useSelector(state => state.dashboard.inventory);
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
  const { handleRequestResponse } = GeneralHelper();
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearDepot());
    dispatch(clearInventory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listMaterialIssuance({ company, message })).then(() => {
      if (isMounted.current){
        setFormData(null);
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

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusDepot,
      statusMessage: statusMessageDepot,
      action: actionDepot, 
      statusLevel: statusLevelDepot,
      module: title
    })
  }, [
    actionDepot, statusMessageDepot, 
    statusDepot, statusLevelDepot, title
  ]);

  const handleAdd = () => {
    setFormTitle('Create Material Issuance');
    setFormData(null);
    setLoading(true);
    dispatch(listDepot({ company })).then((response1) => {
      dispatch(listInventoryByStock({ company })).then((response2) => {
        if(isMounted.current){
          const onSuccess = () => {
            history.push(`${path}/new`);
            setLoading(false);
          }
          handleRequestResponse([response1, response2], onSuccess, null, '');
        }
      });
    });
  };

  const handleUpdate = () => {};

  const handleDelete = () => {
    /*if (data.status === 'Pending') {
      dispatch(deleteMaterialIssuance(data.id)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listMaterialIssuance({ company, message })).then(() => {
            setLoading(false);
            message.success(`Successfully deleted ${data.misNo}`);
          });
        } else {
          setLoading(false);
          message.error(`Unable to delete ${data.misNo}`);
        }
      });
    } else {
      message.error('This action can only be performed on pending material issuances.');
    }*/
  };

  const handleRetrieve = (data) => {
    setSelectedData(data);
    setDisplayModal(true);
  };

  const onSubmit = async (data) => {
    const inventoryList = [];
    data.inventoryList.forEach((inventory) => {
      inventoryList.push({
        item: {
          id: inventory.item.id,
        },
        quantity: inventory.quantity,
        controlNumber: inventory.controlNumber,
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
      inventoryList,
    };
    await dispatch(addMaterialIssuance(payload)).then((response) => {
      setLoading(true);
      const onSuccess = () => {
        history.goBack();
        dispatch(listMaterialIssuance({ company, message })).then(() => {
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
              {title}
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
                  title={`${selectedData.misNo} Details`}
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
              </Space>
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default MaterialIssuances;
