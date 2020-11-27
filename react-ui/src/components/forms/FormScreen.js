import React, { useEffect } from 'react';
import { Form, Button, Input, InputNumber, Select, Row, Col, Typography, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined, SelectOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { TextArea } = Input;
const { Title } = Typography;

const FormScreen = (props) => {
  const { title, onCancel, onSubmit, values, formDetails } = props;
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const FormItem = ({ item }) => {
    if (item.type === 'select') {
      if (typeof item.selectName === 'undefined') {
        item.selectName = 'name'
      }
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <Select>
            {item.choices.map((choice) => (
              <Select.Option value={choice.id}>{choice[item.selectName]}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      );
    }
    else if (item.type === 'textArea') {
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <TextArea rows={3} maxLength={200} placeholder={item.placeholder} />
        </Form.Item>
      );
    }
    else if(item.type === 'number'){
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <InputNumber style={styles.inputNumber}/>
        </Form.Item>
      );
    }
    else if(item.type === 'listSelect' || item.type === 'list'){
      return (
        <div style={styles.formList}>
        <Form.List label={item.label} name={item.name} rules={item.rules}>
          {(fields, { add, remove, errors }) => (
            <>
              <div {...styles.listTailLayout} type="dashed" style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Title level={5} style={{marginRight:"auto"}}>{item.label}</Title>
                <Form.Item>
                  <Button onClick={() => add()} icon={<PlusOutlined />}>
                    Add
                  </Button>
                </Form.Item>

                {item.type === 'listSelect' && 
                  <Form.Item>
                    <Button onClick={() => add()} icon={<SelectOutlined />}>
                      Select
                    </Button>
                  </Form.Item>
                }
              </div>
              {fields.map(field => (
                 <Space key={field.key} style={styles.listLayout}>
                   
                  {item.fields.map(itemField => {
                    if(itemField.type === 'hidden')
                    {
                      return (
                        <Form.Item
                          {...field}
                          name={[field.name, itemField.name]}
                          fieldKey={[field.fieldKey, itemField.name]}
                          hidden={true}
                        >
                          <Input/>
                        </Form.Item>
                      )
                    }
                    else {
                      return (
                        <Form.Item
                          {...field}
                          {...styles.listItems}
                          name={[field.name, itemField.name]}
                          fieldKey={[field.fieldKey, itemField.name]}
                          rules={itemField.rules}
                        >
                          <Input placeholder={itemField.placeholder} />
                        </Form.Item>
                      )
                    }
                    
                  })}
                  <MinusCircleOutlined style={{alignSelf: "center"}} onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.ErrorList errors={errors} />
            </>
          )}
        </Form.List>
        </div>
      )
      
    }
    else {
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <Input placeholder={item.placeholder} />
        </Form.Item>
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    // message.error(errorInfo)
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
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
          >
            {formDetails.form_items.map((item) => (
              <FormItem item={item} />
            ))}
            <div style={styles.tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button
                style={{ marginRight: '2%' }}
                onClick={() => {
                  onCancel()
                  history.goBack();
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
          
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
    borderStyle: "solid",
    borderWidth: 1,
    padding: "2%",
    backgroundColor: "#FAFAFA",
    width: '87.5%',
    marginBottom: "2%",
  },
  datePicker: {
    float: 'left',
  },
  inputNumber: {
    float: 'left',
  },
};
