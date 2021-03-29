import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  InputNumber,
  Input,
  Select,
  Modal,
  Row,
  Col,
  Typography,
  Table,
  Empty,
  Alert,
  message,
} from 'antd';
import { SelectOutlined, InfoCircleFilled } from '@ant-design/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import FormItem from '../../../components/forms/FormItem';

const { Title, Text } = Typography;

const InputForm = (props) => {
  const { title, onCancel, onSubmit, values, formDetails, formTable } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const { path } = useRouteMatch();
  const hasTable = formTable !== null && typeof formTable !== 'undefined';

  const [tableData, setTableData] = useState();
  const [tableSelectedKeys, setTableSelectedKeys] = useState([]);

  const [loadingModal, setLoadingModal] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [processingData, setProcessingData] = useState(false);

  useEffect(() => {
    form.setFieldsValue(values);
    setTableData(form.getFieldValue(formTable.name));

    const selectedKeys = []
    if(values !== null && values[formTable.name] !== null){
      values[formTable.name].forEach((item) => {
        selectedKeys.push(item[formTable.selectedKey])
      })
      setTableData(values[formTable.name])
    }
    setTableSelectedKeys(selectedKeys)

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
    onSubmit(data).then(() => {
      setProcessingData(false)
    })
  };

  const onFinishFailed = () => {
    message.error("An error has occurred. Please double check the information you've provided.");
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
                  labelCol={0}
                  wrapperCol={24}
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

  const onTableSelect = (selectedRowKeys, selectedRows) => {
    setTableSelectedKeys(selectedRowKeys)
    let prevSelectData = []
    if(typeof form.getFieldValue(formTable.name) !== 'undefined'){
      prevSelectData = form.getFieldValue(formTable.name).filter((item) => selectedRowKeys.includes(item[formTable.selectedKey]))
    }

    prevSelectData.forEach((data) => {
      const index = selectedRows.findIndex((item) => item[formTable.selectedKey] === data[formTable.selectedKey])
      if(index !== -1){
        selectedRows[index] = data 
      }
    })
  
    const fieldsValue = {};
    fieldsValue[formTable.name] = selectedRows;
    setTableData(selectedRows);
    form.setFieldsValue(fieldsValue);
  }

  const onFail = () => {
    history.push(`${path.replace(new RegExp('/new|[0-9]|:id'), '')}`);
  };

  const onValuesChange = (values) => {
    if (values.hasOwnProperty(formTable.name)) {
      setTableData(form.getFieldValue(formTable.name));
    }

    if (values.hasOwnProperty('payments')) {
      let paymentSum = 0;
      const paymentValues = form.getFieldValue('payments');
      paymentValues.forEach((payment) => {
        if (payment.appliedAmount > 0) {
          paymentSum += payment.appliedAmount;
        }
      });
      const formValues = {};
      formValues.amountPaid = paymentSum;
      form.setFieldsValue(formValues);
    }
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

            {hasTable && ((typeof formTable.isVisible === 'undefined' || formTable.isVisible) ? (
              <Form.List label={formTable.label} name={formTable.name} rules={formTable?.rules ?? [{ required: true }]}>
                {(fields, { errors }) => (
                  <Col span={23} offset={1}>
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
                    <Text style={{color: 'red'}}>{form.getFieldError(formTable.name)}</Text>
                  </Col>
                )}
              </Form.List>
            ): (
              <Col span={15} offset={6}>
              <Alert
                message={formTable?.emptyText ?? `Please provide the necessary data for ${formTable.label}`}
                type="warning"
                showIcon
                icon={<InfoCircleFilled style={{color: '#d4d4d4'}}/>}
                style={{backgroundColor: '#ebebeb', borderColor: '#ebebeb'}}
              />
              </Col>
            ))}
          </Form>

          <div style={styles.tailLayout}>
            <Button 
              type="primary" 
              onClick={() => form.submit()}
              loading={processingData}
            >
              Submit
            </Button>
            <Button
              style={{ marginRight: '2%' }}
              onClick={() => {
                onCancel();
                history.goBack();
              }}
            >
              Cancel
            </Button>
          </div>
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
                  onChange: onTableSelect,
                  //preserveSelectedRowKeys: false,
                  selectedRowKeys: tableSelectedKeys
                }}
                columns={formTable.selectFields}
                dataSource={formTable.selectData}
                rowKey={formTable.selectedKey}
                pagination={{simple: true}}
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
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: '2%',
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
