import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Form, Table, Space, Button, Skeleton, Modal, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Layout from 'antd/lib/layout/layout';
import { useForm } from 'antd/lib/form/Form';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import _ from 'lodash';
import { formDetails, tableProduct, tableProductInventory } from './data';
import FormItem from '../../../components/forms/FormItem';
import { EditableRow, EditableCell } from '../../../components/TableRowInput';
import { updateList } from '../../../helpers/general-helper';
import { formatProduct } from './helpers';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onSubmit } = props;
  const [form] = useForm();
  const history = useHistory();
  const { path } = useRouteMatch();

  const [contentLoading, setContentLoading] = useState(true);
  const [productModal, setProductModal] = useState(false);
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [productInv, setProductInv] = useState([]);
  const [requestedProductList, setRequestedProductList] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { list: depotList } = useSelector((state) => state.maintenance.depots);
  const { list: clientList } = useSelector((state) => state.maintenance.clients);
  const { list: productInventoryList } = useSelector((state) => state.maintenance.productInventory);

  const component = {
    body: {
      cell: EditableCell,
      row: EditableRow,
    },
  };

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

  const modProductColumn = tableProduct.map((col) => {
    if (!col.editable) {
      if (col.title === 'Action') {
        const filteredColumn = {
          ...col,
          render: (row) => {
            return (
              <Button
                type="dashed"
                onClick={() => handleRemoveSalesProduct(row)}
                icon={<DeleteOutlined />}
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
      onCell: (record) => {
        return {
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          limit: col.limit,
          title: col.title,
          maxLimit: record.quantity,
          minLimit: 0,
          precisionEnabled: col.precisionEnabled,
          precision: col.precision,
          handleSave: (row) => {
            const newData = [...requestedProductList];
            const index = _.findIndex(newData, (o) => o.key === row.key);
            const item = newData[index];

            row = {
              ...row,
              amount: (row.quantityRequested * row.unitPrice).toFixed(2),
              quantityRemaining: row.quantity - row.quantityRequested,
            };

            newData.splice(index, 1, { ...item, ...row });
            form.setFieldsValue({ product: newData });
            setRequestedProductList(newData);
          },
        };
      },
    };
  });

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

  const handleRemoveSalesProduct = (data) => {
    const newData = [...requestedProductList];
    setRequestedProductList(_.filter(newData, (o) => o.key !== data.key));
  };

  const handleAddSalesProduct = (data) => {
    if (data.quantity !== 0 && data.quantity > 0) {
      const newData = _.clone(formatProduct(data));

      if (requestedProductList.length !== 16) {
        if (requestedProductList.length !== 0) {
          const { key } = _.last(requestedProductList);
          newData.key = key + 1;

          form.setFieldsValue({ product: requestedProductList.concat(newData) });
          setRequestedProductList(requestedProductList.concat(newData));
        } else {
          newData.key = 1;
          setRequestedProductList(requestedProductList.concat(newData));
        }
      } else {
        message.warning('Cannot add more than 16 requested products');
      }
      setProductModal(false);
    } else {
      message.warning('Cannot add requested product with empty stock on hand');
    }
  };

  const onFail = () => {
    console.log('Fail item detected', `/${path.split('/')[1]}/${path.split('/')[2]}`);
    history.push(`/${path.split('/')[1]}/${path.split('/')[2]}`);
  };

  const onFinish = () => {
    onSubmit(form.getFieldsValue());
    history.goBack();
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
            <Layout style={styles.layout}>
              <Form form={form} onFinish={onFinish} {...styles.formLayout}>
                {_.dropRight(tempFormDetails.form_items).map((item) => (
                  <FormItem key={item.name} onFail={onFail} item={item} />
                ))}
                <Form.Item
                  wrapperCol={{ span: 15, offset: 4 }}
                  name="product"
                  rules={[{ required: true, message: 'Please select a product' }]}
                >
                  <Table
                    components={component}
                    columns={modProductColumn}
                    rowClassName={() => styles.editableRow}
                    dataSource={requestedProductList}
                    pagination={false}
                  />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 11 }}>
                  <Button
                    onClick={() => {
                      setProductModal(true);
                    }}
                    style={{ width: '40%', float: 'right' }}
                  >
                    Select Product item(s)
                  </Button>
                </Form.Item>
                <FormItem onFail={onFail} item={_.last(formDetails.form_items)} />
                <Form.Item wrapperCol={{ offset: 15, span: 4 }}>
                  <Space size={16}>
                    <Button htmlType="button" onClick={() => history.goBack()}>
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Layout>
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
