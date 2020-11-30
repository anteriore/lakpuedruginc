import React, {useState, useEffect} from 'react';
import {
  Row,
  Col,
  Typography,
  Form,
  Table,
  Space,
  Button,
  Skeleton
} from 'antd';
import Layout from 'antd/lib/layout/layout';
import { useForm } from 'antd/lib/form/Form';
import { formDetails, tableProduct } from './data';
import FormItem from '../../../components/forms/FormItem';
import { useDispatch, useSelector } from 'react-redux';
import {listDepot} from '../../Maintenance/Depots/redux';
import {listClient} from '../../Maintenance/Clients/redux';
import { useHistory } from 'react-router-dom';
import { EditableRow, EditableCell } from '../../../components/TableRowInput';
import { updateList} from '../../../helpers/general-helper';
import _ from 'lodash';

const {Title} = Typography;

const InputForm = (props) => {
  const { title, company } = props;
  const [form] = useForm();
  const history = useHistory();
  const [contentLoading, setContentLoading] = useState(true)
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails))
  const { user } = useSelector((state) => state.auth);
  const { list: depotList } = useSelector((state) => state.maintenance.depots);
  const { list: clientList } = useSelector((state) => state.maintenance.clients)
  const dispatch = useDispatch();
  const component = {
    body:{
      cell: EditableCell,
      row: EditableRow
    }
  }

  useEffect(() => {
    dispatch(listDepot()).then(() => {
      dispatch(listClient({company})).then(() => {
        setContentLoading(false);
      })
    })
  },[dispatch]);

  useEffect(() => {
    const newForm = tempFormDetails;
    const masterList = {
      depot: depotList,
      client: clientList,
    }
    setTempFormDetails(updateList(newForm, masterList));
  },[
    depotList,
    clientList
  ])

  const tempValueProducts = [{
    code: "123124",
    finishedGood: {
      "id": 1,
      "name": "Corned Tuna",
      "code": "CT1",
      "unit": null
    },
    quantity: 10,
    quantityRequested: 0,
    quantityRemaining: 10,
    unitPrice: 0.0,
    amount: 0
  }];

  const modProductColumn = tableProduct.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: () => {}
      }),
    };
  });

  return (
    <>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row>
        <Col span={20} offset={1}>
          {contentLoading ? (
            <Skeleton/>
          ) : (
            <Layout style={styles.layout}>
              <Form
                form={form}
                {...styles.formLayout}
              >
                {_.dropRight(tempFormDetails.form_items).map((item) => <FormItem item={item}/>)}
                <Form.Item wrapperCol={{span: 15, offset: 4}}>
                  <Table 
                    components={component}
                    columns={modProductColumn}
                    rowClassName={() => 'editable-row'}
                    dataSource={tempValueProducts}
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
          )}
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
