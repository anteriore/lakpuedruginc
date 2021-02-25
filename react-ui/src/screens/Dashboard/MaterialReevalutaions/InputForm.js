import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Typography, Form, Skeleton, Space, Button, Descriptions } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import { updateList } from '../../../helpers/general-helper';
import FormItem from '../../../components/forms/FormItem';
import { formDetails } from './data';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onSubmit } = props;
  const history = useHistory();
  const { path } = useRouteMatch();
  const [form] = useForm();
  const [contentLoading, setContentLoading] = useState(true);
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [appReceipts, setAppReceipts] = useState(null);
  const { approvedReceiptsList } = useSelector((state) => state.dashboard.approvedReceipts);

  const handleControlNumberChange = useCallback(
    (value) => {
      setAppReceipts(_.find(approvedReceiptsList, (o) => o.id === value));
    },
    [approvedReceiptsList]
  );

  useEffect(() => {
    const newForm = tempFormDetails;
    const masterList = {
      controlNumber: approvedReceiptsList,
    };
    const formItem = _.find(newForm.form_items, { name: 'controlNumber' });
    formItem.onChange = (e) => handleControlNumberChange(e);
    setTempFormDetails(updateList(newForm, masterList));

    setContentLoading(false);
  }, [tempFormDetails, approvedReceiptsList, handleControlNumberChange]);

  const onFail = () => {
    history.push(`/${path.split('/')[1]}/${path.split('/')[2]}`);
  };

  const onFinish = (value) => {
    formDetails.form_items.forEach((item) => {
      if (
        item.type === 'date' &&
        typeof value[item.name] !== 'undefined' &&
        value[item.name] !== null
      ) {
        value[item.name] = `${value[item.name].format('YYYY-MM-DD')}T${value[item.name].format(
          'HH:mm:ss'
        )}`;
      }
    });

    onSubmit(value);
    history.goBack();
  };

  return (
    <>
      <Row>
        <Title>{title}</Title>
      </Row>
      <Row>
        <Col span={20} offset={1}>
          {contentLoading ? (
            <Skeleton />
          ) : (
            <Form form={form} onFinish={onFinish} {...styles.formLayout}>
              <FormItem
                onFail={onFail}
                key={_.head(tempFormDetails.form_items).name}
                item={_.head(tempFormDetails.form_items)}
              />
              <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                {appReceipts === null ? (
                  ''
                ) : (
                  <Descriptions size="small" layout="vertical" bordered {...styles.description}>
                    <Descriptions.Item label={appReceipts?.item?.type?.name ?? ''}>
                      Item Name: {appReceipts?.item?.name ?? ''} <br />
                      Item Code: {appReceipts?.item?.code ?? ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="Reevaluated By">
                      {appReceipts?.receivedBy?.firstName ?? ''} &nbsp;
                      {appReceipts?.receivedBy?.middleInitial ?? ''} &nbsp;
                      {appReceipts?.receivedBy?.lastName ?? ''} &nbsp;
                    </Descriptions.Item>
                    <Descriptions.Item label="Approved Receipt Date">
                      {moment(new Date(appReceipts.date)).format('DD/MM/YYYY')}
                    </Descriptions.Item>
                    <Descriptions.Item label="AR No">{appReceipts?.number ?? ''}</Descriptions.Item>
                    <Descriptions.Item label="RR No">
                      {appReceipts?.rrNumber ?? ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="SI No">
                      {appReceipts?.receivingReceipt?.siNumber ?? ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="Specified Gravity">
                      {appReceipts?.specifiedGravity ?? ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="Max Containers">
                      {appReceipts?.maxContainers ?? ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="QC Samples">
                      {appReceipts?.qcSamples ?? ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="Received Quantity">
                      {appReceipts?.receivedQuantity ?? ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="Approved Quantity">
                      {appReceipts?.approvedQuantity ?? ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="Rejected Quantity">
                      {appReceipts?.rejectedQuantity ?? ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Quantity">
                      {appReceipts?.totalQuantity ?? ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="Delivery Number">
                      {appReceipts?.receivingReceipt?.drNumber ?? ''}
                    </Descriptions.Item>
                    {_.dropRight(_.drop(tempFormDetails.form_items, 1), 1).map((item) => (
                      <Descriptions.Item key={item.name} label={item.label}>
                        <FormItem onFail={onFail} key={item.name} item={item} />
                      </Descriptions.Item>
                    ))}
                  </Descriptions>
                )}
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
  description: {
    textAlign: 'start',
  },
};
