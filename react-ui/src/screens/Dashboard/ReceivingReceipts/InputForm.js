import React, {  useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Form,
  Button,
  Input,
  InputNumber,
  Select,
  Modal,
  Row,
  Col,
  Typography,
  Table,
  Empty,
  message,
  Alert,
  TimePicker,
} from 'antd';
import { SelectOutlined, InfoCircleFilled } from '@ant-design/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import FormItem from '../../../components/forms/FormItem';
import TableHeader from '../../../components/TableDisplay/TableHeader';

const { Title } = Typography;

const FormScreen = (props) => {
  const { title, onCancel, onSubmit, values, formDetails, formTable } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const { path } = useRouteMatch();
  const hasTable = formTable !== null && typeof formTable !== 'undefined';

  const [toggleValue, setToggleValue] = useState(null);
  const [tableData, setTableData] = useState();
  const [tableSelectedKeys, setTableSelectedKeys] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);

  const toggleName = formDetails.toggle_name;
  const { isVisible, selectData, preloadedData, foreignKey, name } = formTable ?? { isVisible: null, selectData: null, preloadedData: null, foreignKey: null, name: null };
  const { user } = useSelector((state) => state.auth);
  const [selectedPO, setSelectedPO] = useState([]);

  const onFail = useCallback(() => {
    history.push(`${path.replace(new RegExp('/new|[0-9]|:id'), '')}`);
  }, [history, path]);

  useEffect(() => {
    form.setFieldsValue({
      receivedBy: `${user.firstName} ${user.lastName}`,
    });
  }, [user, form]);

  useEffect(() => {
    if (!(isVisible ?? (selectData?.length ?? 0) > 0) && preloadedData) {
      // selected data was pre-loaded but is empty
      onFail();
    }
  }, [isVisible, selectData, preloadedData, onFail])

  useEffect(() => {
    form.setFieldsValue(values);
    if (hasTable) {
      setTableData(form.getFieldValue(name));
      let selectedKeys = [];
      if (values !== null && values[name] !== null) {
        values[name].forEach((item) => {
          selectedKeys.push(item[foreignKey]);
        });
      }
      selectedKeys = selectedKeys.filter((v, i, a) => a.indexOf(v) === i);
      setTableSelectedKeys(selectedKeys);
    }
    if (values !== null && toggleName !== null && typeof toggleName !== 'undefined') {
      setToggleValue(values[toggleName]);
    }

    if (typeof formDetails.required_data !== 'undefined') {
      formDetails.required_data.forEach((data) => {
        if (data === null || data.length === 0) {
          onFail();
        }
      });
    }
  }, [form, values, hasTable, toggleName, formDetails.required_data, name, foreignKey, onFail]);

  const onFinish = (data) => {
    setLoading(true);
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

    formDetails.tolling_details.forEach((item) => {
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
      setLoading(false);
    });
  };

  const onFinishFailed = () => {
    message.error("An error has occurred. Please double check the information you've provided.");
  };

  // for rendering tables
  const renderTableColumns = (item) => {
    const columns = [];
    item.fields.forEach((field) => {
      if (!field.readOnly) {
        if (field.type === 'input') {
          columns.push({
            title: field.label,
            width: field.width,
            key: field.name,
            render: (row) => {
              const index = tableData.indexOf(row);
              return (
                <Form.Item
                  name={[index, field.name]}
                  fieldKey={[index, field.name]}
                  rules={field.rules}
                  wrapperCol={{ span: 24, offset: 0 }}
                  initialValue={field.initialValue}
                >
                  <Input placeholder={field.placeholder ?? ''} />
                </Form.Item>
              );
            },
          });
        } else if (field.type === 'number') {
          columns.push({
            title: field.label,
            width: field.width,
            key: field.name,
            render: (row) => {
              const index = tableData.indexOf(row);
              return (
                <Form.Item
                  name={[index, field.name]}
                  fieldKey={[index, field.name]}
                  rules={field.rules}
                  wrapperCol={{ span: 24, offset: 0 }}
                  initialValue={field.initialValue}
                >
                  <InputNumber min={field.min} max={field.max} />
                </Form.Item>
              );
            },
          });
        } else if (field.type === 'timepicker') {
          columns.push({
            title: field.label,
            width: field.width,
            key: field.name,
            render: (row) => {
              const index = tableData.indexOf(row);

              return (
                <Form.Item
                  name={[index, field.name]}
                  fieldKey={[index, field.name]}
                  rules={field.rules}
                  initialValue={field.initialValue}
                  wrapperCol={{ span: 24, offset: 0 }}
                >
                  <TimePicker use12Hours format="h:mm a" />
                </Form.Item>
              );
            },
          });
        } else if (field.type === 'hidden' || field.type === 'hiddenNumber') {
          columns.push({
            key: field.name,
            width: field.width,
            visible: false,
          });
        } else if (field.type === 'select' || field.type === 'selectSearch') {
          columns.push({
            title: field.label,
            key: field.name,
            width: field.width,
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
                  wrapperCol={{ span: 24, offset: 0 }}
                >
                  <Select
                    showSearch={field.type === 'selectSearch'}
                    placeholder={field.placeholder}
                  >
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
            width: field.width,
            render: (object) => field.render(object),
          });
        }
      }
    });

    return columns;
  };

  const onTableSelect = (selectedRowKeys, selectedRows) => {
    setTableSelectedKeys(selectedRowKeys);
    let prevSelectData = [];
    if (typeof form.getFieldValue(formTable.name) !== 'undefined') {
      prevSelectData = form
        .getFieldValue(formTable.name)
        .filter((item) => selectedRowKeys.includes(item[formTable.selectedKey]));
    }

    let processedData = [];
    selectedRows.forEach((rowData) => {
      const index = prevSelectData.findIndex(
        (item) => item[formTable.selectedKey] === rowData[formTable.selectedKey]
      );
      if (index !== -1) {
        processedData.push(prevSelectData[index]);
      } else {
        processedData = processedData.concat(formTable?.processData(rowData) ?? [rowData]);
      }
    });

    const fieldsValue = {};
    fieldsValue[formTable.name] = processedData;
    setTableData(processedData);
    form.setFieldsValue(fieldsValue);
  };

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

    return null;
  };

  const onValuesChange = (values) => {
    if (hasTable && values.hasOwnProperty(formTable.name)) {
      setTableData(form.getFieldValue(formTable.name));
    }

    if (toggleName !== null && typeof toggleName !== 'undefined') {
      if (typeof values[toggleName] !== 'undefined' && toggleValue !== values[toggleName]) {
        setToggleValue(values[toggleName]);
      }
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
              if (item.toggle) {
                if (item.toggleCondition(toggleValue)) {
                  return <FormItem item={item} onFail={onFail} />;
                }
                return null;
              }

              return <FormItem item={item} onFail={onFail} formInstance={form} />;
            })}

            {(typeof formTable.isVisible === 'undefined' || formTable.isVisible) &&
              formDetails.tolling_details.map((item) => {
                if (item.toggle) {
                  if (item.toggleCondition(toggleValue)) {
                    return <FormItem item={item} onFail={onFail} />;
                  }
                  return null;
                }

                return <FormItem item={item} onFail={onFail} />;
            })}

            {hasTable &&
              ((formTable?.isVisible ?? formTable.selectData.length > 0) ? (
                <Form.List
                  label={formTable.label}
                  name={formTable.name}
                  rules={formTable?.rules ?? [{ required: true }]}
                >
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
                        pagination={{ simple: true }}
                        locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                        summary={formTable.summary}
                      />
                    </Col>
                  )}
                </Form.List>
              ) : (
                <Col span={15} offset={6}>
                  <Alert
                    message={
                      formTable?.emptyText ??
                      `Please provide the necessary data for ${formTable.label}`
                    }
                    type="warning"
                    showIcon
                    icon={<InfoCircleFilled style={{ color: '#d4d4d4' }} />}
                    style={{ backgroundColor: '#ebebeb', borderColor: '#ebebeb' }}
                  />
                </Col>
              ))}
          </Form>

          <div style={styles.tailLayout}>
            <Button
              type="primary"
              loading={loading}
              onClick={() => form.submit()}
              disabled={
                hasTable && !((formTable?.isVisible ?? formTable.selectData.length > 0))
              }
            >
              Submit
            </Button>
            <Button
              style={{ marginRight: '2%' }}
              disabled={loading}
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
                  // selectedRowKeys: item.selectedData,
                  onChange: onTableSelect,
                  preserveSelectedRowKeys: false,
                  selectedRowKeys: tableSelectedKeys,
                }}
                columns={TableHeader({
                  columns: formTable.selectFields,
                  hasSorter: true,
                  hasFilter: true,
                })}
                dataSource={formTable.selectData}
                rowKey={formTable.selectedKey}
                pagination={{ simple: true }}
                expandable={{
                  expandedRowRender: formTable.hasOwnProperty('nestedData')
                    ? expandedRowRender
                    : null,
                }}
              />
            </Modal>
          )}
        </Col>
      </Row>
    </>
  );
};

export default FormScreen;

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
    width: '87.5%',
    marginTop: '2%',
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
