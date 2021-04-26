import React, { useEffect, useState } from 'react';
import { Form, Modal, message } from 'antd';
import FormItem from './FormItem';

const SimpleForm = (props) => {
  const { visible, title, onCancel, onSubmit, values, formDetails, formMode } = props;
  const [form] = Form.useForm();
  const [processingData, setProcessingData] = useState(false);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const onFinish = (data) => {
    setProcessingData(true);
    onSubmit(data).then(() => {
      setProcessingData(false);
    });
  };

  const onFinishFailed = () => {
    message.error("An error has occurred. Please double check the information you've provided.");
  };

  return (
    <Modal
      visible={visible}
      cancelText="Cancel"
      okText="Submit"
      title={title}
      onCancel={onCancel}
      onOk={() => {
        form.submit();
      }}
      okButtonProps={{ loading: processingData }}
      cancelButtonProps={{ disabled: processingData }}
      afterClose={() => {
        form.resetFields();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name={formDetails.form_name}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {formDetails.form_items.map((item) => (
          <FormItem item={item} onFail={onCancel} formMode={formMode} />
        ))}
      </Form>
    </Modal>
  );
};

export default SimpleForm;
