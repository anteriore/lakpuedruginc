import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Typography, Form, Skeleton, Button, Descriptions, Space, Table, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import _ from 'lodash';
import FormItem from '../../../components/forms/FormItem';
import { useSelector } from 'react-redux';
import { updateList } from '../../../helpers/general-helper';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import FormDetails from './data';
import moment from 'moment';
import PVHelper from '../PurchaseVouchers/helper/';

const { Title } = Typography;

const InputForm = (props) => {
  const {title, onSubmit} = props;
  const [form] = useForm();
  const { path } = useRouteMatch();
  const history = useHistory();
  const { 
    formDetails, 
    newAdjustmentFormDetails, 
    withAdjustmentFormDetails, 
    defaultValWithAdj, 
    defaultValNewAdj, 
    accountTableHeader
  } = FormDetails();

  const { formatAccountData } = PVHelper();
  const { list: listVendor } = useSelector(state => state.maintenance.vendors);
  const { list: listVoucher } = useSelector(state => state.accounting.vouchers);
  const { list: listAccounts } = useSelector(state => state.accounting.accountTitles)
  const { deptList, areaList } = useSelector(state => state.maintenance.departmentArea);
  const { groupList } = useSelector(state => state.maintenance.groupsCategories)

  const [contentLoading, setContentLoading] = useState(true);
  const [tempMainForm, setTempMainForm] = useState(_.clone(formDetails));
  const [tempNewAdjForm, setTempNewAdjForm] = useState(_.clone(newAdjustmentFormDetails));
  const [tempWithAdjForm, setTempWithAdjForm] = useState(_.clone(withAdjustmentFormDetails));
  const [subContentLoading, setSubContentLoading] = useState(true);
  const [formType, setFormType] = useState(_.find(formDetails.form_items, {name: 'adjustment'}).initialValue);
  const [accountType, setAccountType] = useState(null)
  const [addedAccounts, setAddedAccounts] = useState([]);

  const handleChangeFormType = useCallback((value) => {
    setSubContentLoading(true);
    if (!value) {
      form.setFieldsValue(defaultValNewAdj)
      setFormType(value);
    }else {
      if(listVoucher.length !== 0){
        form.setFieldsValue(defaultValWithAdj)
        setFormType(value);
      }else{
        form.setFieldsValue({adjustment: true})
        message.warning("There are no available receiving receipts to select")
      }
    }
    setSubContentLoading(false)
  },[form, defaultValWithAdj, defaultValNewAdj, listVoucher]);

  const handleChangeVoucher = useCallback((value) => {
    const selectedVoucher = _.find(listVoucher,(o) => o.id === value);
    form.setFieldsValue({
      rrNumber: selectedVoucher?.rrNumber ?? "",
      rrDate:  moment(new Date(selectedVoucher.date)).format('DD/MM/YYYY') ?? "",
      siNumber: selectedVoucher?.siNumber ?? "",
      drNumber: selectedVoucher?.drNumber ?? "",
      poNumber: selectedVoucher?.poNumber ?? "",
    })
  },[form, listVoucher]);

  const handleChangeAccount = useCallback((value) => {
    const selectedAccount = _.find(listAccounts, (o) => o.id === value);

    if ( selectedAccount?.type !== undefined && selectedAccount?.type !== null) {
      if (selectedAccount.type === 'Debit') {
        form.setFieldsValue({credit: undefined});
      } else {
        form.setFieldsValue({debit: undefined});
      }
    }
    setAccountType(selectedAccount?.type)
  },[form, listAccounts]);

  const handleAddAccount = async () => {
    const accountValidation = [
      'accountTitles', 
      'department', 
      'group', 
      'area', 
      'debit', 
      'credit'
    ];
    try {
      const values = await form.validateFields(accountValidation);
      let newAddedAccounts = _.clone(addedAccounts);
      newAddedAccounts.push(formatAccountData(values, _.last(addedAccounts)))
      setAddedAccounts(newAddedAccounts)
      form.resetFields(accountValidation)
    } catch (errorInfo) {
      message.warning("Please fill all the required account details before adding.");
    }
  }

  const handleRemoveAccount = (data) => {
    const newData = [...addedAccounts];
    setAddedAccounts(_.filter(newData, (o) => o.key !== data.key));
  }

  useEffect(() => {
    const newForm = tempMainForm;
    const masterList = {
      accountTitles: listAccounts,
      department: deptList,
      group: groupList,
      area: areaList,
    }
    const formManualItem = _.find(newForm.form_items, {name: 'adjustment'});
    const formAccountItem =_.find(newForm.form_items, {name: 'accountTitles'})

    formAccountItem.onChange = (e) => handleChangeAccount(e);
    formManualItem.onChange = (e) => handleChangeFormType(e.target.value);

    setTempMainForm(updateList(newForm, masterList));
    setContentLoading(false);
  },[tempMainForm, handleChangeFormType, handleChangeAccount,areaList, deptList, groupList, listAccounts])

  useEffect(() => {
    setSubContentLoading(true);
    const newForm = tempWithAdjForm;
    const masterList = {
      voucher: listVoucher
    };

    if (listVoucher.length === 0) {
      form.setFieldsValue({manual: true});
      setFormType(true)
    }

    const formItem = _.find(newForm.form_items, {name: 'voucher'});
    formItem.onChange = (e) => handleChangeVoucher(e);

    setTempWithAdjForm(updateList(newForm, masterList))
    setSubContentLoading(false);
  },[tempWithAdjForm, formType, listVoucher, handleChangeVoucher,form]);

  useEffect(() => {
    setSubContentLoading(true)
    const newForm = tempNewAdjForm;
    const masterList = {
      vendor: listVendor
    }

    setTempNewAdjForm(updateList(newForm, masterList));
    setSubContentLoading(false);
  }, [tempNewAdjForm, listVendor])

  const onFail = () => {
    history.push(`/${path.split('/')[1]}/${path.split('/')[2]}`)
  }

  const onFinish = async () => {
    try {
      const values = await form.validateFields([
        'rrNumber', 'date', 'rrDate', 
        'vendor', 'siNumber', 'drNumber', 
        'poNumber', 'adjustment', 'remarks'
      ]);
      onSubmit({values, addedAccounts})
      history.goBack();
    } catch (errorInfo) {
      console.log(errorInfo)
    }
  }

  const renderNewAdjForm = () => tempNewAdjForm.form_items.map((item) => 
    <FormItem
      onFail={onFail}
      key={item.name}
      item={item}
    />
  );

  const renderWithAdjForm = () => tempWithAdjForm.form_items.map((item) => (
    <FormItem
      onFail={onFail}
      key={item.name}
      item={item}
    />
  ));

  const modAccountColumn = accountTableHeader.map((col) => {
    if (col.title === 'Action') {
      const filteredColumn = {
        ...col,
        render: (row) => {
          return (
            <Button
              type="dashed"
              onClick={() => handleRemoveAccount(row)}
              icon={<DeleteOutlined />}
              danger
            />
          );
        },
      };

      return filteredColumn;
    }

    return col;
  });

  const renderAccountsTable = () => (
    <Descriptions column={7} title="Accounts" layout="vertical" size="small" bordered>
      { _.dropRight(_.drop(tempMainForm.form_items,3),3).map((item) => (
        <Descriptions.Item label={item.label}>
          <FormItem
            disableLabel={true}
            noStyle={true}
            onFail={() => onFail()}
            key={item.name}
            item={item}
          />
        </Descriptions.Item>
      )) }
      <Descriptions.Item label="Debit">
        { accountType === 'Debit' ? 
        <FormItem
          disableLabel={true}
          noStyle={true}
          onFail={onFail}
          key={'debit'}
          item={_.find(tempMainForm.form_items, {name: 'debit'})}
        /> : "" }
        
      </Descriptions.Item>
      <Descriptions.Item label="Credit">
        { accountType === 'Credit' ? 
        <FormItem
          disableLabel={true}
          noStyle={true}
          onFail={onFail}
          key={'credit'}
          item={_.find(tempMainForm.form_items, {name: 'credit'})}
        /> : ""}
      </Descriptions.Item>
      <Descriptions.Item label="Action">
        <Button
          icon={<PlusOutlined/>}
          style={{ backgroundColor: '#3fc380', marginRight: '1%' }}
          type="primary"
          onClick={() => handleAddAccount()}
        >
          Add
        </Button>
      </Descriptions.Item>
    </Descriptions>
  )

  return (
    <>
      <Row>
          <Title>
            {title}
          </Title>
      </Row>
      <Row>
        <Col span={20} offset={1}>
          {
            contentLoading ? <Skeleton/> : (
              <Form
              scrollToFirstError={true}
              form={form} 
              {...styles.formLayout}>
                {_.dropRight(tempMainForm.form_items, 7).map((item) => (
                  <FormItem
                    onFail={onFail}
                    key={item.name}
                    item={item}
                  />
                ))}
                { subContentLoading ? <Skeleton/> : (
                  formType ? renderWithAdjForm() : renderNewAdjForm()
                )}
                { renderAccountsTable() }
                <br/>
                <Table
                  columns={modAccountColumn}
                  dataSource={addedAccounts}
                  pagination={false}
                />
                <br/>
                <Form.Item wrapperCol={{ offset: 12, span: 10 }}>
                  <Descriptions vertical bordered>
                    <Descriptions.Item label="Total Debit">
                      {_.sumBy(addedAccounts, (o) => o.debit )}                      
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Credit">
                      {_.sumBy(addedAccounts, (o) => o.credit )}                   
                    </Descriptions.Item>
                  </Descriptions>
                </Form.Item>
                <br/>
                <FormItem onFail={onFail} item={_.last(formDetails.form_items)} />
                <Form.Item wrapperCol={{ offset: 15, span: 4 }}>
                  <Space size={16}>
                    <Button htmlType="button" onClick={() => history.goBack()}>
                      Cancel
                    </Button>
                    <Button type="primary" onClick={onFinish}>
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            )
          }  
        </Col>
      </Row>
    </>
  );
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
  description: {
    textAlign: 'start',
  },
};