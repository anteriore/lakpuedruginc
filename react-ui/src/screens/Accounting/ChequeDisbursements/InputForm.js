import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Typography,
  message,
} from 'antd';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import FormItem from '../../../components/forms/FormItem';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onCancel, onSubmit, values, formDetails } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const { path } = useRouteMatch();

  const [selectedData, setSelectedData] = useState([]);

  const chequePrintings = useSelector((state) => state.accounting.chequePrintings.list);

  const selectTableName = 'chequePrinting'


  useEffect(() => {
    form.setFieldsValue(values);
    // eslint-disable-next-line
  }, [values, form]);

  const onFinish = (data) => {
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

    
    onSubmit(data);
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

  const onTableSelect = (key, value) => {
    const formValues = {};

    if (key === selectTableName) {
      const selectedData = chequePrintings.find((slip) => slip.id === value);
      formValues[key] = {
        id: value,
        number: selectedData.number
      };
      formValues.vendor = formDetails.form_items.find((item) => item.name === 'vendor').render(selectedData.vendor)
      formValues.chequeDate = formDetails.form_items.find((item) => item.name === 'chequeDate').render(selectedData.chequeDate)
      formValues.chequeNumber = selectedData.chequeNumber
      formValues.payeeName = selectedData.payeeName
      formValues.bankAccount = formDetails.form_items.find((item) => item.name === 'bankAccount').render(selectedData.bankAccount)

      //TODO: Display selected vouchers

    } else {
      formValues[key] = value;
    }
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
          >
            {formDetails.form_items.map((item) => {
              const itemData = {
                ...item,
              };
                            
              if (item.name === selectTableName) {
                itemData.selectedData = selectedData;
                itemData.setSelectedData = setSelectedData;
              }

              return <FormItem item={itemData} onFail={onFail} onTableSelect={onTableSelect} formInstance={form} />;
            })}
            <div style={styles.tailLayout}>
              <Button type="primary" onClick={() => form.submit()}>
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
