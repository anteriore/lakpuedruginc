import React, { useEffect, useState } from 'react';
import { Row, Typography, Col, Button, Skeleton, message, Modal, Descriptions} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader, formDetails } from './data';
import { formatPayload } from './helpers';
import InputForm from './InputForm';
import moment from 'moment';
import {
  listSalesOrder,
  createSalesOrder,
  updateSalesOrder,
  deleteSalesOrder,
  clearData,
} from './redux';
import { clearData as clearDepot } from '../../Maintenance/Depots/redux';
import { clearData as clearClient } from '../../Maintenance/Clients/redux';
import { clearData as clearPI } from '../../Maintenance/redux/productInventory';
import { listDepot } from '../../Maintenance/Depots/redux';
import { listClient } from '../../Maintenance/Clients/redux';
import {listProductInventory} from '../../Maintenance/redux/productInventory';
import { NO_DATA_FOUND, NO_DATA_FOUND_DESC } from '../../../data/constants/response-message.constant';

const { Title } = Typography;

const SalesOrders = (props) => {
  const { title, company } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [contentLoading, setContentLoading] = useState(true);
  const [selectedSO, setSelectedSO] = useState(null)
  const [displayModal, setDisplayModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  const { path } = useRouteMatch();
  const { salesOrderList, action, statusMessage } = useSelector((state) => state.sales.salesOrders);
  const { id } = useSelector((state) => state.auth.user);

  useEffect(() => {
    let isCancelled = false;
    const salesOrderPayload = {
      company,
      fnCallback: (response) => {
        const {status} = response;
        switch(status){
          case 200:
            if(response.data.length === 0){
              message.warning(response.statusText);
            }
            break;
          case 400:
          case 500: 
            history.push({
              pathname: `/error/${status === 400 ? 403 : status}`,
              state: {
                moduleList: '/sales'
              }
            });
            break;
          default:
            break;
        }
      }
    }

    dispatch(listSalesOrder(salesOrderPayload)).then(() => {
      setContentLoading(false);
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearClient());
      dispatch(clearPI());
      isCancelled = true;
    };
  },[dispatch, company, history])

  useEffect(() => {
    if (action !== 'get' && action !== '') {
      if (action === 'pending') {
        message.info(statusMessage);
      } else if (action === 'error') {
        message.error(statusMessage);
      } else {
        message.success(statusMessage);
      }
    }
  }, [statusMessage, action]);

  const handleAddButton = () => {
    setContentLoading(true)
    const payload = {
      company,
      fnCallback: (response) => {
        const {status} = response;
        switch(status){
          case 200:
            if(response.data.length === 0){
              Modal.warning({
                title: NO_DATA_FOUND,
                content: NO_DATA_FOUND_DESC(response.config.url.split(/[/?]/g)[1])
              })
            }
            break;
          case 400:
          case 500:
            history.push({
              pathname: `/error/${status === 400 ? 403 : status}`,
              state: {
                moduleList: '/sales/sales-orders'
              }
            });
            break;
          default:
            break;
        }
      }
    } 

    dispatch(listDepot(payload)).then((data) => {
      if(typeof data.payload !== 'undefined'){
        if(data.payload.status === 200 && data.payload.data.length !== 0){
          dispatch(listClient(payload)).then((data) => {
            if(data.payload.status === 200 && data.payload.data.length !== 0){
              dispatch(listProductInventory(payload)).then((data) => {
                if(data.payload.status === 200 && data.payload.data.length !== 0){
                  history.push(`${path}/new`);
                  setContentLoading(false);
                } else if(data.payload.status === 200 && data.payload.data.length === 0) {
                  setContentLoading(false);
                }
              })
            } else if(data.payload.status === 200 && data.payload.data.length === 0) {
              setContentLoading(false);
            }
          })
        } else if(data.payload.status === 200 && data.payload.data.length === 0) {
          setContentLoading(false);
        }
      }
    })
  };

  const handleEditButton = (value) => {
    const { id: rowId } = value;
    setOrderId(value.id);
    setContentLoading(true);
    const payload = {
      company,
      fnCallback: (response) => {
        const {status} = response;
        switch(status){
          case 200:
            if(response.data.length === 0){
              Modal.warning({
                title: NO_DATA_FOUND,
                content: NO_DATA_FOUND_DESC(response.config.url.split(/[/?]/g)[1])
              })
            }
            break;
          case 400:
          case 500:
            history.push({
              pathname: `/error/${status === 400 ? 403 : status}`,
              state: {
                moduleList: '/sales/sales-orders'
              }
            });
            break;
          default:
            break;
        }
      }
    } 

    // history.push(`${path}/${rowId}/edit`);

    dispatch(listDepot(payload)).then((data) => {
      if(typeof data.payload !== 'undefined'){
        if(data.payload.status === 200 && data.payload.data.length !== 0){
          dispatch(listClient(payload)).then((data) => {
            if(data.payload.status === 200 && data.payload.data.length !== 0){
              dispatch(listProductInventory(payload)).then((data) => {
                if(data.payload.status === 200 && data.payload.data.length !== 0){
                   history.push(`${path}/${rowId}/edit`);
                  setContentLoading(false);
                } else if(data.payload.status === 200 && data.payload.data.length === 0) {
                  setContentLoading(false);
                }
              })
            } else if(data.payload.status === 200 && data.payload.data.length === 0) {
              setContentLoading(false);
            }
          })
        } else if(data.payload.status === 200 && data.payload.data.length === 0) {
          setContentLoading(false);
        }
      }
    })
  };

  const handleDeleteButton = (row) => {
    const salesOrderPayload = {
      company,
      fnCallback: (response) => {
        const {status} = response;
        switch(status){
          case 200:
            if(response.data.length === 0){
              message.warning(response.statusText);
              setContentLoading(false);
            }else{
              setContentLoading(false);
            }
            break;
          case 400:
          case 500: 
            history.push({
              pathname: `/error/${status === 400 ? 403 : status}`,
              state: {
                moduleList: '/sales'
              }
            });
            break;
          default:
            break;
        }
      }
    }

    dispatch(deleteSalesOrder(row))
      .then(() => {
        dispatch(listSalesOrder(salesOrderPayload));
      })
      .catch((err) => {
        message.error(`Something went wrong! details: ${err}`);
      });
  };

  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setSelectedSO(data)
    console.log(data, "Checking Sales")
  }

  const onCreate = (value) => {
    const salesOrderPayload = {
      company,
      fnCallback: (response) => {
        const {status} = response;
        switch(status){
          case 200:
            if(response.data.length === 0){
              message.warning(response.statusText);
              setContentLoading(false);
            }else{
              setContentLoading(false);
            }
            break;
          case 400:
          case 500: 
            history.push({
              pathname: `/error/${status === 400 ? 403 : status}`,
              state: {
                moduleList: '/sales'
              }
            });
            break;
          default:
            break;
        }
      }
    }

    dispatch(createSalesOrder(formatPayload(id, company, value))).then(() => {
      dispatch(listSalesOrder(salesOrderPayload));
    });
  };

  const onUpdate = (value) => {
    const salesOrderPayload = {
      company,
      fnCallback: (response) => {
        const {status} = response;
        switch(status){
          case 200:
            if(response.data.length === 0){
              message.warning(response.statusText);
              setContentLoading(false);
            }else{
              setContentLoading(false);
            }
            break;
          case 400:
          case 500: 
            history.push({
              pathname: `/error/${status === 400 ? 403 : status}`,
              state: {
                moduleList: '/sales'
              }
            });
            break;
          default:
            break;
        }
      }
    }

    const order = formatPayload(id, company, value);
    order.id = orderId;
    dispatch(updateSalesOrder(order)).then(() => {
      dispatch(listSalesOrder(salesOrderPayload));
    });
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm title="New Sales Order" onSubmit={onCreate} company={company} />
      </Route>
      <Route path={`${path}/:id/edit`}>
        <InputForm title="Edit Sales Order" onSubmit={onUpdate} company={company} />
      </Route>
      <Route path={`${path}`}>
        <Row gutter={[8, 24]}>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>{title}</Title>
            <Button icon={<PlusOutlined />} onClick={() => handleAddButton()}>
              Add
            </Button>
          </Col>
          <Col span={20}>
            {contentLoading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={tableHeader}
                data={salesOrderList}
                handleUpdate={handleEditButton}
                handleDelete={handleDeleteButton}
                handleRetrieve={handleRetrieve}
              />
            )}
          </Col>
        </Row>
        <Modal
          title="Sales Order Details"
          visible={displayModal}
          onOk={() => {
            setDisplayModal(false);
            setSelectedSO(null);
          }}
          onCancel={() => {
            setDisplayModal(false);
            setSelectedSO(null);
          }}
          width={1000}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          {selectedSO === null ? (
            <Skeleton/>
          ) : (
            <>
              <Descriptions
                bordered
                title={`Sales Order ${selectedSO.number}`}
                size="default"
                layout="vertical"
              >
                {formDetails.form_items.map((item, i) => {
                  if(!item.writeOnly){
                    if (item.type === 'select') {
                      const itemData = selectedSO[item.name];
                      return (
                        <Descriptions.Item key={i} label={item.label}>
                          { typeof itemData === 'object' ? itemData.code : itemData}
                        </Descriptions.Item>
                      );
                    }
  
                    if (item.type === 'date') {
                      return (
                        <Descriptions.Item label={item.label}>
                          {moment(new Date(selectedSO[item.name])).format('DD/MM/YYYY')}
                        </Descriptions.Item>
                      );
                    }  

                    return (
                      <Descriptions.Item label={item.label}>
                        { typeof selectedSO[item.name] === 'object' && selectedSO[item.name] !== null ? selectedSO[item.name]['code'] : selectedSO[item.name]}
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
                Sales Order Product Items:
              </Title>
              {selectedSO.products.map((item) => {
                console.log(item);
                return(
                  <Descriptions
                    title={`[${item.finishedGood.name}]`}
                    size="default"
                  >
                    <Descriptions.Item label="Depot">
                      {item.depot.code}
                    </Descriptions.Item>
                    <Descriptions.Item label="Quantity">
                      {item.quantity}
                    </Descriptions.Item>
                    <Descriptions.Item label="Quantity Requested">
                      {item.quantityRequested}
                    </Descriptions.Item>
                    <Descriptions.Item label="Unit Price">
                      {item.unitPrice}
                    </Descriptions.Item>
                    <Descriptions.Item label="Company">
                      {item.company.name}
                    </Descriptions.Item>
                  </Descriptions>
                )
              })}
            </>
          )}
        </Modal>
      </Route>
    </Switch>
  );
};

export default SalesOrders;
