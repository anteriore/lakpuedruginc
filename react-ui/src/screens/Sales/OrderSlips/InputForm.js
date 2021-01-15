import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Typography,
  Form,
  Table,
  Space,
  Button,
  Skeleton,
  message,
  Layout,
  Checkbox,
} from 'antd';
import _ from 'lodash';
import { useForm } from 'antd/lib/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { formDetails, salesOrderHeader, salesInfoHeader, initValueForm } from './data';
import { fromatInitForm, updateList } from '../../../helpers/general-helper';
import FormItem from '../../../components/forms/FormItem';
import { listDepot } from '../../Maintenance/Depots/redux';
import { listSalesOrderByDepot } from '../SalesOrders/redux';
import { listProductInventory } from '../../Maintenance/redux/productInventory';

import { formatSOList, formatLotProducts, formatOrderedProducts } from './helpers';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onSubmit } = props;
  const history = useHistory();
  const { id } = useParams();
  const [contentLoading, setContentLoading] = useState(true);
  const [showSalesSection, setShowSalesSection] = useState(false);
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [selectedSales, setSelectedSales] = useState(null);
  const [selectedLot, setSelectedLot] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { list: productInvList } = useSelector((state) => state.maintenance.productInventory);
  const { list: depotList } = useSelector((state) => state.maintenance.depots);
  const { salesOrderList } = useSelector((state) => state.sales.salesOrders);
  const { orderSlipsList } = useSelector((state) => state.sales.orderSlips);
  const [form] = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== undefined && orderSlipsList.length !== 0) {
      const selectedOrderSlips = _.find(orderSlipsList, (o) => {
        return o.id === parseInt(id, 10);
      });

      form.setFieldsValue(fromatInitForm(selectedOrderSlips, initValueForm));
      dispatch(listSalesOrderByDepot(selectedOrderSlips.depot.id)).then(() => {
        setSelectedSales(selectedOrderSlips.salesOrder);
        setShowSalesSection(true);
      });
    }
  }, [dispatch, orderSlipsList, id, form]);

  useEffect(() => {
    dispatch(listDepot()).then(() => {
      dispatch(listProductInventory()).then(() => {
        form.setFieldsValue({
          preparedBy: `${user.firstName} ${user.lastName}`,
          releasedBy: `${user.firstName} ${user.lastName}`,
          checkedBy: `${user.firstName} ${user.lastName}`,
        });
        setContentLoading(false);
      });
    });
  }, [dispatch, form, user]);

  useEffect(() => {
    const newForm = tempFormDetails;
    const masterList = {
      depot: depotList,
    };
    const formItem = _.find(newForm.form_items, { name: 'depot' });
    const handleDepotChange = (value) => {
      form.setFieldsValue({ salesOrder: '' });
      setSelectedSales(null);
      setShowSalesSection(false);
      dispatch(listSalesOrderByDepot(value));
    };

    formItem.onChange = (e) => handleDepotChange(e);
    setTempFormDetails(updateList(newForm, masterList));
  }, [dispatch, depotList, tempFormDetails, form]);

  useEffect(() => {
    if (form.getFieldValue('depot') !== undefined) {
      if (salesOrderList.length === 0) {
        message.warning("There's no sales orders on this selected depot");
      } else {
        const newForm = tempFormDetails;
        const masterList = {
          salesOrder: formatSOList(salesOrderList),
        };
        const formItem = _.find(newForm.form_items, { name: 'salesOrder' });

        const handleSalesChange = (value) => {
          setSelectedSales(_.find(salesOrderList, (o) => o.id === value));
        };

        formItem.onChange = (e) => handleSalesChange(e);

        setTempFormDetails(updateList(newForm, masterList));
        setShowSalesSection(true);
      }
    }
  }, [salesOrderList, tempFormDetails, form]);

  useEffect(() => {
    const newOrderedProducts = formatOrderedProducts(selectedLot, selectedSales);
    setOrderedProducts(newOrderedProducts);
  }, [selectedLot, selectedSales]);

  const onItemSelect = (data, selected) => {
    if (selected) {
      setSelectedLot(selectedLot.concat(data));
    } else {
      const removedList = _.remove(selectedLot, (o) => {
        return o.id !== data.id;
      });

      setSelectedLot(removedList);
    }
  };
  const renderLotColumns = (rawColumns) => {
    let filteredColumn = [
      {
        title: 'Action',
        key: 'select',
        render: (row) => {
          return (
            <Checkbox
              onChange={(e) => {
                onItemSelect(row, e.target.checked);
              }}
              checked={_.some(selectedLot, (o) => o.id === row.id)}
            />
          );
        },
      },
    ];

    const inputColumn = rawColumns.slice();

    filteredColumn = filteredColumn.concat(inputColumn);

    return filteredColumn;
  };

  const onFinish = (value) => {
    onSubmit(value, selectedSales, orderedProducts);
    history.goBack();
  };

  return (
    <>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row span={20} offset={1}>
        <Col span={20} offset={1}>
          {contentLoading ? (
            <Skeleton />
          ) : (
            <Layout style={styles.layout}>
              <Form form={form} onFinish={onFinish} {...styles.formLayout}>
                {_.dropRight(tempFormDetails.form_items, 5).map((item) => (
                  <FormItem key={item.name} item={item} />
                ))}
                {showSalesSection
                  ? _.dropRight(_.drop(tempFormDetails.form_items, 3), 1).map((item) => (
                      <FormItem key={item.name} item={item} />
                    ))
                  : ''}
                {showSalesSection ? (
                  <Form.Item wrapperCol={{ span: 15, offset: 4 }}>
                    <Form.Item>
                      <Table
                        columns={renderLotColumns(salesOrderHeader)}
                        dataSource={formatLotProducts(selectedSales, productInvList)}
                        pagination={false}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Table
                        columns={salesInfoHeader}
                        dataSource={formatOrderedProducts(selectedLot, selectedSales)}
                        pagination={false}
                      />
                    </Form.Item>
                  </Form.Item>
                ) : (
                  ''
                )}
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
