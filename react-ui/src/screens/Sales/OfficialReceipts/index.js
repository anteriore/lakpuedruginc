import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Skeleton, Descriptions, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
import FormDetails, { columns } from './data';

import TableDisplay from '../../../components/TableDisplay';
import InputForm from './InputForm';

import { listOReceipt, addOReceipt, deleteOReceipt, clearData } from './redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';

const { Title } = Typography;

const OfficialReceipts = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { company, title } = props;

  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedAR, setSelectedAR] = useState(null);
  const { formDetails } = FormDetails();

  const listData = useSelector((state) => state.sales.officialReceipts.list);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(listOReceipt({ company, message })).then(() => {
      setLoading(false);
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
    };

  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create Official Receipt');
    setFormMode('add');
    setFormData(null);
    setLoading(true);
    dispatch(listDepot({ company, message })).then(() => {
      history.push(`${path}/new`);
      setLoading(false);
    });
  };

  const handleUpdate = (data) => {
    message.error("Unable to perform action.")
    /*
    setFormTitle('Edit Official Receipt');
    setFormMode('edit');
    setLoading(true);
    const itemData = listData.find((item) => item.id === data.id);
    const formData = {
      ...itemData,
      date: moment(new Date(data.date)) || moment(),
      chequeDate: data.cutOffDate !== null ? moment(new Date(data.chequeDate)) : null,
      cutOffDate: data.cutOffDate !== null ? moment(new Date(data.cutOffDate)) : null,
      client: itemData.client !== null ? itemData.client.id : null,
      depot: itemData.depot !== null ? itemData.depot.id : null,
    };
    setFormData(formData);
    dispatch(listClient({ company, message })).then(() => {
        dispatch(listDepot({ company, message })).then(() => {
          dispatch(listOrderSlips({ company, message })).then(() => {
            history.push(`${path}/${data.id}`);
            setLoading(false);
          })
        })
    });
    */
  };

  const handleDelete = (data) => {
    dispatch(deleteOReceipt(data.id)).then((response) => {
      setLoading(true);
      if (response.payload.status === 200) {
        dispatch(listOReceipt({ company, message })).then(() => {
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
    setSelectedAR(data);
    setDisplayModal(true);
  };

  const onSubmit = (data) => {
    var payments = []
    data.payments.forEach((payment) => {
      payments.push({
        reference: {
          ...payment
        },
        appliedAmount: payment.appliedAmount
      })
    })

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
      preparedBy: {
        id: user.id
      },
      payments: payments
    };
    if (formMode === 'edit') {
      payload.id = formData.id;
      dispatch(addOReceipt(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listOReceipt({ company, message })).then(() => {
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
      dispatch(addOReceipt(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listOReceipt({ company, message })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully added ${response.payload.data.number}`);
          });
        } 
        else {
          setLoading(false);
          message.error(`Unable to add Official Receipt. Please double check the provided information.`);
        }
      });
    }
    setFormData(null);
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
          //formTable={tableDetails}
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
          //formTable={tableDetails}
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
              setSelectedAR(null);
            }}
            onCancel={() => {
              setDisplayModal(false);
              setSelectedAR(null);
            }}
            width={1000}
            cancelButtonProps={{ style: { display: 'none' } }}
          >
            {selectedAR === null ? (
              <Skeleton />
            ) : (
              <>
                <Descriptions
                  bordered
                  title={`${selectedAR.number} Details`}
                  size="default"
                  layout="vertical"
                >
                  {formDetails.form_items.map((item) => {
                    if (!item.writeOnly) {
                      if(selectedAR[item.name] === null && item.toggle){
                        return null
                      }
                      if (item.type === 'select' || item.type === 'selectSearch') {
                        const itemData = selectedAR[item.name];
                        return (
                          <Descriptions.Item label={item.label}>
                            {itemData[item.selectName]}
                          </Descriptions.Item>
                        );
                      }
                      if (item.type === 'date') {
                        return (
                          <Descriptions.Item label={item.label}>
                            {moment(new Date(selectedAR[item.name])).format('DD/MM/YYYY')}
                          </Descriptions.Item>
                        );
                      }
                      if (item.type === 'list') {
                        return null;
                      }

                      return (
                        <Descriptions.Item label={item.label}>
                          {selectedAR[item.name]}
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

export default OfficialReceipts;
