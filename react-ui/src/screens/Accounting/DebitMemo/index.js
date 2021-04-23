import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, Descriptions, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';

import TableDisplay from '../../../components/TableDisplay';
import { FormDetails, DisplayDetails } from './data';
import InputForm from './InputForm';

import { listDM, addDM, deleteDM, updateDM, getDM, clearData } from './redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';
import { listMemoByType, clearData as clearMemo } from '../../Maintenance/MemoTypes/redux';
import { clearData as clearOS } from '../../Sales/OrderSlips/redux';
import { clearData as clearSI } from '../../Sales/SalesInvoice/redux';

import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';

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
  const { list: dmList, statusMessage, action, status, statusLevel } = useSelector(
    (state) => state.accounting.debitMemo
  );
  const { formDetails } = FormDetails();
  const { columns } = DisplayDetails();

  const { handleRequestResponse } = GeneralHelper();
  const isMounted = useRef(true);

  useEffect(() => {
    dispatch(listDM({ company, message })).then(() => {
      setFormData(null);
      setLoading(false);
    });

    return function cleanup() {
      isMounted.current = false;
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearMemo());
      dispatch(clearOS());
      dispatch(clearSI());
    };
  }, [dispatch, company]);

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  const handleAdd = () => {
    setFormTitle('Create Debit Memo');
    setFormMode('add');
    setFormData(null);
    setSelectedData(null);
    setLoading(true);
    dispatch(clearOS());
    dispatch(clearSI());
    dispatch(listDepot({ company, message })).then((response1) => {
      dispatch(listMemoByType({ type: ['DM'] })).then((response2) => {
        if (isMounted.current) {
          const onSuccess = () => {
            history.push(`${path}/new`);
            setLoading(false);
          };
          const onFail = () => {
            setLoading(false);
          };
          handleRequestResponse([response1, response2], onSuccess, onFail, '');
        }
      });
    });
  };

  const handleDelete = (data) => {
    dispatch(deleteDM(data.id)).then((response) => {
      setLoading(true);
      const onSuccess = () => {
        dispatch(listDM({ company, message })).then(() => {
          setLoading(false);
        });
      };
      const onFail = () => {
        setLoading(false);
      };

      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleUpdate = (data) => {};

  const handleRetrieve = (data) => {
    setLoading(true);
    dispatch(getDM({ id: data.id })).then((response) => {
      const onSuccess = () => {
        setDisplayModal(true);
        setSelectedData(response.payload.data);
        setLoading(false);
      };
      const onFail = () => {
        setDisplayModal(false);
      };

      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleCancelButton = () => {
    setFormData(null);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      memoSlipType: 'DM',
      depot: { id: data.depot },
      type: { id: data.type },
    };

    if (formMode === 'edit') {
      payload.id = formData.id;

      await dispatch(updateDM(payload)).then((response) => {
        setLoading(true);
        const onSuccess = () => {
          history.goBack();
          dispatch(listDM({ company, message })).then(() => {
            setLoading(false);
          });
        };
        const onFail = () => {
          setLoading(false);
        };

        handleRequestResponse([response], onSuccess, onFail, '');
      });
    } else if (formMode === 'add') {
      await dispatch(addDM(payload)).then((response) => {
        setLoading(true);
        const onSuccess = () => {
          history.goBack();
          dispatch(listDM({ company, message })).then(() => {
            setLoading(false);
          });
        };
        const onFail = () => {
          setLoading(false);
        };

        handleRequestResponse([response], onSuccess, onFail, '');
      });
    }

    setFormData(null);
    return 1;
  };

  return (
    <Switch>
      <Route exact path={`${path}/new`}>
        <InputForm
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={handleCancelButton}
          formDetails={formDetails}
        />
      </Route>
      <Route path={`${path}/:id`}>
        <InputForm
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={handleCancelButton}
          formDetails={formDetails}
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
