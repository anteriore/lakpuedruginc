import React from 'react';
import {
  Row,
  Col,
  Typography,
  Form,
  Table,
  Space,
  Button
} from 'antd';
import Layout from 'antd/lib/layout/layout';
import { useForm } from 'antd/lib/form/Form';
import { formDetails, tableProduct } from './data';
import FormItem from '../../../components/forms/FormItem';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

const {Title} = Typography;

const InputForm = (props) => {
  const { title } = props;
  const [form] = useForm();
  const history = useHistory();

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
            <Form.Item wrapperCol={{span: 15, offset: 4}}>
              <Table 
                columns={tableProduct}
                dataSource={null}
              />
            </Form.Item>
            <FormItem item={_.last(formDetails.form_items)} />
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
