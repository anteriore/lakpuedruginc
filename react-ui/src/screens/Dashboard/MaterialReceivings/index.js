import React, { useState, useEffect } from 'react';
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

const { Title, Text } = Typography;

const MaterialReceivings = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const listData = useSelector((state) => state.dashboard.materialReceivings.list);
  const user = useSelector((state) => state.auth.user);

  const { company } = props;
  const { formDetails, tableDetails } = FormDetails();

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listMaterialReceiving({ company, message })).then(() => {
      setLoading(false);

      if (isCancelled) {
        dispatch(clearData());
        dispatch(clearMaterialIssuance());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearMaterialIssuance());
      isCancelled = true;
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create Material Receiving');
    setFormMode('add');
    setFormData(null);
    setLoading(true);
    dispatch(listMaterialIssuanceByStatus({ status: 'Pending', message })).then((response) => {
      if (response.payload.data === null || response.payload.data.length === 0) {
        message.error('There are currently no pending material issuance slips to be received.');
      } else {
        history.push(`${path}/new`);
      }
      setLoading(false);
    });
  };

  const handleUpdate = (data) => {};

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

  const onSubmit = (data) => {
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
    if (formMode === 'edit') {
      payload.id = formData.id;
      dispatch(addMaterialReceiving(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listMaterialReceiving({ company, message })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully updated ${data.mrsNo}`);
          });
        } else {
          setLoading(false);
          message.error(`Unable to update ${data.mrsNo}`);
        }
      });
    } else if (formMode === 'add') {
      dispatch(addMaterialReceiving(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listMaterialReceiving({ company, message })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully added ${response.payload.data.mrsNo}`);
          });
        } else {
          setLoading(false);
          message.error(
            `Unable to create Material Issuance. Please double check the provided information.`
          );
        }
      });
    }
    setFormData(null);
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
