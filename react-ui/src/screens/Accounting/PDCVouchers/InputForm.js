import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Typography,
  Table,
  Empty,
  message,
} from 'antd';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import FormItem from '../../../components/forms/FormItem';
import moment from 'moment';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onCancel, onSubmit, values, formDetails, formTable } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const { path } = useRouteMatch();
  const hasTable = formTable !== null && typeof formTable !== 'undefined';

  const [tableData, setTableData] = useState(null);
  const [cheques, setCheques] = useState([]);
  const [selectedPDC, setSelectedPDC] = useState([]);
  const [toggleValue, setToggleValue] = useState(null);

  const pdcDisbursements = useSelector((state) => state.accounting.PDCDisbursements.list);

  const toggleName = formDetails.toggle_name;

  const selectTableName = 'disbursement'

  useEffect(() => {
    form.setFieldsValue(values);
    if (hasTable && values !== null) {
      setTableData(formTable.getValues(values));
    }
    if (values !== null && toggleName !== null && typeof toggleName !== 'undefined') {
      setToggleValue(values[toggleName]);
    }
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

    if (hasTable) {
      if (tableData !== null) {
        data[formTable.name] = tableData;
        onSubmit(data);
      } else {
        onFinishFailed(
          `Unable to submit. Please provide the necessary information on ${formTable.label}`
        );
      }
    } else {
      onSubmit(data);
    }
  };

  const onFinishFailed = (errorInfo) => {
    if (typeof errorInfo === 'string') {
      message.error(errorInfo);
    } else {
      message.error("An error has occurred. Please double check the information you've provided.");
    }
  };

  // for rendering tables
  const renderTableColumns = (item) => {
    const columns = [];
    item.fields.forEach((field) => {
      if (typeof field.render === 'undefined' || field.render === null) {
        field.render = (object) => object[field.name];
      }
      columns.push({
        title: field.label,
        key: field.name,
        render: (object) => field.render(object),
      });
    });

    return columns;
  };

  const onFail = () => {
    history.push(`${path.replace(new RegExp('/new|[0-9]|:id'), '')}`);
  };

  const onValuesChange = (values) => {
    if (toggleName !== null && typeof toggleName !== 'undefined') {
      if (typeof values[toggleName] !== 'undefined' && toggleValue !== values[toggleName]) {
        setToggleValue(values[toggleName]);
      }
    }

    if (values.hasOwnProperty(formTable.name)) {
      setTableData(form.getFieldValue(formTable.name));
    }
  };

  const onTableSelect = (key, value) => {
    const formValues = {};

    if (key === selectTableName) {
      const selectedPDC = pdcDisbursements.find((slip) => slip.id === value);
      formValues[key] = {
        id: selectedPDC.id,
        number: selectedPDC.number
      };
      formValues.cheques = selectedPDC?.cheques ?? [];
      formValues.disbursementDate = moment(new Date(selectedPDC.date)).format('DD/MM/YYYY')
      formValues.payee = `[${selectedPDC.payee.code}] ${selectedPDC.payee.name}`
      setCheques(selectedPDC.cheques);
    } else {
      formValues[key] = value;
    }
    form.setFieldsValue(formValues);
    onValuesChange(formValues);
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
              const itemData = {
                ...item,
              };
                            
              if (item.name === selectTableName) {
                itemData.selectedData = selectedPDC;
                itemData.setSelectedData = setSelectedPDC;
              }

              return <FormItem item={itemData} onFail={onFail} onTableSelect={onTableSelect} />;
            })}
            {hasTable && cheques.length > 0 && (
              <Form.List label={formTable.label} name={formTable.name} rules={[{ required: true }]}>
                {(fields, { errors }) => (
                  <Col span={20} offset={1}>
                    <Table
                      dataSource={tableData}
                      columns={renderTableColumns(formTable)}
                      pagination={false}
                      locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                      summary={formTable.summary}
                    />
                  </Col>
                )}
              </Form.List>
            )}
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
