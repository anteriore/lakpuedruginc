import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message, Skeleton, Modal, Descriptions, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data/'
import { listRecipe, addRecipe, getRecipe, deleteRecipe, clearData } from './redux';
import { getFGList } from '../../Maintenance/FinishedGoods/redux';
import { listI } from '../../Maintenance/Items/redux';
import FormScreen from '../../../components/forms/FormScreen';

const { Title } = Typography;

const Clients = (props) => {
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

  const { formDetails } = FormDetails()
  const data = useSelector((state) => state.rnd.recipes.list);

  useEffect(() => {
    dispatch(listRecipe({ company })).then((response) => {
      setFormData(null);
      setLoading(false)
    });

    return function cleanup() {
      dispatch(clearData());
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create Recipe');
    setFormMode('add');
    setFormData(null);
    dispatch(getFGList({ company })).then(() => {
      dispatch(listI({ company })).then(() => {
        history.push(`${path}/new`);
      })
    });
  };

  const handleUpdate = (data) => {
  };

  const handleDelete = (data) => {
  };

  const handleRetrieve = (data) => {
  };

  const handleCancelButton = () => {
    setFormData(null);
  };

  const onSubmit = (data) => {
    console.log(data)
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
              icon={<PlusOutlined/>}
              onClick={(e) => {
                handleAdd();
              }}
            >
              Add
            </Button>
            {loading ? (
              <Skeleton/>
            ) : (
              <TableDisplay
                columns={columns}
                data={data}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            )}
          </Col>
          <Modal
            title="Client Details"
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
              <Descriptions
                bordered
                title={displayData.name}
                size="default"
                layout="vertical"
              >
                {formDetails.form_items.map((item) => {
                  if(item.type === 'select'){
                    var itemData = displayData[item.name]
                    return <Descriptions.Item label={item.label}>{itemData !== null ? (itemData[item.selectName]) : (null)}</Descriptions.Item>
                  }
                  else if(item.type === 'list' || item.type === 'listSelect'){
                    return null
                  }
                  else {
                    return <Descriptions.Item label={item.label}>{displayData[item.name]}</Descriptions.Item>
                  }
                })}
              </Descriptions>

              {formDetails.form_items.map((item) => {
                if(item.type === 'list' || item.type === 'listSelect'){
                  const itemList = displayData[item.name]
                  var itemRender = []
                  itemRender.push(
                    <Title level={5} style={{marginRight:"auto", marginTop: "2%", marginBottom: "1%"}}>{item.label + ':'}</Title>
                  )
                  if(itemList.length === 0){
                    itemRender.push(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)
                  }
                  itemList.forEach((itemData) => {
                    itemRender.push(
                        <Descriptions
                          title={itemData[item.selectName]}
                          size="default"
                        >
                          {item.fields.map((field) => {
                            if(field.type !== 'hidden'){
                              return <Descriptions.Item label={field.label}>{itemData[field.name]}</Descriptions.Item>
                            }
                            else return null
                          })}
                        </Descriptions>
                    )
                  })
                  return itemRender
                }
                else {
                  return null
                }
              })}
              </>
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default Clients;
