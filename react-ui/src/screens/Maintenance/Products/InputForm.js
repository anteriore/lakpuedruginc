import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Typography, Input, Button, Form, Layout, Select, DatePicker, Space } from 'antd';

const { Title } = Typography;
const { Item } = Form;

const InputForm = (props) => {
  const { title } = props;
  const history = useHistory();

  return (
    <div>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row>
        <Col span={20} offset={2}>
          <Layout style={styles.layout}>
            <Form {...styles.formLayout}>
              <Item label="FG Code" name="fg_code">
                <Input disabled />
              </Item>
              <Item label="FG Name" name="fg_name">
                <Select />
              </Item>
              <Item label="Depot" name="depot">
                <Select />
              </Item>
              <Item label="Lot #" name="lot_number">
                <Input />
              </Item>
              <Item label="Expiration" name="expiration" wrapperCol={{ span: 4, offset: 0 }}>
                <DatePicker style={{ float: 'left', width: '100%' }} />
              </Item>
              <Item label="Classification" name="classification">
                <Select />
              </Item>
              <Item label="Category" name="category">
                <Select />
              </Item>
              <Item label="Division" name="division" wrapperCol={{ span: 4 }}>
                <Select />
              </Item>
              <Item
                label="Unit Price"
                name="unit_price"
                wrapperCol={{
                  span: 4,
                }}
              >
                <Input />
              </Item>
              <Item
                label="Small UOM"
                name="small_uom"
                wrapperCol={{
                  span: 2,
                }}
              >
                <Select />
              </Item>
              <Item
                label="Big UOM"
                name="big_uom"
                wrapperCol={{
                  span: 2,
                }}
              >
                <Select />
              </Item>
              <Item
                label="Quantity/Box"
                name="quantity"
                wrapperCol={{
                  span: 2,
                }}
              >
                <Input />
              </Item>
              <Item
                label="Reorder Level"
                name="reorder_level"
                wrapperCol={{
                  span: 3,
                }}
              >
                <Input />
              </Item>
              <Form.Item wrapperCol={{ offset: 13, span: 5 }}>
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
    </div>
  );
};

export default InputForm;

const styles = {
  formLayout: {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 10,
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
