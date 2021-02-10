import React, {useCallback, useEffect, useState} from 'react';
import { Row, Col, Layout,Typography, Form, Skeleton, Table, Checkbox, Space, Button } from 'antd';
import { formDetails, tableProduct, tableProductInventory } from './data';
import _ from 'lodash';
import FormItem from '../../../components/forms/FormItem';
import { EditableCell, EditableRow } from '../../../components/TableRowInput';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Modal from 'antd/lib/modal/Modal';
import { useSelector } from 'react-redux';
import { updateList } from '../../../helpers/general-helper';

const {Title} = Typography;

const InputForm = (props) => {
  const {title, onSubmit } = props;
  const history = useHistory();
  const { path } = useRouteMatch();
  const { list: depotList} = useSelector((state) => state.maintenance.depots)
  const { list: productInvList } = useSelector((state) => state.maintenance.productInventory)
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [contentLoading, setContentLoading] = useState(true);
  const [productModal, setProductModal] = useState(false);
  const [productInv, setProductInv] = useState([]);
  const [requestedProductList, setRequestedProductList] = useState([]);

  const component = {
    body: {
      cell: EditableCell,
      row: EditableRow,
    }
  }

  const handleDepotChange = useCallback((value) => {
    console.log(value)
  }, [])

  useEffect(() => {
    const newForm = tempFormDetails;
    const masterList = {
      depot: depotList,
    };

    const formItem = _.find(newForm.form_items, {name: 'depot'});
    formItem.onChange = (e) => handleDepotChange(e);
    setTempFormDetails(updateList(newForm, masterList));

    setContentLoading(false);
  },[depotList, tempFormDetails, handleDepotChange])
  
  const modProductColumn = tableProduct.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          limit: col.limit,
          title: col.title,
          maxLimit: 1000,
          minLimit: 0,
          precisionEnabled: col.precisionEnabled,
          precision: col.precision,
          handleSave: (row) => {
            console.log(row)
          }
        }
      }
    }
  })

  const onFail = () => {
    history.push(`/${path.split('/')[1]}/${path.split('/')[2]}/${path.split('/')[3]}`);
  }

  return (
    <>
      <Row>
        <Title>
          {title}
        </Title>
      </Row>
      <Row>
        <Col span={20} offset={1}>
          { contentLoading ? (
            <Skeleton/>
          ) : (
            <Layout style={styles.layout}>
              <Form {...styles.formLayout}>
                {_.dropRight(tempFormDetails.form_items).map((item) => (
                  <FormItem onFail={onFail} key={item.name} onFail={onFail} item={item} />
                ))}
                <Form.Item 
                  wrapperCol={{span: 15, offset: 4}}
                  name="product"
                  rules={[{ required: true, message: 'Please select a product' }]}
                >
                  <Table
                    components={component}
                    columns={modProductColumn}
                    rowClassName={() => styles.editableRow}
                    dataSource={null}
                    pagination
                  />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 11 }}>
                  <Button
                    onClick={() => setProductModal(true)}
                    style={{ width: '40%', float: 'right' }}
                  >
                    Select/Remove Product item(s)
                  </Button>
                </Form.Item>
                <FormItem onFail={onFail} item={_.last(formDetails.form_items)} />
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
          cancelButtonProps={{style: {display: 'none'}}}
          width={1000}
          footer={null}
        >
          <Table
            columns={tableProductInventory}
            dataSource={null}
            pagination={false}
          />
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