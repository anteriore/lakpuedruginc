import React, { useState } from 'react';
import { Form, Button, Row, Col, Typography, message } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import FormItem from '../../../components/forms/FormItem';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onCancel, onSubmit, values, formDetails, formTable } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const { path } = useRouteMatch();
  const hasTable = formTable !== null && typeof formTable !== 'undefined';

  const [formButtonLoading, setFormButtonLoading] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [selectedSaleSlip, setSelectedSaleSlip] = useState([]);

  const orderSlips = useSelector((state) => state.sales.orderSlips.orderSlipsList);
  const salesInvoices = useSelector((state) => state.sales.salesInvoice.salesInvoiceList);
  let salesSlips = [];
  salesSlips = salesSlips.concat(orderSlips).concat(salesInvoices);

  const onFinish = (data) => {
    setFormButtonLoading(false);
    formDetails.form_items.forEach((item) => {
      if (
        item.type === 'date' &&
        typeof data[item.name] !== 'undefined' &&
        data[item.name] !== null
      ) {
        data[item.name] = `${data[item.name].format('YYYY-MM-DD')}T${data[item.name].format(
          'HH:mm:ss'
        )}`;
      }
    });

    if (hasTable) {
      if (tableData !== null) {
        data[formTable.name] = tableData;
        onSubmit(data).then(() => setFormButtonLoading(false));
      } else {
        onFinishFailed(
          `Unable to submit. Please provide the necessary information on ${formTable.label}`
        );
      }
    } else {
      onSubmit(data).then(() => setFormButtonLoading(false));
    }
  };

  const onFinishFailed = (errorInfo) => {
    if (typeof errorInfo === 'string') {
      message.error(errorInfo);
    } else {
      message.error("An error has occurred. Please double check the information you've provided.");
    }
  };

  const onFail = () => {
    history.push(`${path.replace(new RegExp('/new|[0-9]|:id'), '')}`);
  };

  const onValuesChange = (values) => {
    if (values.hasOwnProperty('depot')) {
      setSelectedSaleSlip([]);
      setTableData(null);
      form.setFieldsValue({ reference: null, client: null });
    }
  };

  const onTableSelect = (key, value) => {
    const formValues = {};

    if (key === 'reference') {
      const selectedSaleSlip = salesSlips.find((slip) => slip.id === value);
      formValues[key] = selectedSaleSlip.number;
      /* formValues.reference = { 
          id: selectedSaleSlip.id,
          type: selectedSaleSlip.type,
          remainingBalance: selectedSaleSlip.remainingBalance,
      } */
      formValues.reference = selectedSaleSlip;
      formValues.client = selectedSaleSlip.salesOrder.client.id;
    } else {
      formValues[key] = value;
    }
    onValuesChange(formValues);
    form.setFieldsValue(formValues);
  };

  return (
    <>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row>
        <Col span={20}>
          <Form
            {...styles.layout}
            form={form}
            initialValues={values}
            name={formDetails.form_name}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
          >
            {formDetails.form_items.map((item) => {
              return <FormItem item={item} onFail={onFail} />;
            })}

            {formDetails.memo_items.map((item) => {
              const itemData = {
                ...item,
              };

              if (item.name === 'reference') {
                itemData.selectedData = selectedSaleSlip;
                itemData.setSelectedData = setSelectedSaleSlip;
              }

              return <FormItem item={itemData} onFail={onFail} onTableSelect={onTableSelect} />;
            })}
            <div style={styles.tailLayout}>
              <Button loading={formButtonLoading} type="primary" onClick={() => form.submit()}>
                Submit
              </Button>
              <Button
                style={{ marginRight: '2%' }}
                onClick={() => {
                  onCancel();
                  history.goBack();
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default InputForm;

const styles = {
  layout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 15,
    },
  },
  listItems: {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  },
  listLayout: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '2%',
  },
  tailLayout: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '87.5%',
  },
  listTailLayout: {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  },
  formList: {
    borderStyle: 'solid',
    borderWidth: 1,
    padding: '2%',
    // backgroundColor: "#FAFAFA",
    width: '87.5%',
    marginBottom: '2%',
  },
  datePicker: {
    float: 'left',
  },
  inputNumber: {
    float: 'left',
  },
  inputCheckList: {
    float: 'left',
  },
};
