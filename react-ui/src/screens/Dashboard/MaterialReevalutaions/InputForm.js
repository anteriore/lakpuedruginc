import React, {useState, useEffect, useCallback} from 'react';
import { Row, Col, Layout,Typography, Form, Skeleton, Table, Checkbox, Space, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onSubmit } = props;
  const [form] = useForm();
  const [tempFormDetails, setTempFormDetails] = useState();

  useEffect(() => {
    
  },[])

  const onFail = () => {

  }

  const onFinish = () => {

  }

  return(
    <>
      <Row>
        <Title>
          {title}
        </Title>
      </Row>
      <Row>
        <Col span={20} offset={1}>
          <Layout style={styles.layout}>
            <Form form={form} onFinish={onFinish} {...styles.formLayout}>

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