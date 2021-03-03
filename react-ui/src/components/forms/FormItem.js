import React from 'react';
import {
  Form,
  Button,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Checkbox,
  Row,
  Typography,
  Space,
  Radio,
  Modal,
  Table,
} from 'antd';
import { PlusOutlined, MinusCircleOutlined, SelectOutlined } from '@ant-design/icons';

const { Item } = Form;
const { Title } = Typography;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';

const FormItem = ({ item, onFail, formMode, onTableSelect }) => {
  if (item.type === 'select' || item.type === 'selectSearch') {
    if (typeof item.render === 'undefined') {
      if (typeof item.selectName === 'undefined') {
        item.selectName = 'name';
      }

      if (item.selectName === 'codename') {
        item.render = (choice) => `[${choice.code}] ${choice.name}`;
      } else {
        item.render = (choice) => choice[item.selectName];
      }
    }

    if (
      item.choices === null ||
      typeof item.choices === 'undefined' ||
      (item.choices.length === 0 && !item.allowEmpty)
    ) {
      onFail();
      return null;
    }

    return (
      <Form.Item
        label={item.label}
        name={item.name}
        rules={item.rules}
        initialValue={item.initialValue}
      >
        <Select
          showSearch={item.type === 'selectSearch'}
          onChange={item.onChange}
          placeholder={item.placeholder}
          optionFilterProp="children"
          disabled={item.type === 'readOnly' || item.readOnly}
          notFoundContent={item?.notFoundContent ?? "Not Found"}
        >
          {item.choices.map((choice) => (
            <Select.Option key={choice.id} value={choice.id}>
              {item.render(choice)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  }
  if (item.type === 'textArea') {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        rules={item.rules}
        initialValue={item.initialValue}
      >
        <TextArea rows={3} maxLength={200} placeholder={item.placeholder} />
      </Form.Item>
    );
  }
  if (item.type === 'number') {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        rules={item.rules}
        initialValue={item.initialValue}
        hasFeedback={item.hasFeedback}
      >
        <InputNumber
          style={styles.inputNumber}
          min={item.min}
          max={item.max}
          readOnly={item.readOnly}
        />
      </Form.Item>
    );
  }
  if (item.type === 'date') {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        rules={item.rules}
        initialValue={item.initialValue}
      >
        <DatePicker format={dateFormat} style={styles.datePicker} />
      </Form.Item>
    );
  }
  if (item.type === 'password') {
    if (formMode === 'add') {
      return (
        <Form.Item
          label={item.label}
          name={item.name}
          rules={item.rules}
          dependencies={item.dependencies}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
      );
    }

    return null;
  }
  if (item.type === 'radioGroup') {
    if (typeof item.render === 'undefined') {
      if (typeof item.selectName === 'undefined') {
        item.selectName = 'name';
      }

      if (item.selectName === 'codename') {
        item.render = (choice) => `[${choice.code}] ${choice.name}`;
      } else {
        item.render = (choice) => choice[item.selectName];
      }
    }

    if (item.choices === null || typeof item.choices === 'undefined' || item.choices.length === 0) {
      onFail();
      return null;
    }

    return (
      <Form.Item
        label={item.label}
        name={item.name}
        rules={item.rules}
        initialValue={item.initialValue}
      >
        <Radio.Group style={{ float: 'left' }} onChange={item.onChange}>
          {item.choices.map((choice) => (
            <Radio.Button value={choice.id}>{item.render(choice)}</Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
    );
  }
  if (item.type === 'checkList') {
    if (item.choices === null || item.choices.length === 0) {
      onFail();
      return null;
    }

    return (
      <Form.Item
        label={item.label}
        name={item.name}
        rules={item.rules}
        initialValue={item.initialValue}
      >
        <Checkbox.Group style={styles.inputCheckList}>
          {item.choices.map((choice) => (
            <Row>
              <Checkbox value={choice.id}>{item.render(choice)}</Checkbox>
            </Row>
          ))}
        </Checkbox.Group>
      </Form.Item>
    );
  }
  if (item.type === 'list' || item.type === 'listForm') {
    return (
      <div style={styles.formList}>
        <Form.List label={item.label} name={item.name} rules={item.rules}>
          {(fields, { add, remove, errors }) => (
            <>
              <div
                {...styles.listTailLayout}
                type="dashed"
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Title level={5} style={{ marginRight: 'auto' }}>
                  {item.label}
                </Title>
                <Form.Item>
                  <Button onClick={() => add()} icon={<PlusOutlined />}>
                    Add
                  </Button>
                </Form.Item>

                {item.type === 'selectList' && (
                  <Form.Item>
                    <Button onClick={() => add()} icon={<SelectOutlined />}>
                      Select
                    </Button>
                  </Form.Item>
                )}
              </div>
              {fields.map((field) => (
                <Space key={field.key} style={styles.listLayout} align="baseline">
                  {item.fields.map((itemField) => {
                    if (itemField.type === 'hidden') {
                      return (
                        <Form.Item
                          {...field}
                          name={[field.name, itemField.name]}
                          fieldKey={[field.fieldKey, itemField.name]}
                          hidden
                        >
                          <Input />
                        </Form.Item>
                      );
                    }
                    if (itemField.type === 'number') {
                      return (
                        <Form.Item
                          {...field}
                          {...styles.listItems}
                          name={[field.name, itemField.name]}
                          fieldKey={[field.fieldKey, itemField.name]}
                          rules={itemField.rules}
                        >
                          <InputNumber
                            placeholder={itemField.placeholder}
                            prefix={item.prefix}
                            suffix={item.suffix}
                          />
                        </Form.Item>
                      );
                    }
                    if (itemField.type === 'date') {
                      return (
                        <Form.Item
                          {...field}
                          {...styles.listItems}
                          name={[field.name, itemField.name]}
                          fieldKey={[field.fieldKey, itemField.name]}
                          rules={itemField.rules}
                        >
                          <DatePicker format={dateFormat} />
                        </Form.Item>
                      );
                    }
                    return (
                      <Form.Item
                        {...field}
                        {...styles.listItems}
                        name={[field.name, itemField.name]}
                        fieldKey={[field.fieldKey, itemField.name]}
                        rules={itemField.rules}
                      >
                        <Input
                          placeholder={itemField.placeholder}
                          prefix={item.prefix}
                          suffix={item.suffix}
                        />
                      </Form.Item>
                    );
                  })}
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.ErrorList errors={errors} />
            </>
          )}
        </Form.List>
      </div>
    );
  }
  if (item.type === 'selectTable') {
    if (
      (item.dataSource === null ||
        typeof item.dataSource === 'undefined' ||
        item.dataSource.length === 0) &&
      !item.allowEmpty
    ) {
      onFail();
      return null;
    }
    return (
      <>
        <Form.Item
          label={item.label}
          name={item.name}
          rules={item.rules}
          initialValue={item.initialValue}
          getValueProps={item.getValueProps}
        >
          <Input
            suffix={
              <Button
                type="primary"
                onClick={() => {
                  item.setDisplayModal(true);
                }}
                icon={<SelectOutlined />}
              >
                Select
              </Button>
            }
            readOnly
            placeholder={item.placeholder}
          />
        </Form.Item>
        <Modal
          visible={item.displayModal}
          title={`Select ${item.label}`}
          onOk={() => item.setDisplayModal(false)}
          onCancel={() => item.setDisplayModal(false)}
          cancelButtonProps={{ style: { display: 'none' } }}
          width={1000}
        >
          <Table
            rowSelection={{
              type: 'radio',
              selectedRowKeys: item.selectedData,
              onChange: (e) => {
                item.setSelectedData(e);
                onTableSelect(item.name, e[0]);
              },
              preserveSelectedRowKeys: false,
            }}
            columns={item.columns}
            dataSource={item.dataSource}
            rowKey={item.rowKey}
            pagination={{ size: 'small' }}
            locale={{ emptyText: item.emptyText || 'No Data' }}
          />
        </Modal>
      </>
    );
  }
  if (item.type === 'custom' || item.type === 'customList') {
    return null;
  }

  return (
    <Item
      label={item.label}
      name={item.name}
      rules={item.rules}
      initialValue={item.initialValue}
      hasFeedback={item.hasFeedback}
    >
      <Input
        disabled={item.type === 'readOnly' || item.readOnly}
        placeholder={item.placeholder}
        suffix={item.suffix}
      />
    </Item>
  );
};

export default FormItem;
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
