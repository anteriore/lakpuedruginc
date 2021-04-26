import React, { useState } from 'react';
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
  TimePicker,
} from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import FormItem from '../../../components/forms/FormItem';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onCancel, onSubmit, values, formDetails, formTable } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const { path } = useRouteMatch();
  const hasTable = formTable !== null && typeof formTable !== 'undefined';

  const [tableData, setTableData] = useState();
  const [formButtonLoading, setFormButtonLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayVoucherFields, setDisplayVoucherFields] = useState(false);

  const onFinish = (data) => {
    setFormButtonLoading(true);
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

    onSubmit(data).then(() => setFormButtonLoading(false));
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

  const onFail = () => {
    history.push(`${path.replace(new RegExp('/new|[0-9]|:id'), '')}`);
  };

  const onValuesChange = (values) => {
    if (hasTable && values.hasOwnProperty(formTable.name)) {
      setTableData(form.getFieldValue(formTable.name));
    }

    if (values.hasOwnProperty('variation')) {
      switch (values.variation) {
        case 'New':
          setDisplayVoucherFields(false);
          break;
        case 'Adjustment':
          setDisplayVoucherFields(true);
          break;
        default:
          break;
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
              return <FormItem item={item} onFail={onFail} formInstance={form} />;
            })}

            {displayVoucherFields &&
              formDetails.voucher_fields.map((item) => {
                return <FormItem item={item} onFail={onFail} formInstance={form} />;
              })}

            {displayVoucherFields &&
              hasTable &&
              (typeof formTable.isVisible === 'undefined' || formTable.isVisible) && (
                <Form.List
                  label={formTable.label}
                  name={formTable.name}
                  rules={formTable?.rules ?? []}
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
                        pagination={false}
                        locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                        summary={formTable.summary}
                      />
                    </Col>
                  )}
                </Form.List>
              )}

            <FormItem item={formDetails.account_titles} onFail={onFail} formInstance={form} />
          </Form>

          <div style={styles.tailLayout}>
            <Button loading={formButtonLoading} type="primary" onClick={() => form.submit()}>
              Submit
            </Button>
            <Button
              style={{ marginRight: '2%' }}
              disabled={formButtonLoading}
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
                tableLayout="fixed"
                rowSelection={{
                  type: 'radio',
                  // selectedRowKeys: item.selectedData,
                  onChange: (selectedRowKeys, selectedRows) => {
                    const fieldsValue = {};
                    fieldsValue[formTable.name] = selectedRows;
                    setTableData(selectedRows);
                    form.setFieldsValue(fieldsValue);
                  },
                  preserveSelectedRowKeys: false,
                }}
                columns={formTable.selectFields}
                dataSource={formTable.selectData}
                rowKey={formTable.foreignKey}
                pagination={{ size: 'small' }}
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
