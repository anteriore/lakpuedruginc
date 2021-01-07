import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Typography,
  Input,
  InputNumber,
  Button,
  Form,
  Layout,
  Select,
  DatePicker,
  Space,
  Modal,
  Table,
  Skeleton,
  message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { tableHeaderFinishedGoods, formDetails } from './data';
import { getFGList } from '../FinishedGoods/redux';
import { listDepot } from '../Depots/redux';
import { listClassification } from '../Classification/redux';
import { listPC } from '../ProductCategories/redux';
import { listPD } from '../ProductDivisions/redux';
import { listUnit } from '../Units/redux';
import { updateList, formatPayload, formatInitialFormVal } from './helper';

const { Title } = Typography;
const { Item } = Form;

const InputForm = (props) => {
  const { title, onSubmit } = props;
  const [form] = Form.useForm();
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [contentLoading, setContentLoading] = useState(true);
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [finshedGoodsMddal, setFinishedGoodsModal] = useState(false);
  const [selectedFinishedGood, setSelectedFinishedGood] = useState('');
  const { list: fGList } = useSelector((state) => state.maintenance.finishedGoods);
  const {
    depots,
    classification,
    productCategories,
    productDivisions,
    units,
    products,
  } = useSelector((state) => state.maintenance);

  useEffect(() => {
    dispatch(getFGList({ message }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(listDepot({ message })).then(() => {
      dispatch(listPC({ message })).then(() => {
        dispatch(listClassification({ message })).then(() => {
          dispatch(listPD({ message })).then(() => {
            dispatch(listUnit({ message })).then(() => {
              setContentLoading(false);
            });
          });
        });
      });
    });
  }, [dispatch]);

  useEffect(() => {
    if (id !== undefined && products.productList.length !== 0) {
      const selectedProduct = _.find(products.productList, (o) => {
        return o.id === parseInt(id, 10);
      });
      setSelectedFinishedGood(selectedProduct.finishedGood);
      form.setFieldsValue(formatInitialFormVal(selectedProduct));
    }
  }, [products, id, form]);

  useEffect(() => {
    const newForm = tempFormDetails;
    const masterList = {
      depot: depots.list,
      classification: classification.list,
      category: productCategories.list,
      division: productDivisions.list,
      bigUnit: units.unitList,
      smallUnit: units.unitList,
    };
    setTempFormDetails(updateList(newForm, masterList));
  }, [depots, classification, productCategories, productDivisions, units, tempFormDetails]);

  const onItemSelect = (values) => {
    const { code, name } = values;
    setSelectedFinishedGood(values);
    form.setFieldsValue({ fg_code: code, fg_name: name });
    setFinishedGoodsModal(false);
  };

  const onFinish = (values) => {
    if (id !== undefined) {
      values.id = parseInt(id, 10);
    }
    onSubmit(formatPayload(values, selectedFinishedGood));
    history.goBack();
  };

  const FormItem = ({ item }) => {
    if (item.type === 'select') {
      if (typeof item.render === 'undefined') {
        if (typeof item.selectName === 'undefined') {
          item.selectName = 'name';
        }
        item.render = (choice) => choice[item.selectName];
      }
      return (
        <Item label={item.label} name={item.name} rules={item.rules}>
          <Select style={{ textAlign: 'left' }} placeholder={item.placeholder}>
            {item.choices.map((choice) => (
              <Select.Option value={choice.id}>{item.render(choice)}</Select.Option>
            ))}
          </Select>
        </Item>
      );
    }

    if (item.type === 'number') {
      return (
        <Item
          label={item.label}
          name={item.name}
          wrapperCol={{
            span: 2,
            offset: 2,
          }}
        >
          <InputNumber style={{ width: '10rem' }} min={1} max={50} placeholder={item.placeholder} />
        </Item>
      );
    }

    if (item.type === 'date') {
      return (
        <Item
          label={item.label}
          name={item.name}
          rules={item.rules}
          wrapperCol={{ span: 4, offset: 2 }}
        >
          <DatePicker style={{ float: 'left', width: '25rem' }} />
        </Item>
      );
    }

    return (
      <Item label={item.label} name={item.name} rules={item.rules}>
        <Input placeholder={item.placeholder} />
      </Item>
    );
  };

  return (
    <div>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row>
        <Col span={20} offset={1}>
          {contentLoading ? (
            <Skeleton />
          ) : (
            <Layout style={styles.layout}>
              <Form onFinish={onFinish} form={form} {...styles.formLayout}>
                <Item label="FG Code">
                  <Row gutter={8}>
                    <Col span={15}>
                      <Item name="fg_code" noStyle>
                        <Input disabled />
                      </Item>
                    </Col>
                    <Col span={9}>
                      <Button style={{ width: '100%' }} onClick={() => setFinishedGoodsModal(true)}>
                        Select Finished Goods
                      </Button>
                    </Col>
                  </Row>
                </Item>
                <Item
                  label="FG Name"
                  name="fg_name"
                  rules={[{ required: true, message: 'Please select finished goods' }]}
                >
                  <Input disabled />
                </Item>
                {tempFormDetails.form_items.map((item) => (
                  <FormItem item={item} />
                ))}
                <Item wrapperCol={{ offset: 13, span: 5 }}>
                  <Space size={16}>
                    <Button htmlType="button" onClick={() => history.goBack()}>
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Space>
                </Item>
              </Form>
            </Layout>
          )}
        </Col>
        <Modal
          title="List of Finished Goods"
          visible={finshedGoodsMddal}
          onCancel={() => setFinishedGoodsModal(false)}
          cancelButtonProps={{ style: { display: 'none' } }}
          okText="Select"
          width={800}
          footer={null}
        >
          <Table
            dataSource={fGList}
            columns={tableHeaderFinishedGoods}
            pagination={false}
            onRow={(index) => {
              return {
                onClick: (event) => onItemSelect(index),
              };
            }}
          />
        </Modal>
      </Row>
    </div>
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
