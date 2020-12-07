import React, { useEffect } from 'react';
import { Form, Button, Input, InputNumber, DatePicker, Select, Row, Col, Typography, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined, SelectOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const { TextArea } = Input;
const { Title } = Typography;

const FormScreen = (props) => {
  const { title, onCancel, onSubmit, values, formDetails } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const dateFormat = 'YYYY/MM/DD';

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const onFinish = (data) => {
    formDetails.form_items.forEach((item) => {
      if(item.type === 'date'){
        data[item.name] = `${data[item.name].format('YYYY-MM-DD')}T${data[item.name].format('HH:mm:ss')}`
      }
    })
    onSubmit(data)
  }

  const FormItem = ({ item }) => {
    if (item.type === 'select') {
      if(typeof item.render === 'undefined') {
        if (typeof item.selectName === 'undefined') {
          item.selectName = 'name'
        }
        item.render = choice => choice[item.selectName]
      }
      
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <Select>
            {item.choices.map((choice) => (
              <Select.Option value={choice.id}>{item.render(choice)}</Select.Option>
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
          <InputNumber style={styles.inputNumber} min={item.min} max={item.max} readOnly={item.readOnly}/>
        </Form.Item>
      );
    }
    else if(item.type === 'date'){
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <DatePicker format={dateFormat} style={styles.datePicker} />
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
          <Input placeholder={item.placeholder} readOnly={item.readOnly}/>
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
            onFinish={onFinish}
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
