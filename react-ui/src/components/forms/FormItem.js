import React, { useState } from 'react';
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
import { PlusOutlined, MinusCircleOutlined, SelectOutlined, DeleteOutlined } from '@ant-design/icons';

const { Item } = Form;
const { Title, Text } = Typography;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';

const FormItem = ({ item, onFail, formMode, onTableSelect, disableLabel, noStyle, formInstance }) => {
  const [value, setValue] = useState([]) //for listTable fields
  const [errorMessage, setErrorMessage] = useState('') //for listTable fields 

  const renderInputColumns = (fields, form) => {
    let renderedColumns = []

    fields.forEach((column) => {
      renderedColumns.push({
        title: column.label,
        dataIndex: column.name,
        render: () => {
          return (
            <FormItem
              disableLabel={true}
              noStyle={true}
              onFail={onFail}
              key={column.name}
              item={column}
            />
          )
        }
      })
    })

    renderedColumns.push({
      title: "Action",
      render: () => {
        return (
          <Button
            icon={<PlusOutlined/>}
            style={{ backgroundColor: '#3fc380', marginRight: '1%' }}
            type="primary"
            onClick={() => {
              form.validateFields().catch((errors) => {
                if(errors.errorFields.length > 0){
                  console.log(errors)
                  setErrorMessage("Unable to add. Please double check your input.")
                }
                else{
                  setErrorMessage("")
                }
              })
              form.submit()
            }}
          >
            Add
          </Button>
        )
      }
    })
    return renderedColumns;
    
  }

  const renderListTableColumns = (fields) => {
    let renderedColumns = []

    fields.forEach((column) => {
      renderedColumns.push({
        title: column.label,
        dataIndex: column.name,
        key: column.name,
        render: column?.render ?? ((data) => data),
      })
    })

    renderedColumns.push({
      title: "Action",
      render: (record, index) => {
        return (
          <Button
            icon={<DeleteOutlined />}
            style={{ marginRight: '1%' }}
            type="dashed"
            onClick={() => {
              let returnValue = value.filter((item) => item !== record)
              formInstance.setFieldsValue({
                [item.name]: returnValue
              })
              setValue(returnValue)
            }}
            danger
          />
        )
      }
    })
    return renderedColumns;
    
  }

  const renderFormItemField = () =>{
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
        <Select
          showSearch={item.type === 'selectSearch'}
          onChange={item.onChange}
          placeholder={item.placeholder}
          optionFilterProp="children"
          disabled={item.type === 'readOnly' || item.readOnly || (item?.loading ?? false)}
          loading={item?.loading ?? false}
          notFoundContent={item?.notFoundContent ?? "Not Found"}
          style={{width: item.width ?? '100%', minWidth: 100}}
        >
          {item.choices.map((choice) => (
            <Select.Option key={choice.id} value={choice.id}>
              {item.render(choice)}
            </Select.Option>
          ))}
        </Select>
      );
    }
    else if (item.type === 'textArea') {
      return (
        <TextArea rows={3} maxLength={200} placeholder={item.placeholder} />
      );
    }
    else if (item.type === 'number') {
      return (
        <InputNumber
          style={styles.inputNumber}
          min={item.min}
          max={item.max}
          readOnly={item.readOnly}
        />
      );
    }
    else if (item.type === 'date') {
      return (
        <DatePicker format={dateFormat} style={styles.datePicker} />
      );
    }
    else if (item.type === 'radioGroup') {
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
        <Radio.Group style={{ float: 'left' }} onChange={item.onChange}>
          {item.choices.map((choice) => (
            <Radio.Button value={choice.id}>{item.render(choice)}</Radio.Button>
          ))}
        </Radio.Group>
      );
    }
    else if (item.type === 'checkList') {
      if (item.choices === null || item.choices.length === 0) {
        onFail();
        return null;
      }

      return (
        <Checkbox.Group style={styles.inputCheckList}>
          {item.choices.map((choice) => (
            <Row>
              <Checkbox value={choice.id}>{item.render(choice)}</Checkbox>
            </Row>
          ))}
        </Checkbox.Group>
      );
    }
    else {
      return (
        <Input
          disabled={item.type === 'readOnly' || item.readOnly}
          placeholder={item.placeholder}
          suffix={item.suffix}
        />
      )
    }
  }

  if(item?.isVisible ?? true){
    if (item.type === 'password') {
      if (formMode === 'add') {
        return (
          <Form.Item
            label={disableLabel ? null : item.label}
            name={item.name}
            rules={item.rules}
            dependencies={item.dependencies}
            noStyle={noStyle}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
        );
      }
      else {
        return null;
      }
    }
    else if (item.type === 'list' || item.type === 'listForm') {
      return (
        <div style={styles.formList}>
          <Form.List label={disableLabel ? null : item.label} name={item.name} rules={item.rules}>
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
    else if (item.type === 'selectTable') {
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
                  loading={item?.loading ?? false}
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
    else if (item.type === 'custom' || item.type === 'customList') {
      return null;
    }
    else if(item.type === 'listTable'){
      const [inputForm] = Form.useForm();

      return (
        <Space direction="vertical" size={20} style={{ width: '100%' }}>
          <Form
              form={inputForm}
              onFinish={(formValue) => {
                let returnValue;
                typeof item.handleAdd === 'function' ? 
                  returnValue = value.concat(item.handleAdd(formValue)) : 
                  returnValue = value.concat(formValue)
                formInstance.setFieldsValue({
                  [item.name]: returnValue
                })
                setValue(returnValue)
                inputForm.resetFields()
              }}
          >
            <Table
              dataSource={[{}]}
              columns={renderInputColumns(item.fields, inputForm)}
              pagination={false}
            />
            <Text type="danger">{errorMessage}</Text>
          </Form>
          
          <Form.List label={item.label} name={item.name} rules={item?.rules ?? []}>
            {() => (
              <Table
                columns={renderListTableColumns(item.fields)}
                dataSource={value}
                pagination={false}
                summary={item.summary}
              />
            )}
          </Form.List>
        </Space>
      )
    }
    else {
      return (
        <Item
          label={item.label}
          name={item.name}
          rules={item.rules}
          initialValue={item.initialValue}
          hasFeedback={item.hasFeedback}
          tooltip={item.tooltip}
          noStyle={noStyle}
        >
          {renderFormItemField()}
        </Item>
      );
    }
    
  }
  else {
    //not visible
    return null;
  }
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
