import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Typography, Skeleton, Button, Modal, Empty, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Container from '../../components/container';
import TableDisplay from '../../components/TableDisplay';
import FormScreen from '../../components/forms/FormScreen';
import FormDetails, { columns } from './data';
import ItemDescription from '../../components/ItemDescription';

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
  const [actions, setActions] = useState([]);

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
  const { permissions } = useSelector((state) => state.auth);

  useEffect(() => {
    const actionsList = [];
    if (typeof permissions['purchase-orders'] !== 'undefined') {
      if (permissions['purchase-orders'].actions.search('u') !== -1) {
        actionsList.push('update');
      }
      if (permissions['purchase-orders'].actions.search('c') !== -1) {
        actionsList.push('create');
      }
      if (permissions['purchase-orders'].actions.search('d') !== -1) {
        actionsList.push('delete');
      }
      if (permissions['purchase-orders'].actions.search('r') !== -1) {
        actionsList.push('read');
      }
    }
    setActions(actionsList);
  }, [permissions]);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listCompany()).then(() => {
      setLoadingCompany(false);
      if (actions.includes('read')) {
        dispatch(listPO({ company: selectedCompany, message })).then(() => {
          setLoading(false);
          setSelectedPO(null);
          if (isCancelled) {
            dispatch(clearData());
          }
        });
      } else {
        setLoading(false);
        setSelectedPO(null);
      }
    });
    return function cleanup() {
      dispatch(clearData());
      dispatch(clearVendor());
      dispatch(clearDA());
      dispatch(clearPR());
      dispatch(clearUnit());
      isCancelled = true;
    };
  }, [actions, dispatch, selectedCompany]);

  const handleChangeTab = (id) => {
    dispatch(setCompany(id));
    setLoading(true);
    if (actions.includes('read')) {
      dispatch(listPO({ company: id, message })).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
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
            // dispatch(listPRByStatus({ company: selectedCompany, message, status: 'Approved' }))
            // dispatch(listPR({ company: selectedCompany, message }))
            history.push(`${path}/new`);
            setLoadingCompany(false);
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
            // dispatch(listPRByStatus({ company: selectedCompany, message, status: 'Approved' }))
            // dispatch(listPR({ company: selectedCompany, message }))
            history.push(`${path}/${data.id}`);
            setLoadingCompany(false);
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
            message.success(`Successfully added purchase order "${response.payload.data.number}"`);
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
                {actions.includes('create') && (
                  <Button
                    style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
                    icon={<PlusOutlined />}
                    onClick={(e) => {
                      handleAdd();
                    }}
                  >
                    Add
                  </Button>
                )}

                {loading ? (
                  <Skeleton />
                ) : actions.includes('read') ? (
                  <TableDisplay
                    columns={columns}
                    data={purchaseOrders}
                    handleRetrieve={handleRetrieve}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    updateEnabled={actions.includes('update')}
                    deleteEnabled={actions.includes('delete')}
                  />
                ) : (
                  <Empty
                    style={{ width: '87.5%' }}
                    description="You do not have the permission to access this module."
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
                    <ItemDescription
                      title={`Purchase Order ${selectedPO.number} Details`}
                      selectedData={selectedPO}
                      formItems={formDetails.form_items}
                    />
                    <Title
                      level={5}
                      style={{ marginRight: 'auto', marginTop: '2%', marginBottom: '1%' }}
                    >
                      Ordered Items:
                    </Title>
                    <Table
                      dataSource={selectedPO[tableDetails.name] ?? []}
                      columns={tableDetails.renderTableColumns(tableDetails.fields)}
                      pagination={false}
                      locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                    />
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
