import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Typography, Form, Table, Space, Button, Skeleton, Checkbox, Alert } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import _ from 'lodash';
import { useForm } from 'antd/lib/form/Form';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import FormDetails from './data';
import { updateList } from '../../../helpers/general-helper';
import FormItem from '../../../components/forms/FormItem';
import { formatLotProducts, formatOrderedProducts } from './helpers';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onSubmit } = props;
  const { formDetails, salesInfoHeader, salesOrderHeader } = FormDetails();
  const history = useHistory();
  const { path } = useRouteMatch();
  const [contentLoading, setContentLoading] = useState(true);
  const [processingData, setProcessingData] = useState(false);
  const [showSalesSection, setShowSalesSection] = useState(false);
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [selectedSales, setSelectedSales] = useState(null);
  const [selectedLot, setSelectedLot] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { list: productInvList } = useSelector((state) => state.dashboard.productInventories);
  const { list: depotList } = useSelector((state) => state.maintenance.depots);
  const { salesOrderList } = useSelector((state) => state.sales.salesOrders);
  const [form] = useForm();

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

      const selectedSalesList = _.filter(salesOrderList, (o) =>  o.depot.id === value )
      .filter((o) =>  _.toLower(o.status) === 'approved' || _.toLower(o.status) === 'incomplete')
      .filter((o) => _.toLower(o.type) === 'os')
      .filter((o) => {
        return  _.some(o.products, ['status', 'Pending']) || 
        _.some(o.products, ['status', 'Incomplete'])
      });

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
    [form, salesOrderList, tempFormDetails, handleSalesChange]
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
  }, [form, user, tempFormDetails, depotList, handleDepotChange]);

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

  const onFail = () => {
    history.push(`/${path.split('/')[1]}/${path.split('/')[2]}`);
  };

  const onFinish = (value) => {
    setProcessingData(true)
    onSubmit(value, selectedSales, orderedProducts).then(() => {
      setProcessingData(false)
      history.goBack()
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
            <Form form={form} onFinish={onFinish} {...styles.formLayout}>
              {_.dropRight(tempFormDetails.form_items, 5).map((item) => (
                <FormItem onFail={onFail} key={item.name} item={item} />
              ))}
              {showSalesSection
                ? _.dropRight(_.drop(tempFormDetails.form_items, 3), 1).map((item) => (
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
                  <Button htmlType="button" onClick={() => history.goBack()} disabled={processingData}>
                    Cancel
                  </Button>
                  <Button
                    disabled={ orderedProducts.length !== 0 && selectedSales !== null ? false : true } 
                    type="primary" 
                    htmlType="submit"
                    loading={processingData}
                  >
                    Submit
                  </Button>
                </Space>
              </Form.Item>
            </Form>
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
