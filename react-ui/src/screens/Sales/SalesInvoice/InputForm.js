import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Typography, Form, Skeleton, Table, Checkbox, Space, Button, Alert } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Layout from 'antd/lib/layout/layout';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import FormDetails from '../OrderSlips/data';
import FormItem from '../../../components/forms/FormItem';
import { updateList } from '../../../helpers/general-helper';
import { formatLotProducts, formatOrderedProducts } from '../OrderSlips/helpers';
import { formDetails } from './data';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onSubmit } = props;
  const history = useHistory();
  const { path } = useRouteMatch();
  const [form] = useForm();
  const { salesInfoHeader, salesOrderHeader } = FormDetails();

  const [contentLoading, setContentLoading] = useState(true);
  const [processingData, setProcessingData] = useState(false);
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [selectedSales, setSelectedSales] = useState(null);
  const [showSalesSection, setShowSalesSection] = useState(false);
  const [selectedLot, setSelectedLot] = useState([]);
  const [salesInvoiceProducts, setSalesInvoiceProducts] = useState([]);

  const { list: productInvList } = useSelector((state) => state.dashboard.productInventories);
  const { list: depotList } = useSelector((state) => state.maintenance.depots);
  const { salesOrderList } = useSelector((state) => state.sales.salesOrders);
  const { user } = useSelector((state) => state.auth);

  const handleSalesChange = useCallback(
    (value) => {
      setSelectedLot([]);
      setSelectedSales(null);
      const salesOrder = _.find(salesOrderList, (o) => {
        return o.id === value;
      });
      setSelectedSales(salesOrder);
    },
    [salesOrderList]
  );

  const handleDepotChange = useCallback(
    (value) => {
      form.setFieldsValue({ salesOrder: '' });
      setSelectedSales(null);
      setSelectedLot([]);
      
      const selectedSalesList = _.filter(salesOrderList, (o) => o?.depot?.id === value)
        .filter((o) => _.toLower(o?.status) === 'approved' || _.toLower(o?.status) === 'incomplete')
        .filter((o) => _.toLower(o?.type) === 'dr_si')
        .filter((o) => _.some(o.products, ['status', 'Pending']) ||
        _.some(o.products, ['status', 'Incomplete']));

      if (selectedSalesList.length !== 0) {
        const newForm = tempFormDetails;
        const masterList = {
          salesOrder: selectedSalesList,
        };
        const formItem = _.find(newForm.form_items, { name: 'salesOrder' });

        formItem.onChange = (e) => handleSalesChange(e);
        setTempFormDetails(updateList(newForm, masterList));
        setShowSalesSection(true);
      } else {
        setShowSalesSection(false);
      }
    },
    [form, handleSalesChange, salesOrderList, tempFormDetails]
  );

  useEffect(() => {
    form.setFieldsValue({
      preparedBy: `${user.firstName} ${user.lastName}`,
      releasedBy: `${user.firstName} ${user.lastName}`,
      checkedBy: `${user.firstName} ${user.lastName}`,
    });

    const newForm = tempFormDetails;
    const masterList = {
      depot: depotList,
    };
    const formItem = _.find(newForm.form_items, { name: 'depot' });
    formItem.onChange = (e) => handleDepotChange(e);
    setTempFormDetails(updateList(newForm, masterList));

    setContentLoading(false);
  }, [depotList, form, user, tempFormDetails, handleDepotChange]);

  useEffect(() => {
    const newOrderedProducts = formatOrderedProducts(selectedLot, selectedSales);
    setSalesInvoiceProducts(newOrderedProducts);
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

  const onFail = () => {
    history.push(`/${path.split('/')[1]}/${path.split('/')[2]}`);
  };

  const onFinish = (value) => {
    setProcessingData(true)
    onSubmit(value, selectedSales, salesInvoiceProducts).then(() => {
      setProcessingData(false);
      history.goBack();
    })
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
                  <FormItem onFail={onFail} key={item.name} item={item} />
                ))}
                {showSalesSection
                  ? _.dropRight(_.drop(tempFormDetails.form_items, 4), 1).map((item) => (
                      <FormItem onFail={onFail} key={item.name} item={item} />
                    ))
                  : ''}
                { selectedSales !== null ? (
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
                  <Form.Item wrapperCol={{ span: 15, offset: 4 }}>
                    <Alert
                      message="Please salect a depot and then select an existing sales order."
                      type="warning"
                      showIcon
                      icon={<InfoCircleFilled style={{color: '#d4d4d4'}}/>}
                      style={{backgroundColor: '#ebebeb', borderColor: '#ebebeb'}}
                    />
                  </Form.Item>
                )}
                <FormItem onFail={onFail} item={_.last(formDetails.form_items)} />
                <Form.Item wrapperCol={{ offset: 15, span: 4 }}>
                  <Space size={16}>
                    <Button htmlType="button" onClick={() => history.goBack()}>
                      Cancel
                    </Button>
                    <Button  
                    loading={processingData}
                    disabled={ salesInvoiceProducts.length !== 0 && selectedSales !== null ? false : true }  
                    type="primary" htmlType="submit">
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
