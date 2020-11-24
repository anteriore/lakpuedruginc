import React, { useEffect } from 'react';
import { Form, Button, Input, InputNumber, Select, Row, Col, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { TextArea } = Input;
const { Title } = Typography;

const SimpleForm = (props) => {
  const { title, onCancel, onSubmit, values, formDetails } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
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
          <InputNumber/>
        </Form.Item>
      );
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

export default SimpleForm;

const styles = {
  layout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 15,
    },
  },
  tailLayout: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '87.5%',
  },
  datePicker: {
    float: 'left',
  },
};
