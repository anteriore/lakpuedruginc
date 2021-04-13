import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { PlusOutlined, FileTextOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
import FormDetails, { columns, reportColumns } from './data';

import TableDisplay from '../../../components/TableDisplay';
import InputForm from './InputForm';
import Report from '../../../components/Report';

import { listReturnSlip, addReturnSlip, deleteReturnSlip, clearData } from './redux';
import { listClient, clearData as clearClient } from '../../Maintenance/Clients/redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';
import { listOrderSlipsByDepot, clearData as clearOS } from '../OrderSlips/redux';
import { clearData as clearSI } from '../SalesInvoice/redux';
import GeneralHelper, { reevalutateMessageStatus, reevalDependencyMsgStats } from '../../../helpers/general-helper';

const { Title, Text } = Typography;

const ReturnSlips = (props) => {
  const { handleRequestResponse } = GeneralHelper();
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { company, title, actions } = props;

  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const { formDetails, tableDetails } = FormDetails();

  const {list, status, statusLevel, statusMessage, action} = useSelector((state) => state.sales.returnSlips);
  const {
    action: actionDepot,
    statusMessage: statusMessageDepot,
    status: statusDepot,
    statusLevel: statusLevelDepot,
  } = useSelector((state) => state.maintenance.depots);

  const {
    action: actionClient,
    statusMessage: statusMessageClient,
    status: statusClient,
    statusLevel: statusLevelClient,
  } = useSelector((state) => state.maintenance.clients);

  const companies = useSelector((state) => state.company.companyList);
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearClient());
    dispatch(clearDepot());
    dispatch(clearOS());
    dispatch(clearSI());
  },[dispatch])

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
    reevalDependencyMsgStats({
      status: statusClient,
      statusMessage: statusMessageClient,
      action: actionClient, 
      statusLevel: statusLevelClient,
      module: 'Clients'
    })
  }, [actionClient, statusMessageClient, statusClient, statusLevelClient]);

  useEffect(() => {
    dispatch(listReturnSlip({ company, message })).then(() => {
      if (isMounted.current) {
        setLoading(false)
      } else {
        performCleanup();
      }
    });

    return function cleanup() {
    
    };
  }, [dispatch, company, performCleanup]);

  const handleAdd = () => {
    setFormTitle('Create Return Slip');
    setFormData(null);
    setLoading(true);
    dispatch(clearOS());
    dispatch(listClient({ company, message })).then((resp1) => {
        dispatch(listDepot({ company, message })).then((resp2) => {
          if(isMounted.current){
            const onSuccess = () => {
                history.push(`${path}/new`);
                setLoading(false);
            }
            const onFail = () => {
              setLoading(false);
            }
            handleRequestResponse([resp1, resp2], onSuccess, onFail, '');
          }
          else {
            performCleanup()
          }
      });
    })
  }

  const handleUpdate = (data) => {
    setFormTitle('Update Return Slip');
    const itemData = list.find((item) => item.id === data.id);
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
          history.push(`${path}/${data.id}`);
          setLoading(false);
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

  const handleReport = () => {
    setFormTitle('Return Slip Summary Report');
    setFormData(list);
    console.log(formData);
    setLoading(true);
    history.push(`${path}/report`);
    setLoading(false);
  };

  const renderReportDetails = () => {
    return (
      <>
        <Row>
          <Col span={12} style={{ display: 'flex' }}>
            <Title level={5}>{`Report: ${formTitle}`}</Title>
          </Col>
          <Col span={12} style={{ display: 'flex' }}>
            <Title level={5}>{`Dates: ${'all'}`}</Title>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ display: 'flex' }}>
            <Title level={5}>{`Company: ${
              companies.find((companyData) => companyData.id === company).name
            }`}</Title>
          </Col>
        </Row>
      </>
    );
  };

  const onSubmit = async (data) => {
    // TODO: Data Validation
    const products = [];
    data.returnSlipProducts.forEach((returnSlipProduct) => {
      products.push({
        product: {
          id: returnSlipProduct.product.id,
        },
        goodQuantity:
          returnSlipProduct.quantity - returnSlipProduct.badQuantity || returnSlipProduct.quantity,
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
    await dispatch(addReturnSlip(payload)).then((response) => {
      setLoading(true);
      const onSuccess = () => {
        history.goBack();
        dispatch(listReturnSlip({ company, message })).then(() => {
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
      <Route exact path={`${path}/report`}>
        <Report data={formData} columns={reportColumns} renderReportDetails={renderReportDetails} />
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
                loading={loading}
                onClick={() => {
                  handleAdd();
                }}
              >
                Add
              </Button>
            )}
            <Button
              style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
              icon={<FileTextOutlined />}
              onClick={() => {
                handleReport();
              }}
              loading={loading}
            >
              View Report
            </Button>
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
