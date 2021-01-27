import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Typography, Skeleton, Button, Descriptions, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Container from '../../components/container';
import TableDisplay from '../../components/TableDisplay';
import FormScreen from '../../components/forms/FormScreen';
import FormDetails, { columns } from './data';

import { listPO, addPO, deletePO, clearData } from './redux';
import { listVendor, clearData as clearVendor } from '../Maintenance/Vendors/redux';
import {
  listD as listDepartment,
  listA as listArea,
  clearData as clearDA,
} from '../Maintenance/DepartmentArea/redux';
import { listUnit, clearData as clearUnit } from '../Maintenance/Units/redux';
import { listPRByStatus, clearData as clearPR } from '../Dashboard/PurchaseRequests/redux';
import { listCompany, setCompany } from '../../redux/company';

const { TabPane } = Tabs;
const { Title } = Typography;

const Purchasing = () => {
  const [loading, setLoading] = useState(true);
  const [loadingCompany, setLoadingCompany] = useState(true);

  const [displayModal, setDisplayModal] = useState(false);
  const [selectedPO, setSelectedPO] = useState(null);

  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const purchaseOrders = useSelector((state) => state.purchaseOrders.list);
  const companies = useSelector((state) => state.company.companyList);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);

  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const { formDetails, tableDetails } = FormDetails();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listCompany()).then(() => {
      setLoadingCompany(false);
      dispatch(listPO({ company: selectedCompany, message })).then(() => {
        setLoading(false);
        setSelectedPO(null);
        if (isCancelled) {
          dispatch(clearData());
        }
      });
    });
    return function cleanup() {
      dispatch(clearData());
      dispatch(clearVendor());
      dispatch(clearDA());
      dispatch(clearPR());
      dispatch(clearUnit());
      isCancelled = true;
    };
  }, [dispatch, selectedCompany]);

  const handleChangeTab = (id) => {
    dispatch(setCompany(id));
    setLoading(true);
    dispatch(listPO({ company: id, message })).then(() => {
      setLoading(false);
    });
  };

  const handleAdd = () => {
    setFormTitle('Create Purchase Order');
    setFormMode('add');
    setFormData(null);
    setLoadingCompany(true);
    dispatch(listVendor({ company: selectedCompany, message })).then(() => {
      dispatch(listDepartment({ company: selectedCompany, message })).then(() => {
        dispatch(listArea({ company: selectedCompany, message })).then(() => {
          dispatch(listUnit({ company: selectedCompany, message })).then(() => {
            dispatch(listPRByStatus({ company: selectedCompany, message, status: 'Approved' }))
              // dispatch(listPR({ company: selectedCompany, message }))
              .then(() => {
                history.push(`${path}/new`);
                setLoadingCompany(false);
              });
          });
        });
      });
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Edit Purchase Order');
    setFormMode('edit');
    const poData = purchaseOrders.find((po) => po.id === data.id);
    const orderedItems = [];
    poData.orderedItems.forEach((item) => {
      orderedItems.push({
        ...item,
        unit: item.unit.id,
        amount: null,
      });
    });
    const formData = {
      ...poData,
      date: moment(new Date(data.date)) || moment(),
      dueDate: moment(new Date(data.dueDate)) || moment(),
      department: poData.department !== null ? poData.department.id : null,
      area: poData.area !== null ? poData.area.id : null,
      vendor: poData.vendor !== null ? poData.vendor.id : null,
      orderedItems,
    };
    setFormData(formData);
    setLoadingCompany(true);
    dispatch(listVendor({ company: selectedCompany, message })).then(() => {
      dispatch(listDepartment({ company: selectedCompany, message })).then(() => {
        dispatch(listArea({ company: selectedCompany, message })).then(() => {
          dispatch(listUnit({ company: selectedCompany, message })).then(() => {
            dispatch(listPRByStatus({ company: selectedCompany, message, status: 'Approved' }))
              // dispatch(listPR({ company: selectedCompany, message }))
              .then(() => {
                history.push(`${path}/${data.id}`);
                setLoadingCompany(false);
              });
          });
        });
      });
    });
  };

  const handleDelete = (data) => {
    dispatch(deletePO(data.id)).then((response) => {
      setLoading(true);
      if (response.payload.status === 200) {
        dispatch(listPO({ company: selectedCompany, message })).then(() => {
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
    setSelectedPO(data);
    setDisplayModal(true);
  };

  const handleCancelButton = () => {
    setFormData(null);
  };

  const onSubmit = (data) => {
    const orderedItems = [];
    let totalAmount = 0;
    data.orderedItems.forEach((item) => {
      orderedItems.push({
        ...item,
        unit: {
          id: item.unit,
        },
        amount: item.quantity * item.unitPrice,
      });
      totalAmount += item.quantity * item.unitPrice;
    });
    const payload = {
      ...data,
      number: null,
      company: {
        id: selectedCompany,
      },
      department: {
        id: data.department,
      },
      area: {
        id: data.area,
      },
      vendor: {
        id: data.vendor,
      },
      orderedItems,
      totalAmount,
    };

    if (formMode === 'edit') {
      payload.id = formData.id;
      payload.number = formData.number;
    }

    dispatch(addPO(payload)).then((response) => {
      setLoading(true);
      if (response.payload.status === 200) {
        dispatch(listPO({ company: selectedCompany, message })).then((response) => {
          setLoading(false);
          history.goBack();
          if (formMode === 'edit') {
            message.success(`Successfully updated ${formData.number}`);
          } else {
            message.success(`Successfully added purchase order "${response.payload.number}"`);
          }
        });
      } else {
        setLoading(false);
        if (formMode === 'edit') {
          message.error(`Unable to update ${formData.number}`);
        } else {
          message.error(`Unable to add purchase order`);
        }
      }
    });
  };

  return (
    <Container location={{ pathname: path }}>
      <Switch>
        <Route exact path={path}>
          <Row>
            <Title level={3}>Purchase Orders</Title>
          </Row>
          {loadingCompany ? (
            <Skeleton />
          ) : (
            <Row>
              <Col span={20}>
                <Tabs defaultActiveKey={selectedCompany} onChange={handleChangeTab}>
                  {companies.map((val) => (
                    <TabPane tab={val.name} key={val.id} />
                  ))}
                </Tabs>

                <Button
                  style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
                  icon={<PlusOutlined />}
                  onClick={(e) => {
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
                    data={purchaseOrders}
                    handleRetrieve={handleRetrieve}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                  />
                )}
              </Col>
              <Modal
                title="Purchase Order Details"
                visible={displayModal}
                onOk={() => {
                  setDisplayModal(false);
                  setSelectedPO(null);
                }}
                onCancel={() => {
                  setDisplayModal(false);
                  setSelectedPO(null);
                }}
                width={1000}
                cancelButtonProps={{ style: { display: 'none' } }}
              >
                {selectedPO === null ? (
                  <Skeleton />
                ) : (
                  <>
                    <Descriptions
                      bordered
                      title={`Purchase Order ${selectedPO.number}`}
                      size="default"
                      layout="vertical"
                    >
                      {formDetails.form_items.map((item) => {
                        if (!item.writeOnly) {
                          if (item.type === 'select') {
                            const itemData = selectedPO[item.name];
                            return (
                              <Descriptions.Item label={item.label}>
                                {itemData[item.selectName]}
                              </Descriptions.Item>
                            );
                          }
                          if (item.type === 'date') {
                            return (
                              <Descriptions.Item label={item.label}>
                                {moment(new Date(selectedPO[item.name])).format('DD/MM/YYYY')}
                              </Descriptions.Item>
                            );
                          }

                          return (
                            <Descriptions.Item label={item.label}>
                              {selectedPO[item.name]}
                            </Descriptions.Item>
                          );
                        }

                        return null;
                      })}
                    </Descriptions>
                    <Title
                      level={5}
                      style={{ marginRight: 'auto', marginTop: '2%', marginBottom: '1%' }}
                    >
                      Ordered Items:
                    </Title>
                    {selectedPO[tableDetails.name].map((item) => {
                      return (
                        <Descriptions
                          title={`[${item.item.code}] ${item.item.name}`}
                          size="default"
                        >
                          {tableDetails.fields.map((field) => {
                            if (field.type === 'hidden' || field.type === 'hiddenNumber') {
                              return null;
                            }
                            if (typeof field.render === 'function') {
                              return (
                                <Descriptions.Item label={field.label}>
                                  {field.render(item)}
                                </Descriptions.Item>
                              );
                            }
                            if (field.type === 'select') {
                              if (typeof field.selectName === 'undefined') {
                                field.selectName = 'name';
                              }
                              const fieldData = item[field.name];
                              return (
                                <Descriptions.Item label={field.label}>
                                  {fieldData[field.selectName]}
                                </Descriptions.Item>
                              );
                            }

                            return (
                              <Descriptions.Item label={field.label}>
                                {item[field.name]}
                              </Descriptions.Item>
                            );
                          })}
                        </Descriptions>
                      );
                    })}
                  </>
                )}
              </Modal>
            </Row>
          )}
        </Route>
        <Route path={`${path}/new`}>
          <FormScreen
            title={formTitle}
            onSubmit={onSubmit}
            values={formData}
            onCancel={handleCancelButton}
            formDetails={formDetails}
            formTable={tableDetails}
          />
        </Route>
        <Route path={`${path}/:id`}>
          <FormScreen
            title={formTitle}
            onSubmit={onSubmit}
            values={formData}
            onCancel={handleCancelButton}
            formDetails={formDetails}
            formTable={tableDetails}
          />
        </Route>
      </Switch>
    </Container>
  );
};

export default Purchasing;
