import React, {useState, useEffect, useCallback} from 'react';
import {Row, Col, Typography, Form, Skeleton, Table, Checkbox, Space, Button} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Layout from 'antd/lib/layout/layout';
import { formDetails } from './data';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import FormItem from '../../../components/forms/FormItem';
import { updateList } from '../../../helpers/general-helper';
import { formatLotProducts, formatOrderedProducts, formatSOList } from '../OrderSlips/helpers';
import { salesInfoHeader, salesOrderHeader } from '../OrderSlips/data';

const {Title} = Typography;

const InputForm = (props) => {
  const {title, onSubmit} = props;
  const history = useHistory();
  const { path } = useRouteMatch();
  const [form] = useForm();

  const [contentLoading, setContentLoading] = useState(true)
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [selectedSales,setSelectedSales] = useState(null);
  const [showSalesSection, setShowSalesSection] = useState(false);
  const [selectedLot, setSelectedLot] = useState([]);
  const [salesInvoiceProducts, setSalesInvoiceProducts] = useState([])

  const { list: productInvList } = useSelector((state) => state.maintenance.productInventory);
  const {list: depotList} = useSelector(state => state.maintenance.depots)
  const { salesOrderList } = useSelector(state => state.sales.salesOrders);
  const { user } = useSelector((state) => state.auth);

  const handleSalesChange = useCallback((value) => {
    const salesOrder = _.find(salesOrderList, (o) => {
      return o.id === value;
    });
    setSelectedSales(salesOrder);
  }, [salesOrderList])

  const handleDepotChange = useCallback((value) => {
    form.setFieldsValue({salesOrder: ''});
    setSelectedSales(null);
    const selectedSalesList = _.filter(salesOrderList, (o) => {
      return o.depot.id === value && _.toLower(o.status) !== 'pending';
    }).filter((o) => _.toLower(o.type) === 'dr_si');

    console.log("Depot Value", value)
    console.log(selectedSalesList)

    if(selectedSalesList.length !== 0){
      const newForm = tempFormDetails;
      const masterList = {
        salesOrder: formatSOList(selectedSalesList),
      };
      const formItem = _.find(newForm.form_items, {name: 'salesOrder'});

      formItem.onChange = (e) => handleSalesChange(e);
      setTempFormDetails(updateList(newForm,masterList));
      setShowSalesSection(true);
    } else {
      setShowSalesSection(false);
    }
  },[form, handleSalesChange, salesOrderList, tempFormDetails])

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
    const formItem = _.find(newForm.form_items, {name: 'depot'});
    formItem.onChange = (e) => handleDepotChange(e);
    setTempFormDetails(updateList(newForm, masterList));

    setContentLoading(false);
  },[depotList, form, user,tempFormDetails, handleDepotChange])

  useEffect(() => {
    const newOrderedProducts = formatOrderedProducts(selectedLot, selectedSales);
    setSalesInvoiceProducts(newOrderedProducts);
  },[selectedLot, selectedSales]);

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
  }

  const onFinish = (value) => {
    onSubmit(value, selectedSales, salesInvoiceProducts);
    history.goBack();
  }

  return (
    <>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row span={20} offset={1}>
        <Col span={20} offset={1}>
          {contentLoading ? (
            <Skeleton/>
          ) : (
            <Layout style={styles.layout}>
              <Form form={form} onFinish={onFinish} {...styles.formLayout}>
                {_.dropRight(tempFormDetails.form_items, 5).map((item) => (
                  <FormItem onFail={onFail} key={item.name} item={item} />
                ))}
                {showSalesSection ? _.dropRight(_.drop(tempFormDetails.form_items, 4), 1).map((item) => (
                      <FormItem onFail={onFail} key={item.name} item={item} />
                    ))
                  : ''}
                {showSalesSection ? (
                  <Form.Item wrapperCol={{span: 15, offset: 4}}>
                    <Form.Item>
                      <Table
                        columns={renderLotColumns(salesOrderHeader)}
                        dataSource={formatLotProducts(selectedSales,productInvList)}
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
                ) : ('')}
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