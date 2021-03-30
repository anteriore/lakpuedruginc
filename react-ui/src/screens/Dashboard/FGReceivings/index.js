import React, { useState, useEffect } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, Space, Table, Empty, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import { listFGReceiving, addFGReceiving, clearData } from './redux';
import { clearData as clearFGIS } from '../FGIssuances/redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';
import InputForm from './InputForm';
import ItemDescription from '../../../components/ItemDescription';

const { Title, Text } = Typography;

const FGReceivings = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const listData = useSelector((state) => state.dashboard.FGReceivings.list);
  const user = useSelector((state) => state.auth.user);

  const { company } = props;
  const { formDetails, tableDetails } = FormDetails();

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listFGReceiving({ company, message })).then(() => {
      setLoading(false);

      if (isCancelled) {
        dispatch(clearData());
        dispatch(clearDepot());
        dispatch(clearFGIS());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearFGIS());
      isCancelled = true;
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create FG Receiving Slip');
    setFormMode('add');
    setFormData(null);
    setLoading(true);
    dispatch(listDepot({ company, message })).then(() => {
      dispatch(clearFGIS());
      history.push(`${path}/new`);
      setLoading(false);
    });
  };

  const handleUpdate = (data) => {};

  const handleDelete = (data) => {};

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
      if (response.payload.status === 200) {
        history.goBack();
        message.success(`Successfully added ${response.payload.data.prsNo}`);
        dispatch(listFGReceiving({ company, message })).then(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
        message.error(
          `Unable to create FG Receiving. Please double check the provided information.`
        );
      }
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
