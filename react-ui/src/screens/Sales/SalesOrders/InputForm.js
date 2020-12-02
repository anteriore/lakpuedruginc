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
  Checkbox
} from 'antd';
import Layout from 'antd/lib/layout/layout';
import { useForm } from 'antd/lib/form/Form';
import { formDetails, tableProduct, tableProductInventory } from './data';
import FormItem from '../../../components/forms/FormItem';
import { useDispatch, useSelector } from 'react-redux';
import {listDepot} from '../../Maintenance/Depots/redux';
import {listClient} from '../../Maintenance/Clients/redux';
import { listProductInventory } from '../../Maintenance/redux/productInventory';
import { useHistory } from 'react-router-dom';
import { EditableRow, EditableCell } from '../../../components/TableRowInput';
import { updateList} from '../../../helpers/general-helper';
import { formatProduct } from './helpers';
import _ from 'lodash';

const {Title} = Typography;

const InputForm = (props) => {
  const { title, company } = props;
  const [form] = useForm();
  const history = useHistory();
  const [contentLoading, setContentLoading] = useState(true)
  const [modalContentLoading, setModalContentLoading] = useState(true);
  const [productModal, setProductModal] = useState(false);
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails))
  const [requestedProductList, setRequestedProductList] = useState([])
  const { user } = useSelector((state) => state.auth);
  const { list: depotList } = useSelector((state) => state.maintenance.depots);
  const { list: clientList } = useSelector((state) => state.maintenance.clients);
  const { list: productInventoryList } = useSelector((state) => state.maintenance.productInventory);
  const dispatch = useDispatch();
  const component = {
    body:{
      cell: EditableCell,
      row: EditableRow
    }
  }

  useEffect(() => {
    dispatch(listDepot()).then(() => {
      form.setFieldsValue({
        preparedBy: `${user.firstName} ${user.lastName}`,
        approvedBy: `${user.firstName} ${user.lastName}`,
        requestedBy: `${user.firstName} ${user.lastName}`
      })
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

  const selectProductItems = () => {
    setProductModal(true)
    setModalContentLoading(true);
    dispatch(listProductInventory()).then(() =>{
      setModalContentLoading(false);
    })
  }

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
        handleSave: (data, record) => {
          console.log(data, record)
        }
      }),
    };
  });

  // render Product Items with checkbox
  const renderProductItemColumns = (rawColumns) => {
    let filteredColumn = [
      {
        title: "Action",
        key: 'select',
        render: (row) => {
          return (
            <Checkbox
              onChange={(e) => {
                onItemSelect(row, e.target.checked);
              }}
              checked={!!requestedProductList.some((item) => item.id === row.id)}
            />
          );
        },
      },
    ];

    const inputColumn = rawColumns.slice();

    filteredColumn = filteredColumn.concat(inputColumn);

    return filteredColumn;
  };

  // Check box function callback upon onChange 
  const onItemSelect = (data, selected) => {
    if(selected){
      console.log(formatProduct(data))
      setRequestedProductList(requestedProductList.concat(formatProduct(data)))
    }else{
      var selectedItems = requestedProductList.slice();
      selectedItems.pop(data);
      setRequestedProductList( selectedItems);
    }
  };

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
                <Form.Item wrapperCol={{span: 15, offset: 4}} name="product"  rules={[{ required: true }]}>
                <Table 
                    components={component}
                    columns={modProductColumn}
                    rowClassName={() => 'editable-row'}
                    dataSource={requestedProductList}
                    pagination={false}
                  />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 11 }}>
                <Button
                  onClick={() => {
                    selectProductItems();
                  }}
                  style={{ width: '40%', float: 'right' }}
                >
                  Select/Remove Product item(s)
                </Button>
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
        <Modal
          title="Product List"
          visible={productModal}
          onCancel={() => setProductModal(false)}
          onOk={() => setProductModal(false)}
          cancelButtonProps={{ style: { display: 'none' } }}
          width={1000}
        >
          {modalContentLoading ? (<Skeleton/>) : (
            <Table
             columns={renderProductItemColumns(tableProductInventory) }
             dataSource={productInventoryList}
             pagination={false}
           />
          )}
        </Modal>
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
