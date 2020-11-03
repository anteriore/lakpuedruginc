import React, { useEffect } from 'react';
import {
  Form,
  Modal,
  Input,
} from 'antd';


const FinishedGoodsForm = (props) => {
  const {
    visible,
    title,
    onCancel,
    onSubmit,
    values
  } = props;

  const [form] = Form.useForm();
  
  useEffect(() => {
    form.setFieldsValue(values);
  },[values, form])

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
            console.log(values);
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
        name="finished_goods"
      >
        <Form.Item
          label="Code"
          name="fg_code"
          rules={[{ required: true, message: 'Please provide a proper code!' }]}
        >
          <Input placeholder="Please input code" />
        </Form.Item> 
        <Form.Item
          label="Name"
          name="fg_name"
          rules={[{ required: true, message: 'Please provide a proper name!' }]}
        >
          <Input placeholder="Please input name"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FinishedGoodsForm;