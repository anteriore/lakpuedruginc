import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Skeleton, Descriptions, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
import FormDetails, { columns } from './data';

import TableDisplay from '../../../components/TableDisplay';
import FormScreen from '../../../components/forms/FormScreen';

import { listReturnSlip, addReturnSlip, deleteReturnSlip, clearData } from './redux';
import { listClient, clearData as clearClient } from '../../Maintenance/Clients/redux';

const { Title } = Typography;

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
    setFormTitle('Create Return Slips');
    setFormMode('add');
    setFormData(null);
    setLoading(true);
    dispatch(listClient({ company, message })).then(() => {
      history.push(`${path}/new`);
      setLoading(false);
    });
  };

  const handleUpdate = (data) => {
    message.error('Unable to perform action.');
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
    const payments = [];
    data.payments.forEach((payment) => {
      payments.push({
        reference: {
          ...payment,
        },
        appliedAmount: payment.appliedAmount,
      });
    });

    const payload = {
      ...data,
      company: {
        id: company,
      },
      payments,
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
          message.error(
            `Unable to add Return Slip. Please double check the provided information.`
          );
        }
      });
    }
    setFormData(null);
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
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
              <>
                <Descriptions
                  bordered
                  title={`${selectedData.number} Details`}
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
                </Descriptions>
              </>
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default ReturnSlips;
