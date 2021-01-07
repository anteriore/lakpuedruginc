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
import { useHistory } from 'react-router-dom';
import FormItem from '../../../components/forms/FormItem'

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onCancel, onSubmit, values, formDetails, formMode } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const [terms, setTerms] = useState(null)

  useEffect(() => {
    form.setFieldsValue(values);
    if(typeof values !== 'undefined' && values !== null){
        setTerms(values.terms)
    }
  }, [values, form]);

  const onFinish = (data) => {
    formDetails.form_items.forEach((item) => {
      if (item.type === 'date' && typeof data[item.name] !== 'undefined' && data[item.name] !== null) {
        data[item.name] = `${data[item.name].format('YYYY-MM-DD')}T${data[item.name].format(
          'HH:mm:ss'
        )}`;
      }
    });

    onSubmit(data);
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  const onValuesChange = (values) => {
      if(typeof values.terms !== 'undefined' && terms !== values.terms){
        setTerms(values.terms)
      }
  }

  const onFail = () => {
    history.push(`/sales/acknowledgement-receipts/`);
  }
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
                if(item.toggle){
                    if(terms === 'CHEQUE'){
                        return <FormItem item={item} onFail={onFail} formMode={formMode} />
                    }
                    else return null
                }
                else{
                    return <FormItem item={item} onFail={onFail} formMode={formMode} />
                }
            }
            )}

            <div style={styles.tailLayout}>
              <Button type="primary" htmlType="submit">
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
    backgroundColor: '#FAFAFA',
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
