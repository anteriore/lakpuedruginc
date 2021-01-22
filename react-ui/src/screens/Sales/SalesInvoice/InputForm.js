import React, {useState, useEffect, useCallback} from 'react';
import {Row, Col, Typography, Form} from 'antd';
import Layout from 'antd/lib/layout/layout';
import { formDetails } from './data';
import _ from 'lodash';
import FormItem from '../../../components/forms/FormItem';

const {Title} = Typography;

const InputForm = (props) => {
  const {title, onSubmit} = props;
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  console.log(_.dropRight(tempFormDetails.form_items, 5))

  const onFail = () => {

  }

  return (
    <>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row span={20} offset={1}>
        <Col span={20} offset={1}>
          <Layout style={styles.layout}>
            <Form {...styles.formLayout}>
              {_.dropRight(tempFormDetails.form_items, 5).map((item) => (
                <FormItem onFail={onFail} key={item.name} item={item} />
              ))}
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