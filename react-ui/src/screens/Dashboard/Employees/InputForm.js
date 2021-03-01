import React from 'react';
import { Row, Col, Typography, Form, Space, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Layout from 'antd/lib/layout/layout';
import { useRouteMatch, useHistory } from 'react-router-dom';
import FormItem from '../../../components/forms/FormItem';
import { formDetails } from './data';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onSubmit } = props;
  const history = useHistory();
  const { path } = useRouteMatch();
  const [form] = useForm();

  const onFail = () => {
    history.push(`/${path.split('/')[1]}/${path.split('/')[2]}`);
  };

  const onFinish = () => {
    onSubmit(form.getFieldsValue());
    history.goBack();
  };

  return (
    <>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row span={20} offset={1}>
        <Col span={20} offset={1}>
          <Layout style={styles.layout}>
            <Form form={form} onFinish={onFinish} {...styles.formLayout}>
              {formDetails.form_items.map((item) => (
                <FormItem onFail={onFail} key={item.name} item={item} />
              ))}
              <Form.Item wrapperCol={{ offset: 15, span: 4 }}>
                <Space size={16}>
                  <Button htmlType="button" onClick={() => history.goBack()}>
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Layout>
        </Col>
      </Row>
    </>
  );
};

export default InputForm;

const styles = {
  formLayout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 11,
      offset: 2,
    },
  },
  layout: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  datePicker: {
    display: 'flex',
    justifyContent: 'start',
  },
};
