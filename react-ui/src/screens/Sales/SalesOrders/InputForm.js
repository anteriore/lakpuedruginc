import React from 'react';
import {
  Row,
  Col,
  Typography,
  Form,
  Table,
} from 'antd';
import Layout from 'antd/lib/layout/layout';
import { useForm } from 'antd/lib/form/Form';
import { formDetails, tableProduct } from './data';
import FormItem from '../../../components/forms/FormItem';
import _ from 'lodash';

const {Title} = Typography;

const InputForm = (props) => {
  const { title } = props;
  const [form] = useForm();

  return (
    <>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row>
        <Col span={20} offset={1}>
          <Layout style={styles.layout}>
          <Form
            form={form}
            {...styles.formLayout}
          >
            {_.dropRight(formDetails.form_items).map((item) => <FormItem item={item}/>)}
            <Form.Item wrapperCol={{span: 18, offset: 3}}>
              <Table 
                columns={tableProduct}
                dataSource={null}
              />
            </Form.Item>
            <FormItem item={_.last(formDetails.form_items)} />
          </Form>
          </Layout>
        </Col>
      </Row>
    </>
  )
}

export default InputForm;

const styles = {
  formLayout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 11,
      offset: 2
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
