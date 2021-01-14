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
import { useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import _ from 'lodash';
import { formDetails, tableProduct, tableProductInventory, initValueForm } from './data';
import FormItem from '../../../components/forms/FormItem';
import { EditableRow, EditableCell } from '../../../components/TableRowInput';
import { updateList, fromatInitForm } from '../../../helpers/general-helper';
import { formatProduct, formatProductCalc } from './helpers';


const { Title } = Typography;

const InputForm = (props) => {
  const { title, onSubmit } = props;
  const { id } = useParams();
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
  const { salesOrderList } = useSelector((state) => state.sales.salesOrders);

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
      setProductInv(_.filter(productInventoryList, (o) => {
        return o.depot.id === selectedSales.depot.id;
      }));
    }
  }, [salesOrderList, id, form, productInventoryList]);

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
    const formItem = _.find(newForm.form_items, {name: 'depot'});
    const masterList = {
      depot: depotList,
      client: clientList,
    };

    const handleDepotChange = (value) => {
      form.setFieldsValue({product: []});
      setRequestedProductList([]);
      setProductInv(_.filter(productInventoryList, (o) => {
        return o.depot.id === value;
      }));
    }

    formItem.onChange = (e) => handleDepotChange(e);
    setTempFormDetails(updateList(newForm, masterList));
  }, [depotList, clientList, tempFormDetails, productInventoryList, form]);

  const selectProductItems = () => {
    setProductModal(true);
    // setModalContentLoading(true);
    // dispatch(listProductInventory()).then(() => {
    //   setModalContentLoading(false);
    // });
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
          handleSave: (data, rowRecord) => {
            let currentProduct = _.clone(
              _.find(requestedProductList, (prod) => prod.id === rowRecord.id)
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
              (object) => object.id === rowRecord.id
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
              checked={_.some(requestedProductList, (o) => {
                return o.id === row.id;
              })}
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
      const removedList = _.remove(requestedProductList, (o) => {
        return o.id !== data.id;
      });
      form.setFieldsValue({ product: removedList });
      setRequestedProductList(removedList);
    }
  };

  const onFail = () =>{
    console.log("Failed")
    history.push(`/${path.split('/')[1]}/${path.split('/')[2]}`);
  }
  
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
                      selectProductItems();
                    }}
                    style={{ width: '40%', float: 'right' }}
                  >
                    Select/Remove Product item(s)
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
        >
          <Table
            columns={renderProductItemColumns(tableProductInventory)}
            dataSource={productInv}
            pagination={false}
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
