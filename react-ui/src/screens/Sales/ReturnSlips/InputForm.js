import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  InputNumber,
  Input,
  Select,
  Alert,
  Modal,
  Row,
  Col,
  Typography,
  Table,
  Empty,
  message,
} from 'antd';
import { SelectOutlined, InfoCircleFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import FormItem from '../../../components/forms/FormItem';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onCancel, onSubmit, values, formDetails, formTable } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const { path } = useRouteMatch();
  const hasTable = formTable !== null && typeof formTable !== 'undefined';

  const [tableData, setTableData] = useState(null);
  const [tableSelectedKeys, setTableSelectedKeys] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [selectedSaleSlip, setSelectedSaleSlip] = useState([]);
  const [toggleValue, setToggleValue] = useState(null);

  const [loadingModal, setLoadingModal] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [processingData, setProcessingData] = useState(false);

  const orderSlips = useSelector((state) => state.sales.orderSlips.orderSlipsList);
  const salesInvoices = useSelector((state) => state.sales.salesInvoice.salesInvoiceList);
  let salesSlips = [];
  salesSlips = salesSlips.concat(orderSlips).concat(salesInvoices);

  const toggleName = formDetails.toggle_name;

  useEffect(() => {
    form.setFieldsValue(values);
    if (hasTable) {
      setTableData(form.getFieldValue(formTable.name));
      let selectedKeys = []
      if(values !== null && values[formTable.name] !== null){
        values[formTable.name].forEach((item) => {
          selectedKeys.push(item[formTable.foreignKey])
        })
      }
      selectedKeys = selectedKeys.filter((v, i, a) => a.indexOf(v) === i)
      setTableSelectedKeys(selectedKeys)
    }
    if (values !== null && toggleName !== null && typeof toggleName !== 'undefined') {
      setToggleValue(values[toggleName]);
    }
    // eslint-disable-next-line
  }, [values, form]);

  const onFinish = (data) => {
    setProcessingData(true)
    formDetails.form_items.forEach((item) => {
      if (
        item.type === 'date' &&
        typeof data[item.name] !== 'undefined' &&
        data[item.name] !== null
      ) {
        data[item.name] = `${data[item.name].format('YYYY-MM-DD')}T${data[item.name].format(
          'HH:mm:ss'
        )}`;
      }
    });

    if (hasTable) {
      if (tableData !== null) {
        data[formTable.name] = tableData;
        onSubmit(data).then(() => {
          setProcessingData(false)
        })
      } else {
        onFinishFailed(
          `Unable to submit. Please provide the necessary information on ${formTable.label}`
        );
      }
    } else {
      onSubmit(data).then(() => {
        setProcessingData(false)
      })
    }
  };

  const onFinishFailed = (errorInfo) => {
    if (typeof errorInfo === 'string') {
      message.error(errorInfo);
    } else {
      message.error("An error has occurred. Please double check the information you've provided.");
    }
  };

  // for rendering tables
  const renderTableColumns = (item) => {
    const columns = [];
    item.fields.forEach((field) => {
      if (!field.readOnly) {
        if (field.type === 'number') {
          columns.push({
            title: field.label,
            key: field.name,
            render: (row) => {
              const index = tableData.indexOf(row);
              return (
                <Form.Item
                  name={[index, field.name]}
                  fieldKey={[index, field.name]}
                  rules={field.rules}
                  initialValue={field.initialValue}
                >
                  <InputNumber min={field.min} max={field.max} />
                </Form.Item>
              );
            },
          });
        } else if (field.type === 'hidden' || field.type === 'hiddenNumber') {
          columns.push({
            key: field.name,
            visible: false,
          });
        } else if (field.type === 'readOnly') {
          columns.push({
            title: field.label,
            key: field.name,
            render: (row) => {
              const index = tableData.indexOf(row);
              return (
                <Form.Item
                  name={[index, field.name]}
                  fieldKey={[index, field.name]}
                  rules={field.rules}
                >
                  <Input bordered={false} />
                </Form.Item>
              );
            },
          });
        } else if (field.type === 'select') {
          columns.push({
            title: field.label,
            key: field.name,
            visible: false,
            render: (row) => {
              const index = tableData.indexOf(row);
              if (typeof field.render === 'undefined') {
                if (typeof field.selectName === 'undefined') {
                  field.selectName = 'name';
                }
                field.render = (choice) => choice[field.selectName];
              }

              if (field.choices === null || field.choices.length === 0) {
                onFail();
                return null;
              }
              return (
                <Form.Item
                  name={[index, field.name]}
                  fieldKey={[index, field.name]}
                  rules={field.rules}
                  initialValue={field.initialValue}
                >
                  <Select placeholder={field.placeholder}>
                    {field.choices.map((choice) => (
                      <Select.Option value={choice.id}>{field.render(choice)}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              );
            },
          });
        } else {
          if (typeof field.render === 'undefined' || field.render === null) {
            field.render = (object) => object[field.name];
          }
          columns.push({
            title: field.label,
            key: field.name,
            render: (object) => field.render(object),
          });
        }
      }
    });

    return columns;
  };

  const onModalSelect = (selectedRowKeys, selectedRows) => {
    setTableSelectedKeys(selectedRowKeys)
    let prevSelectData = []
    if(typeof form.getFieldValue(formTable.name) !== 'undefined'){
      prevSelectData = form.getFieldValue(formTable.name).filter((item) => selectedRowKeys.includes(item[formTable.selectedKey]))
    }

    let processedData = []
    selectedRows.forEach((rowData) => {
      const index = prevSelectData.findIndex((item) => item[formTable.selectedKey] === rowData[formTable.selectedKey])
      if(index !== -1){
        processedData.push(prevSelectData[index])
      }
      else {
        processedData = processedData.concat(formTable?.processData(rowData) ?? [rowData])
      }
    })

    const fieldsValue = {};
    fieldsValue[formTable.name] = processedData;
    setTableData(processedData);
    form.setFieldsValue(fieldsValue);
  }

  const expandedRowRender = (row) => {
    if (formTable.hasOwnProperty('nestedData')) {
      return (
        <>
          <Title level={5}>{formTable.nestedData.label}</Title>
          <Table
            columns={formTable.nestedData.fields}
            dataSource={row[formTable.nestedData.data]}
            pagination={false}
          />
        </>
      );
    }
    else {
      return null
    }
  };

  const onFail = () => {
    history.push(`${path.replace(new RegExp('/new|[0-9]|:id'), '')}`);
  };

  const onValuesChange = (values) => {
    if (toggleName !== null && typeof toggleName !== 'undefined') {
      if (typeof values[toggleName] !== 'undefined' && toggleValue !== values[toggleName]) {
        setToggleValue(values[toggleName]);
      }
    }
    if (values.hasOwnProperty(formTable.name)) {
      setTableData(form.getFieldValue(formTable.name));
      console.log(form.getFieldsValue());
      console.log(tableData);
    }

    if (values.hasOwnProperty('depot')) {
      setOrderedProducts([]);
      setSelectedSaleSlip([]);
      setTableData(null);
      form.setFieldsValue({ salesNumber: null, client: null });
    }
  };

  const onTableSelect = (key, value) => {
    const formValues = {};

    if (key === 'salesNumber') {
      const selectedSaleSlip = salesSlips.find((slip) => slip.id === value);
      formValues[key] = selectedSaleSlip.number;
      formValues.client = selectedSaleSlip.salesOrder.client.id;
      setOrderedProducts(selectedSaleSlip.orderedProducts);
    } else {
      formValues[key] = value;
    }
    onValuesChange(formValues);
    form.setFieldsValue(formValues);
  };

  return (
    <>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row>
        <Col span={20}>
          <Form
            {...styles.layout}
            form={form}
            initialValues={values}
            name={formDetails.form_name}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
          >
            {formDetails.form_items.map((item) => {
              return <FormItem item={item} onFail={onFail} />;
            })}

            {formDetails.rs_items.map((item) => {
              const itemData = {
                ...item,
              };

              if (item.name === 'salesNumber') {
                itemData.selectedData = selectedSaleSlip;
                itemData.setSelectedData = setSelectedSaleSlip;
              }

              return <FormItem item={itemData} onFail={onFail} onTableSelect={onTableSelect} />;
            })}
            {(orderedProducts?.length ?? 0) > 0 ? (
              <Form.List label={formTable.label} name={formTable.name} rules={[{ required: true }]}>
                {(fields, { errors }) => (
                  <Col span={20} offset={1}>
                    <div style={{ float: 'right', marginBottom: '1%' }}>
                      <Button
                        onClick={() => {
                          setDisplayModal(true);
                          setLoadingModal(false);
                        }}
                        icon={<SelectOutlined />}
                      >
                        {`Select ${formTable.label}`}
                      </Button>
                    </div>
                    <Table
                      dataSource={tableData}
                      columns={renderTableColumns(formTable)}
                      pagination={false}
                      locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                      summary={formTable.summary}
                    />
                  </Col>
                )}
              </Form.List>
            ) : (
              <Col span={15} offset={6}>
              <Alert
                message={formTable?.emptyText ?? `Please provide the necessary data for ${formTable.label}`}
                type="warning"
                showIcon
                icon={<InfoCircleFilled style={{color: '#d4d4d4'}}/>}
                style={{backgroundColor: '#ebebeb', borderColor: '#ebebeb'}}
              />
              </Col>
            )}
            <div style={styles.tailLayout}>
              <Button type="primary" onClick={() => form.submit()} loading={processingData}>
                Submit
              </Button>
              <Button
                style={{ marginRight: '2%' }}
                disabled={processingData}
                onClick={() => {
                  onCancel();
                  history.goBack();
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
          {!loadingModal && hasTable && (
            <Modal
              visible={displayModal}
              title="Modal"
              onOk={() => setDisplayModal(false)}
              onCancel={() => setDisplayModal(false)}
              cancelButtonProps={{ style: { display: 'none' } }}
              width={1000}
            >
            <Table
              rowSelection={{
                type: 'checkbox',
                //selectedRowKeys: item.selectedData,
                onChange: onModalSelect,
                preserveSelectedRowKeys: false,
                selectedRowKeys: tableSelectedKeys
              }}
              columns={formTable.selectFields}
              dataSource={orderedProducts}
              rowKey={formTable.selectedKey}
              pagination={{simple: true}}
              expandable={{ expandedRowRender: formTable.hasOwnProperty('nestedData') ? expandedRowRender : null }}
            />
            </Modal>
          )}
        </Col>
      </Row>
    </>
  );
};

export default InputForm;

const styles = {
  layout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 15,
    },
  },
  listItems: {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  },
  listLayout: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '2%',
  },
  tailLayout: {
    marginTop: '2%',
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '87.5%',
  },
  listTailLayout: {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  },
  formList: {
    borderStyle: 'solid',
    borderWidth: 1,
    padding: '2%',
    // backgroundColor: "#FAFAFA",
    width: '87.5%',
    marginBottom: '2%',
  },
  datePicker: {
    float: 'left',
  },
  inputNumber: {
    float: 'left',
  },
  inputCheckList: {
    float: 'left',
  },
};
