import React, { useState, useEffect } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, Descriptions, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';

import TableDisplay from '../../../components/TableDisplay';
import { FormDetails, DisplayDetails } from './data';
//import FormScreen from '../../../components/forms/FormScreen';
import InputForm from './InputForm';

import { listDM, addDM, deleteDM, clearData } from './redux';
//import { listClient, clearData as clearClient } from '../../Maintenance/Clients/redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';
import { listMemo, clearData as clearMemo } from '../../Maintenance/MemoTypes/redux';
import { clearData as clearOS } from '../../Sales/OrderSlips/redux';
import { clearData as clearSI } from '../../Sales/SalesInvoice/redux';

const { Title } = Typography;

const DebitMemo = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { company, actions } = props;
  const { path } = useRouteMatch();

  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const [selectedData, setSelectedData] = useState(null);
  const dmList = useSelector((state) => state.accounting.debitMemo.list);
  const { formDetails } = FormDetails();
  const { columns } = DisplayDetails();


  useEffect(() => {
    let isCancelled = false;
    dispatch(listDM({ company, message })).then(() => {
      setLoading(false);
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearMemo());
      dispatch(clearOS());
      dispatch(clearSI());
      isCancelled = true;
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create Debit Memo');
    setFormMode('add');
    setFormData(null);
    setLoading(true)
    setSelectedData(null);
    dispatch(clearOS());
    dispatch(clearSI());
    dispatch(listDepot({ company, message })).then(() => {
      dispatch(listMemo({ company, message })).then(() => {
          history.push(`${path}/new`);
          setLoading(false);
      });
    });
  };

  const handleDelete = (data) => {
    dispatch(deleteDM(data.id)).then((response) => {
      setLoading(true);
      if (response.payload.status === 200) {
        dispatch(listDM({ company, message })).then(() => {
          setLoading(false);
          message.success(`Successfully deleted ${data.number}`);
        });
      } else {
        setLoading(false);
        message.error(`Unable to delete ${data.number}`);
      }
    });
  };

  const handleUpdate = (data) => {
    
  };

  const handleRetrieve = (data) => {
    setSelectedData(data);
    setDisplayModal(true);
  };

  const onSubmit = async (data) => {
    const payload = {
        ...data,
        memoSlipType: 'DM',
        depot: {id: data.depot},
        type: {id: data.type},
    }

    if (formMode === 'edit') {
      payload.id = selectedData.id;
    }

    await dispatch(addDM(payload)).then((response) => {
      setLoading(true);
      if (response.payload.status === 200) {
        message.success(`Successfully saved ${response.payload.data.number}`);
        dispatch(listDM({ company, message })).then(() => {          
          setLoading(false);
        });
        history.goBack();
      } else {
        setLoading(false);
        if (formMode === 'add') {
          message.error(
            `Unable to add Debit Memo. Please double check the provided information.`
          );
        } else {
          message.error(`Something went wrong. Unable to update ${data.number}.`);
        }
      }
    });
    
    setFormData(null);
  };

  return (
    <Switch>
      <Route exact path={`${path}/new`}>
        <InputForm
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={() => { setFormData(null); }}
          formDetails={formDetails}
          //formTable={tableDetails}
        />
      </Route>
      <Route path={`${path}/:id`}>
        <InputForm
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={() => { setFormData(null); }}
          formDetails={formDetails}
          //formTable={tableDetails}
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
                data={dmList}
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
              <Descriptions
                bordered
                title={`Debit Memo ${selectedData.number} Details`}
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
                      if (itemData !== null && typeof itemData !== 'undefined') {
                        return (
                          <Descriptions.Item label={item.label}>
                            {itemData[item.selectName]}
                          </Descriptions.Item>
                        );
                      }
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
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default DebitMemo;
