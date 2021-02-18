import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Skeleton,
  Typography, 
  Button,
  Modal,
  Space,
  Table,
  Empty,
  message,  
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import { listMaterialIssuance, addMaterialIssuance, deleteMaterialIssuance, clearData } from './redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';
import { listInventory, clearData as clearInventory } from '../Inventory/redux';
import FormScreen from '../../../components/forms/FormScreen';
import ItemDescription from '../../../components/ItemDescription';

const { Title, Text } = Typography;

const MaterialIssuances = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const listData = useSelector((state) => state.dashboard.materialIssuances.list);
  const user = useSelector((state) => state.auth.user);

  const { company } = props;
  const { formDetails, tableDetails } = FormDetails();

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  

  useEffect(() => {
    let isCancelled = false;
    dispatch(listMaterialIssuance({ company, message })).then(() => {
      setLoading(false);

      if (isCancelled) {
        dispatch(clearData());
        dispatch(clearDepot());
        dispatch(clearInventory());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearInventory());
      isCancelled = true;
    };
  }, [dispatch, company]);
  
  const handleAdd = () => {
    setFormTitle('Create Material Issuance');
    setFormMode('add');
    setFormData(null);
    setLoading(true);
    dispatch(listDepot({ company, message })).then(() => {
      dispatch(listInventory({ company, message })).then(() => {
        history.push(`${path}/new`);
        setLoading(false);
      })
    });
  };

  const handleUpdate = (data) => {
  };

  const handleDelete = (data) => {
    if(data.status === "Pending"){
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
    }
    else {
      message.error("This action can only be performed on pending material issuances.")
    }
  };

  const handleRetrieve = (data) => {
    setSelectedData(data);
    setDisplayModal(true);
  };

  const onSubmit = (data) => {
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
      inventoryList: inventoryList
    };
    if (formMode === 'edit') {
      payload.id = formData.id;
      dispatch(addMaterialIssuance(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listMaterialIssuance({ company, message })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully updated ${data.misNo}`);
          });
        } else {
          setLoading(false);
          message.error(`Unable to update ${data.misNo}`);
        }
      });
    } else if (formMode === 'add') {
      dispatch(addMaterialIssuance(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listMaterialIssuance({ company, message })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully added ${response.payload.data.misNo}`);
          });
        } else {
          setLoading(false);
          message.error(`Unable to create Material Issuance. Please double check the provided information.`);
        }
      });
    }
    setFormData(null);
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
            {loading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={columns}
                data={listData}
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
