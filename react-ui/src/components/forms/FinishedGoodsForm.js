import React, { useEffect, useState } from 'react';
import {
  Form,
  Modal,
  Input
} from 'antd';

const FinishedGoodsForm = (props) => {
  const {
    visible,
    title,
    onCancel,
    onSubmit,
    values
  } = props;
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState('');
  useEffect(() => {
    console.log("Values changed");
    console.log(values);
    setFormValues(values);
    console.log(formValues);
  },[values])
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
      >
        <Form
          layout="vertical"
          form={form}
          name="finished_goods"
          initialValues={formValues}
        >
          <Form.Item
            label="Code"
            name="fg_code"
            rules={[{ required: true, message: 'Please provide a proper code!' }]}
          >
            <Input placeholder="Finished Goods Code" />
          </Form.Item>
          <Form.Item
            label="Name"
            name="fg_name"
            rules={[{ required: true, message: 'Please provide a proper name!' }]}
          >
            <Input placeholder="Finished Goods Name"/>
          </Form.Item>
        </Form>
      </Modal>
  )
}

export default FinishedGoodsForm;