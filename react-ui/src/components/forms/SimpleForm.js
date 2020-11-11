import React, { useEffect } from 'react';
import {
  Form,
  Modal,
  Input,
  Select
} from 'antd';

const SimpleForm = (props) => {
  const {
    visible,
    title,
    onCancel,
    onSubmit,
    values,
    formDetails
  } = props;
  const [form] = Form.useForm();
  
  useEffect(() => {
    form.setFieldsValue(values);
  },[values, form]);

  const FormItem = ({item}) => {
    
    
    if(item.type === "select"){
      return (
        <Form.Item
          label={item.label}
          name={item.name}
          rules={[{ required: true }]}
        >
          <Select>
            {item.choices.map((choice) =>
              <Select.Option value={choice.id}>{choice.name}</Select.Option>
            )}
          </Select>
        </Form.Item>
      )

    } 
    else {
      return (
        <Form.Item
          label={item.label}
          name={item.name}
          rules={item.rules}
        >
          <Input placeholder={item.placeholder} /> 
        </Form.Item>
      )
    }
  }

  return (
    <Modal
      visible={visible}
      cancelText="Cancel"
      okText="Submit"
      title={title}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            onSubmit(values);
            form.resetFields();
          })
          
      }}
      afterClose={() => {
        form.resetFields();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={values}
        name={formDetails.form_name}
      >
        {
          formDetails.form_items.map((item) => <FormItem item={item}/>)
        }
      </Form>
    </Modal>
  )
}

export default SimpleForm;
