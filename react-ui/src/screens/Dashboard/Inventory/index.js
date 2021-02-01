import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message, Skeleton, Modal, Descriptions, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import { listInventory, addInventory, getInventory, deleteInventory, clearData, updateInventory } from './redux';
import { clearData as clearItem } from '../../Maintenance/Items/redux';
import FormScreen from '../../../components/forms/FormScreen';

const { Title } = Typography;

const Inventory = (props) => {
    const [loading, setLoading] = useState(true);
    const [formTitle, setFormTitle] = useState('');
    const [formMode, setFormMode] = useState('');
    const [formData, setFormData] = useState(null);

    const [loadingItem, setLoadingItem] = useState(true);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayData, setDisplayData] = useState(null);

    const { company } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const { path } = useRouteMatch();
    const inventory = useSelector((state) => state.dashboard.inventory.list);
    const { formDetails } = FormDetails();

    useEffect(() => {
        let isCancelled = false;
        dispatch(listInventory({ company, message })).then(() => {
            setFormData(null);
            setLoading(false);
        
            if (isCancelled) {
                dispatch(clearData());
            }
        });
    
        return function cleanup() {
            dispatch(clearData());
            dispatch(clearItem());
            isCancelled = true;
        };
    }, [dispatch, company]);

    const handleAdd = () => {
        setFormTitle('Add Inventory');
        setFormMode('add');
        setFormData(null);
        //dispatch(listInventory({ company, message })).then(() => {
            history.push(`${path}/new`);
        //});
    };

    const handleUpdate = (data) => {
        setFormTitle('Edit Inventory');
        setFormMode('edit');
        const inventoryData = inventory.find((inventory) => inventory.id === data.id);
        const formData = {
            ...inventoryData,
            item: inventoryData.item !== null ? inventoryData.item.id : null,
        };
        console.log(formData);
        setFormData(formData);
        //dispatch(listInventory({ company, message })).then(() => {
            history.push(`${path}/${data.id}`);
        //});
    };

    const handleDelete = (data) => {
        dispatch(deleteInventory(data.id)).then((response) => {
            setLoading(true);
            if (response.payload.status === 200) {
                dispatch(deleteInventory({ company, message })).then(() => {
                setLoading(false);
                message.success(`Successfully deleted ${data.name}`);
                });
            } else {
                setLoading(false);
                message.error(`Unable to delete ${data.name}`);
            }
        });
    };

    const handleRetrieve = (data) => {
        setDisplayModal(true);
        setLoadingItem(true);
        dispatch(getInventory({ id: data.id })).then((response) => {
            setDisplayData(response.payload.data);
            setLoadingItem(false);
        });
    };
    
    const handleCancelButton = () => {
        setFormData(null);
    };

    const onSubmit = (data) => {
        if (formMode === 'edit') {
            const payload = {
                ...data,
                id: formData.id,
                company: { id: company,  },
                item: { id: data.item, },
            };
    
            dispatch(updateInventory(payload)).then((response) => {
                setLoading(true);
                if (response.payload.status === 200) {
                    dispatch(listInventory({ company, message })).then(() => {
                        setLoading(false);
                        history.goBack();
                        message.success(`Successfully updated ${data.name}`);
                    });
                } else {
                    setLoading(false);
                    message.error(`Unable to update ${data.name}`);
                }
            });
        } else if (formMode === 'add') {
            const payload = {
                ...data,
                id: formData.id,
                company: { id: company,  },
                item: { id: data.item, },
            };

            dispatch(addInventory(payload)).then((response) => {
                setLoading(true);
                if (response.payload.status === 200) {
                    dispatch(listInventory({ company, message })).then(() => {
                        setLoading(false);
                        history.goBack();
                        message.success(`Successfully added ${data.name}`);
                    });
                } else {
                    setLoading(false);
                    message.error(`Unable to add ${data.name}`);
                }
            });
        }
    
        setFormData(null);
    };

    const closeModal = () => {
      setDisplayModal(false);
      setLoadingItem(true);
      setDisplayData(null);
    };

    return (
        <Switch>
          <Route path={`${path}/new`}>
            <FormScreen
              title={formTitle}
              onSubmit={onSubmit}
              values={formData}
              onCancel={handleCancelButton}
              formDetails={formDetails}
            />
          </Route>
          <Route path={`${path}/:id`}>
            <FormScreen
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
                data={inventory}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            )}
          </Col>
          <Modal
            title="Inventory Details"
            visible={displayModal}
            onOk={closeModal}
            onCancel={closeModal}
            width={1000}
            cancelButtonProps={{ style: { display: 'none' } }}
          >
            {loadingItem ? (
              <Skeleton />
            ) : (
              <>
                <Descriptions bordered title={displayData.name} size="default" layout="vertical">
                  {formDetails.form_items.map((item) => {
                    if (item.type === 'select') {
                      const itemData = displayData[item.name];
                      return (
                        <Descriptions.Item label={item.label}>
                          {itemData !== null ? itemData[item.selectName] : null}
                        </Descriptions.Item>
                      );
                    }
                    if (item.type === 'list' || item.type === 'listSelect') {
                      return null;
                    }

                    return (
                      <Descriptions.Item label={item.label}>
                        {displayData[item.name]}
                      </Descriptions.Item>
                    );
                  })}
                </Descriptions>

                {formDetails.form_items.map((item) => {
                  if (item.type === 'list' || item.type === 'listSelect') {
                    const itemList = displayData[item.name];
                    const itemRender = [];
                    itemRender.push(
                      <Title
                        level={5}
                        style={{ marginRight: 'auto', marginTop: '2%', marginBottom: '1%' }}
                      >
                        {`${item.label}:`}
                      </Title>
                    );
                    if (itemList.length === 0) {
                      itemRender.push(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);
                    }
                    itemList.forEach((itemData) => {
                      itemRender.push(
                        <Descriptions title={itemData[item.selectName]} size="default">
                          {item.fields.map((field) => {
                            if (field.type !== 'hidden') {
                              return (
                                <Descriptions.Item label={field.label}>
                                  {itemData[field.name]}
                                </Descriptions.Item>
                              );
                            }
                            return null;
                          })}
                        </Descriptions>
                      );
                    });
                    return itemRender;
                  }
                  return null;
                })}
              </>
            )}
          </Modal>
        </Row>
      </Route>  
        </Switch>
    );
};


export default Inventory;