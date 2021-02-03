import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Typography,
  Button,
  Skeleton,
  Descriptions,
  Modal,
  Table,
  Empty,
  Space,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
import FormDetails, { columns } from './data';

import TableDisplay from '../../../components/TableDisplay';
import InputForm from './InputForm';

import { listReturnSlip, addReturnSlip, deleteReturnSlip, clearData } from './redux';
import { listClient, clearData as clearClient } from '../../Maintenance/Clients/redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';
import {
  clearData as clearPI,
  listProductInventory,
} from '../../Maintenance/redux/productInventory';
import { listOrderSlipsByDepot, clearData as clearOS } from '../OrderSlips/redux';

const { Title, Text } = Typography;

const ReturnSlips = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { company, title } = props;

  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const { formDetails, tableDetails } = FormDetails();

  const listData = useSelector((state) => state.sales.returnSlips.list);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(listReturnSlip({ company, message })).then(() => {
      setLoading(false);
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearClient());
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create Return Slip');
    setFormMode('add');
    setFormData(null);
    setLoading(true);
    dispatch(clearOS());
    dispatch(listClient({ company, message })).then(() => {
      dispatch(listDepot({ company, message })).then(() => {
        dispatch(listProductInventory({ company, message })).then(() => {
          history.push(`${path}/new`);
          setLoading(false);
        });
      });
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Update Return Slip');
    setFormMode('edit');
    const itemData = listData.find((item) => item.id === data.id);
    const formData = {
      ...itemData,
      date: moment(new Date(data.date)) || moment(),
      client: itemData.client !== null ? itemData.client.id : null,
      depot: itemData.depot !== null ? itemData.depot.id : null,
    };
    setFormData(formData);
    setLoading(true);
    dispatch(
      listOrderSlipsByDepot({ message, depot: itemData.depot !== null ? itemData.depot.id : null })
    ).then(() => {
      dispatch(listClient({ company, message })).then(() => {
        dispatch(listDepot({ company, message })).then(() => {
          dispatch(listProductInventory({ company, message })).then(() => {
            history.push(`${path}/${data.id}`);
            setLoading(false);
          });
        });
      });
    });
  };

  const handleDelete = (data) => {
    dispatch(deleteReturnSlip(data.id)).then((response) => {
      setLoading(true);
      if (response.payload.status === 200) {
        dispatch(listReturnSlip({ company, message })).then(() => {
          setLoading(false);
          message.success(`Successfully deleted ${data.number}`);
        });
      } else {
        setLoading(false);
        message.error(`Unable to delete ${data.number}`);
      }
    });
  };

  const handleRetrieve = (data) => {
    setSelectedData(data);
    setDisplayModal(true);
  };

  const onSubmit = (data) => {
    // TODO: Data Validation
    const products = [];
    data.returnSlipProducts.forEach((returnSlipProduct) => {
      products.push({
        product: {
          id: returnSlipProduct.product.id,
        },
        goodQuantity: returnSlipProduct.goodQuantity || 0,
        badQuantity: returnSlipProduct.badQuantity || 0,
        unitPrice: returnSlipProduct.unitPrice,
      });
    });
    const payload = {
      ...data,
      company: {
        id: company,
      },
      depot: {
        id: data.depot,
      },
      client: {
        id: data.client,
      },
      returnSlipProducts: products,
    };
    if (formMode === 'edit') {
      payload.id = formData.id;
      dispatch(addReturnSlip(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listReturnSlip({ company, message })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully updated ${data.number}`);
          });
        } else {
          setLoading(false);
          message.error(`Unable to update ${data.number}`);
        }
      });
    } else if (formMode === 'add') {
      dispatch(addReturnSlip(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listReturnSlip({ company, message })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully added ${response.payload.data.number}`);
          });
        } else {
          setLoading(false);
          message.error(`Unable to add Return Slip. Please double check the provided information.`);
        }
      });
    }
    setFormData(null);
  };

  const renderTableColumns = (fields) => {
    const columns = [];
    fields.forEach((field) => {
      if (typeof field.render === 'undefined' || field.render === null) {
        field.render = (object) => object[field.name];
      }
      columns.push({
        title: field.label,
        key: field.name,
        render: (object) => field.render(object),
      });
    });

    return columns;
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
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
              {title}
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
                <Descriptions
                  bordered
                  title={`Return Slip ${selectedData.number}`}
                  size="default"
                  layout="vertical"
                >
                  {formDetails.form_items.map((item) => {
                    if (!item.writeOnly) {
                      if (selectedData[item.name] === null && item.toggle) {
                        return null;
                      }
                      if (item.type === 'select' || item.type === 'selectSearch') {
                        const itemData = selectedData[item.name];
                        return (
                          <Descriptions.Item label={item.label}>
                            {itemData[item.selectName]}
                          </Descriptions.Item>
                        );
                      }
                      if (item.type === 'date') {
                        return (
                          <Descriptions.Item label={item.label}>
                            {moment(new Date(selectedData[item.name])).format('DD/MM/YYYY')}
                          </Descriptions.Item>
                        );
                      }
                      if (item.type === 'list') {
                        return null;
                      }

                      return (
                        <Descriptions.Item label={item.label}>
                          {selectedData[item.name]}
                        </Descriptions.Item>
                      );
                    }

                    return null;
                  })}
                  {formDetails.rs_items.map((item) => {
                    if (!item.writeOnly) {
                      if (selectedData[item.name] === null && item.toggle) {
                        return null;
                      }
                      if (item.type === 'select' || item.type === 'selectSearch') {
                        const itemData = selectedData[item.name];
                        return (
                          <Descriptions.Item label={item.label}>
                            {itemData[item.selectName]}
                          </Descriptions.Item>
                        );
                      }
                      if (item.type === 'date') {
                        return (
                          <Descriptions.Item label={item.label}>
                            {moment(new Date(selectedData[item.name])).format('DD/MM/YYYY')}
                          </Descriptions.Item>
                        );
                      }
                      if (item.type === 'list') {
                        return null;
                      }

                      return (
                        <Descriptions.Item label={item.label}>
                          {selectedData[item.name]}
                        </Descriptions.Item>
                      );
                    }

                    return null;
                  })}
                </Descriptions>
                <Text>{'Return Slip Items: '}</Text>
                <Table
                  dataSource={
                    selectedData[tableDetails.name] !== null &&
                    typeof selectedData[tableDetails.name] !== 'undefined'
                      ? selectedData[tableDetails.name]
                      : []
                  }
                  columns={renderTableColumns(tableDetails.fields)}
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

export default ReturnSlips;
