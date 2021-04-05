import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Form, Table, Space, Button, Skeleton, Modal, message, Empty, InputNumber, Alert } from 'antd';
import { PlusOutlined, DeleteOutlined, SelectOutlined, InfoCircleFilled } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import _ from 'lodash';
import FormDetails from './data';
import FormItem from '../../../components/forms/FormItem';
import { updateList } from '../../../helpers/general-helper';
import { formatProduct, calcRqstdQtyPerProduct } from './helpers';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onSubmit } = props;
  const [form] = useForm();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { formDetails, tableDetails, tableProductInventory } = FormDetails();

  const [contentLoading, setContentLoading] = useState(true);
  const [processingData, setProcessingData] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [productInv, setProductInv] = useState([]);
  const [requestedProductList, setRequestedProductList] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { list: depotList } = useSelector((state) => state.maintenance.depots);
  const { list: clientList } = useSelector((state) => state.maintenance.clients);
  const { list: productInventoryList } = useSelector((state) => state.dashboard.productInventories);

  useEffect(() => {
    form.setFieldsValue({
      preparedBy: `${user.firstName} ${user.lastName}`,
      approvedBy: `${user.firstName} ${user.lastName}`,
      requestedBy: `${user.firstName} ${user.lastName}`,
    });

    setContentLoading(false);
  }, [user, form]);

  useEffect(() => {
    const newForm = tempFormDetails;
    const formItem = _.find(newForm.form_items, { name: 'depot' });
    const masterList = {
      depot: depotList,
      client: clientList,
    };

    const handleDepotChange = (value) => {
      form.setFieldsValue({ product: [] });
      setRequestedProductList([]);
      setProductInv(
        _.filter(productInventoryList, (o) => {
          return o.depot?.id === value && o.quantity !== 0 ;
        })
      );
    };

    formItem.onChange = (e) => handleDepotChange(e);
    setTempFormDetails(updateList(newForm, masterList));
  }, [depotList, clientList, tempFormDetails, productInventoryList, form]);

  const handleChange = (value, index, name) => {
    setRequestedProductList((prevData) => {
      const newData = [...prevData];
      const newItem = {...newData[index]};
      newItem[name] = value;
      newData[index] = newItem;
      newData[index]['amount'] = (newData[index]['quantityRequested'] 
      * newData[index]['unitPrice']).toFixed(2);

      return calcRqstdQtyPerProduct(newData);
    })
  }

  const handleRemoveSalesProduct = (data) => {
    const newData = [...requestedProductList];
    setRequestedProductList(calcRqstdQtyPerProduct(_.filter(newData, (o) => o.key !== data.key)));
  };

  const handleAddSalesProduct = (data) => {
    if (data.quantity !== 0 && data.quantity > 0) {
      const newData = _.clone(formatProduct(data));
      if (requestedProductList.length !== 16) {
        if (requestedProductList.length !== 0) {
          const { key } = _.last(requestedProductList);
          newData.key = key + 1;

          form.setFieldsValue({ product: requestedProductList.concat(newData) });
          setRequestedProductList(calcRqstdQtyPerProduct(requestedProductList.concat(newData)));
        } else {
          newData.key = 1;
          setRequestedProductList(calcRqstdQtyPerProduct(requestedProductList.concat(newData)));
        }
      } else {
        message.warning('Cannot add more than 16 requested products');
      }
      setProductModal(false);
    } else {
      message.warning('Cannot add requested product with empty stock on hand');
    }
  };

  const renderTableColumns = (table) => table.fields.map((col) => {
    if(!col.editable) {
      if (col.title === 'Action') {
        const filteredColumn = {
          ...col,
          render: (row) => {
            return (
              <Button
                type="dashed"
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveSalesProduct(row)}
                danger
              />
            );
          },
        };
  
        return filteredColumn;
      }
  
      return col;
    }
    return {
      ...col, 
      render: (value, _, index) => <InputNumber
      value={value} min={ col.dataIndex === 'unitPrice' ? 0 : 1}
      precision={col.dataIndex === 'unitPrice' ? 2 : 0}
      onChange={(value) => handleChange(value, index, col.dataIndex)}/>,
    }
  }) 

  // render Product Items with add button
  const renderProductItemColumns = (rawColumns) => {
    let filteredColumn = [
      {
        title: 'Action',
        key: 'action',
        render: (row) => {
          return (
            <Button
              type="dashed"
              onClick={() => handleAddSalesProduct(row)}
              icon={<PlusOutlined />}
              primary
            />
          );
        },
      },
    ];

    const inputColumn = rawColumns.slice();

    filteredColumn = filteredColumn.concat(inputColumn);

    return filteredColumn;
  };

  const onFail = () => {
    history.push(`/${path.split('/')[1]}/${path.split('/')[2]}`);
  };

  const onFinish = () => {
    setProcessingData(true)
    form.setFieldsValue({salesOrderProducts: requestedProductList});
    onSubmit(form.getFieldsValue()).then(() => {
      setProcessingData(false)
      history.goBack();
    })
  };

  return (
    <>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row>
        <Col span={20} offset={1}>
          {contentLoading ? (
            <Skeleton />
          ) : (
              <Form form={form} onFinish={onFinish} {...styles.formLayout}>
                {_.dropRight(tempFormDetails.form_items).map((item) => (
                  <FormItem key={item.name} onFail={onFail} item={item} />
                ))}
                { productInv.length !== 0 ? 
                  <Form.List
                    label={tableDetails.label} 
                    name={tableDetails.name}
                  >
                    {(fields) => (
                      <Form.Item
                        wrapperCol={{ span: 17, offset: 3 }}
                      >
                        <Form.Item wrapperCol={{ offset: 15, span: 11 }}>
                          <Button
                            icon={<SelectOutlined />}
                            onClick={() => {
                              setProductModal(true);
                            }}
                          >
                            {`Select ${tableDetails.label}`}
                          </Button>
                        </Form.Item>
                        <Form.Item> 
                          <Table
                            rowKey={record => record.uid}
                            dataSource={requestedProductList}
                            columns={renderTableColumns(tableDetails)}
                            pagination={false}
                            locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                          />
                        </Form.Item>
                      </Form.Item>
                    )}
                  </Form.List>  
                : 
                  <Form.Item wrapperCol={{ span: 15, offset: 4 }}>
                    <Alert
                      message={tableDetails?.emptyText ?? `Please provide the necessary data for ${tableDetails.label}`}
                      type="warning"
                      showIcon
                      icon={<InfoCircleFilled style={{color: '#d4d4d4'}}/>}
                      style={{backgroundColor: '#ebebeb', borderColor: '#ebebeb'}}
                    />
                  </Form.Item>
                }
                <FormItem onFail={onFail} item={_.last(formDetails.form_items)} />
                <Form.Item wrapperCol={{ offset: 15, span: 4 }}>
                  <Space size={16}>
                    <Button htmlType="button" onClick={() => history.goBack()} disabled={processingData}>
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" loading={processingData}>
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
          )}
        </Col>
        <Modal
          title="Product List"
          visible={productModal}
          onCancel={() => setProductModal(false)}
          onOk={() => setProductModal(false)}
          cancelButtonProps={{ style: { display: 'none' } }}
          width={1000}
          footer={null}
        >
          <Table
            rowKey={record => record.uid}
            columns={renderProductItemColumns(tableProductInventory)}
            dataSource={productInv}
            pagination={{simple: true}}
          />
        </Modal>
      </Row>
    </>
  );
};

export default InputForm;

const styles = {
  formLayout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 11,
      offset: 2,
    },
  },
  layout: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  datePicker: {
    display: 'flex',
    justifyContent: 'start',
  },
};
