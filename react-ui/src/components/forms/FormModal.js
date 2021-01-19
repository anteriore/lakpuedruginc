import React, { useEffect } from 'react';
import { Form, Modal } from 'antd';
import FormItem from './FormItem';

const SimpleForm = (props) => {
  const { visible, title, onCancel, onSubmit, values, formDetails } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  return (
    <Modal
      visible={visible}
      cancelText="Cancel"
      okText="Submit"
      title={title}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((formValues) => {
          onSubmit(formValues);
          form.resetFields();
        });
      }}
      afterClose={() => {
        form.resetFields();
      }}
    >
      <Form form={form} layout="vertical" initialValues={values} name={formDetails.form_name}>
        {formDetails.form_items.map((item) => (
          <FormItem item={item} onFail={onCancel} />
        ))}
      </Form>
    </Modal>
  );
};

export default SimpleForm;
