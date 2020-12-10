import React, {useState, useEffect} from 'react';
import {
  Row,
  Col,
  Typography,
  Form,
  Table,
  Space,
  Button,
  Skeleton,
  Modal,
  Checkbox,
  message, 
  Layout
} from 'antd';
import _ from 'lodash';
import { formDetails } from '../SalesOrders/data';
import { useForm } from 'antd/lib/form/Form';
import FormItem from '../../../components/forms/FormItem';
import { useDispatch, useSelector } from 'react-redux';
import {listDepot} from '../../Maintenance/Depots/redux';
import { listSalesOrder } from '../SalesOrders/redux';

const {Title} = Typography;

const InputForm = (props) => {
  const {title, company} = props;
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDepot()).then(() => {

    })
  },[])

  return (
    <>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row span={20} offset={1}>
        <Layout style={styles.layout}>
          <Form 
            {...styles.formLayout}
          >
            Render form items here...
          </Form>
        </Layout>
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