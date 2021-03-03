import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Typography, Form, Skeleton, Space, Button, Descriptions } from 'antd';
import FormDetails from './data';
import { useForm } from 'antd/lib/form/Form';
import _, { set } from 'lodash';
import FormItem from '../../../components/forms/FormItem';
import { useSelector } from 'react-redux';
import { updateList } from '../../../helpers/general-helper';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onSubmit} = props;
  const { formDetails, manualFormDetails, autoFormDetails } = FormDetails();
  const { list: listRR } = useSelector(state => state.dashboard.receivingReceipts);
  const { list: listVendor } = useSelector(state => state.maintenance.vendors);
  const [tempMainForm, setTempMainForm] = useState(_.clone(formDetails));
  const [tempManualForm, setTempManualForm] = useState(_.clone(manualFormDetails));
  const [tempAutoForm, setTempAutoForm] = useState(_.clone(autoFormDetails));
  const [contentLoading, setContentLoading] = useState(true);
  const [subContentLoading, setSubContentLoading] = useState(true);
  const [formType, setFormType] = useState(_.find(formDetails.form_items, {name: 'manual'}).initialValue);
  const [form] = useForm();

  const handleChangeFormType = useCallback((value) => {
    setFormType(value)
  },[])

  useEffect(() => {
    const newForm = tempMainForm;
    const formItem = _.find(newForm.form_items, {name: 'manual'})
    formItem.onChange = (e) => handleChangeFormType(e.target.value)
    setTempMainForm(newForm);
    setContentLoading(false);
  },[tempMainForm, handleChangeFormType])

  useEffect(() => {
    setSubContentLoading(true);
    const newForm = tempAutoForm;
    const masterList = {
      rrNumber: listRR
    };
    // console.log(updateList(newForm, masterList))
    setTempAutoForm(updateList(newForm, masterList))
    setSubContentLoading(false);
  },[tempAutoForm, formType, listRR])

  const onFail = () => {
    console.log("Fail")
  }

  const renderAutoForm = () => tempAutoForm.form_items.map((item) => 
    <FormItem
      onFail={onFail}
      key={item.name}
      item={item}
    />
  );

  const renderManualForm = () => tempManualForm.form_items.map((item) => (
    <FormItem
      onFail={onFail}
      key={item.name}
      item={item}
    />
  ))

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
              <Form form={form} {...styles.formLayout}>
                {_.dropRight(tempMainForm.form_items,1 ).map((item) => (
                  <FormItem
                    onFail={onFail}
                    key={item.name}
                    item={item}
                  />
                ))}
                { subContentLoading ? <Skeleton/> : (
                  formType ? renderManualForm() : renderAutoForm()
                ) }
              </Form>
            )   
          }
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
  description: {
    textAlign: 'start',
  },
};