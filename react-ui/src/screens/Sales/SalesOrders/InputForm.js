import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Typography,
  Form,
  Table,
  Space,
  Button,
  Skeleton,
  Modal,
  Checkbox,
  message,
} from 'antd';
import Layout from 'antd/lib/layout/layout';
import { useForm } from 'antd/lib/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import _ from 'lodash';
import { formDetails, tableProduct, tableProductInventory, initValueForm } from './data';
import FormItem from '../../../components/forms/FormItem';
import { listDepot } from '../../Maintenance/Depots/redux';
import { listClient } from '../../Maintenance/Clients/redux';
import { listProductInventory } from '../../Maintenance/redux/productInventory';
import { EditableRow, EditableCell } from '../../../components/TableRowInput';
import { updateList, fromatInitForm } from '../../../helpers/general-helper';
import { formatProduct, formatProductCalc } from './helpers';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, company, onSubmit } = props;
  const { id } = useParams();
  const [form] = useForm();
  const history = useHistory();
  const [contentLoading, setContentLoading] = useState(true);
  const [modalContentLoading, setModalContentLoading] = useState(true);
  const [productModal, setProductModal] = useState(false);
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [requestedProductList, setRequestedProductList] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { list: depotList } = useSelector((state) => state.maintenance.depots);
  const { list: clientList } = useSelector((state) => state.maintenance.clients);
  const { list: productInventoryList } = useSelector((state) => state.maintenance.productInventory);
  const { salesOrderList } = useSelector((state) => state.sales.salesOrders);
  const dispatch = useDispatch();
  const component = {
    body: {
      cell: EditableCell,
      row: EditableRow,
    },
  };

  useEffect(() => {
    if (id !== undefined && salesOrderList.length !== 0) {
      const selectedSales = _.find(salesOrderList, (o) => {
        return o.id === parseInt(id, 10);
      });

      form.setFieldsValue(fromatInitForm(selectedSales, initValueForm));
      form.setFieldsValue({ product: formatProductCalc(selectedSales.products) });
      setRequestedProductList(formatProductCalc(selectedSales.products));
    }
  }, [salesOrderList, id, form]);

  useEffect(() => {
    dispatch(listDepot()).then(() => {
      form.setFieldsValue({
        preparedBy: `${user.firstName} ${user.lastName}`,
        approvedBy: `${user.firstName} ${user.lastName}`,
        requestedBy: `${user.firstName} ${user.lastName}`,
      });
      dispatch(listClient({ company })).then(() => {
        setContentLoading(false);
      });
    });
  }, [dispatch, user, company, form]);

  useEffect(() => {
    const newForm = tempFormDetails;
    const masterList = {
      depot: depotList,
      client: clientList,
    };
    setTempFormDetails(updateList(newForm, masterList));
  }, [depotList, clientList, tempFormDetails]);

  const selectProductItems = () => {
    setProductModal(true);
    setModalContentLoading(true);
    dispatch(listProductInventory()).then(() => {
      setModalContentLoading(false);
    });
  };

  const modProductColumn = tableProduct.map((col) => {
    if (!col.editable) {
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
          handleSave: (data, record) => {
            let currentProduct = _.clone(
              _.find(requestedProductList, (prod) => prod.id === record.id)
            );
            Object.entries(data).forEach(([key, value]) => {
              currentProduct = { ...currentProduct, [key]: value };

              if (key === 'quantityRequested') {
                currentProduct = {
                  ...currentProduct,
                  quantityRemaining: currentProduct.quantity - value,
                  amount: (currentProduct.unitPrice * value).toFixed(2),
                };
              }

              if (key === 'unitPrice') {
                currentProduct = {
                  ...currentProduct,
                  amount: (currentProduct.quantityRequested * value).toFixed(2),
                };
              }
            });

            const indexProduct = _.findIndex(
              requestedProductList,
              (object) => object.id === record.id
            );
            const newArray = _.clone(requestedProductList);
            newArray.splice(indexProduct, 1, currentProduct);
            setRequestedProductList(newArray);
            form.setFieldsValue({ product: newArray });
          },
        };
      },
    };
  });

  // render Product Items with checkbox
  const renderProductItemColumns = (rawColumns) => {
    let filteredColumn = [
      {
        title: 'Action',
        key: 'select',
        render: (row) => {
          return (
            <Checkbox
              onChange={(e) => {
                onItemSelect(row, e.target.checked);
              }}
              checked={
                !!requestedProductList.some((item) => {
                  return item.id === row.id;
                })
              }
            />
          );
        },
      },
    ];

    const inputColumn = rawColumns.slice();

    filteredColumn = filteredColumn.concat(inputColumn);

    return filteredColumn;
  };

  // Check box function callback upon onChange
  const onItemSelect = (data, selected) => {
    if (selected) {
      if (data.quantity !== 0 && data.quantity > 0) {
        setRequestedProductList(requestedProductList.concat(formatProduct(data)));
      } else {
        message.warning('Cannot add requested product with empty stock on hand');
      }
    } else {
      const selectedItems = requestedProductList.slice();
      selectedItems.pop(formatProduct(data));
      form.setFieldsValue({ product: selectedItems });
      setRequestedProductList(selectedItems);
    }
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
                {_.dropRight(tempFormDetails.form_items).map((item, i) => (
                  <FormItem key={i} item={item} />
                ))}
                <Form.Item
                  wrapperCol={{ span: 15, offset: 4 }}
                  name="product"
                  rules={[{ required: true, message: 'Please select a product' }]}
                >
                  <Table
                    components={component}
                    columns={modProductColumn}
                    rowClassName={() => 'editable-row'}
                    dataSource={requestedProductList}
                    pagination={false}
                  />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 11 }}>
                  <Button
                    onClick={() => {
                      selectProductItems();
                    }}
                    style={{ width: '40%', float: 'right' }}
                  >
                    Select/Remove Product item(s)
                  </Button>
                </Form.Item>
                <FormItem item={_.last(formDetails.form_items)} />
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
        >
          {modalContentLoading ? (
            <Skeleton />
          ) : (
            <Table
              columns={renderProductItemColumns(tableProductInventory)}
              dataSource={productInventoryList}
              pagination={false}
            />
          )}
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
