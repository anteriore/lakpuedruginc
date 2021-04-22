import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Row, Col, Typography, Button, Skeleton, Descriptions, Modal, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
import FormDetails, { columns } from './data';

import TableDisplay from '../../../components/TableDisplay';
import InputForm from './InputForm';

import { listOReceipt, addOReceipt, deleteOReceipt, clearData } from './redux';
import { listDepotByCompany, clearData as clearDepot } from '../../Maintenance/Depots/redux';
import GeneralHelper, { reevalutateMessageStatus, reevalDependencyMsgStats } from '../../../helpers/general-helper';

const { Title, Text } = Typography;

const OfficialReceipts = (props) => {
  const { handleRequestResponse } = GeneralHelper();
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { company, title, actions } = props;

  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedAR, setSelectedAR] = useState(null);
  const { formDetails, tableDetails } = FormDetails();

  const {list, status, statusLevel, statusMessage, action } = useSelector((state) => state.sales.officialReceipts);
  const {
    action: actionDepot,
    statusMessage: statusMessageDepot,
    status: statusDepot,
    statusLevel: statusLevelDepot,
  } = useSelector((state) => state.maintenance.depots);
  const user = useSelector((state) => state.auth.user);
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearDepot());
  },[dispatch]);

  useEffect(() => {
    reevalutateMessageStatus({status, action,statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusDepot,
      statusMessage: statusMessageDepot,
      action: actionDepot, 
      statusLevel: statusLevelDepot,
      module: 'Depots'
    });
  }, [actionDepot, statusMessageDepot, statusDepot, statusLevelDepot]);

  useEffect(() => {
    dispatch(listOReceipt({ company, message })).then(() => {
      if (isMounted.current) {
        setLoading(false)
      }
    });

    return function cleanup() {
      isMounted.current = false;
      performCleanup();
    };
  }, [dispatch, company, performCleanup]);

  const handleAdd = () => {
    setFormTitle('Create Official Receipt');
    setFormData(null);
    setLoading(true);
    dispatch(listDepotByCompany({ company })).then((resp1) => {
      if(isMounted.current){
        const onSuccess = () => {
            history.push(`${path}/new`);
            setLoading(false);
        }
        const onFail = () => {
          setLoading(false);
        }
        handleRequestResponse([resp1], onSuccess, onFail, '');
      }
    });
  };

  const handleUpdate = (data) => {
    message.error('Unable to perform action.');
  };

  const handleDelete = (data) => {
    dispatch(deleteOReceipt(data.id)).then((response) => {
      setLoading(true);
      const onSuccess = () => {
        dispatch(listOReceipt({ company, message })).then(() => {
          setLoading(false);
        });
      };

      const onFail = () => {
        setLoading(false);
      }
      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleRetrieve = (data) => {
    setSelectedAR(data);
    setDisplayModal(true);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      company: {
        id: company,
      },
      acknowledgementReceipt: {
        id: data.acknowledgementReceipt.id,
      },
      depot: {
        id: data.depot,
      },
      preparedBy: {
        id: user.id,
      },
    };
    
    await dispatch(addOReceipt(payload)).then((response) => {
      setLoading(true);
      const onSuccess = () => {
        history.goBack();
        dispatch(listOReceipt({ company, message })).then(() => {
          setLoading(false);
        });
      };

      const onFail = () => {
        setLoading(false);
      }
      handleRequestResponse([response], onSuccess, onFail, '');
    });
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
                      if (selectedAR[item.name] === null && item.toggle) {
                        return null;
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

                  {formDetails.ar_items.map((item) => {
                    return (
                      <Descriptions.Item label={item.label}>
                        {item.toString(selectedAR.acknowledgementReceipt)}
                      </Descriptions.Item>
                    );
                  })}
                </Descriptions>
                <Text>Payment Details:</Text>
                <Table
                  dataSource={tableDetails.getValues(selectedAR.acknowledgementReceipt)}
                  columns={tableDetails.columns}
                  pagination={false}
                />
              </>
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default OfficialReceipts;
