import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Typography,
  Table,
  Empty,
  Modal,
  Alert,
  message,
} from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import FormItem from '../../../components/forms/FormItem';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

const FormScreen = (props) => {
  const { title, onCancel, onSubmit, values, formDetails, formTable } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const { path } = useRouteMatch();

  const hasTable = formTable !== null && typeof formTable !== 'undefined';

  const [tableData, setTableData] = useState(null);
  const areceipts = useSelector((state) => state.sales.acknowledgementReceipts.list);

  useEffect(() => {
    form.setFieldsValue(values);
    if (hasTable && values !== null) {
      setTableData(formTable.getValues(values.acknowledgementReceipt));
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
      else if(item.type === 'selectTable'&&
      typeof data[item.name] !== 'undefined' &&
      data[item.name] !== null
      ){
        const dataField = data[item.name]
        data[item.name] = dataField[item.rowKey]
      }
    });

    if (hasTable) {
      data[formTable.name] = tableData;
    }

    onSubmit(data);
  };

  const onFinishFailed = () => {
    // console.log(errorInfo)
    message.error("An error has occurred. Please double check the information you've provided.");
  };

  const onValuesChange = (event) => {
    if(event.hasOwnProperty("acknowledgementReceipt")){
      console.log(event)
      const selectedAR = areceipts.find(areceipt => areceipt.id === event.acknowledgementReceipt)
      form.setFieldsValue({
        customerCode: selectedAR.client.code,
        tin: selectedAR.client.tin,
        receivedFrom: selectedAR.client.name,
        businessAddress: selectedAR.client.businessAddress,
      })
      var paymentsData = []
      selectedAR.payments.forEach((payment) => {
        paymentsData.push({
          ...payment.reference,
          appliedAmount: payment.appliedAmount
        })
      })
      console.log(paymentsData)
      setTableData(paymentsData)

    }
  }

  const onFail = () => {
    history.push(`${path.replace(new RegExp('/new|[0-9]|:id'), '')}`);
  };

  const onTableSelect = (key, value) => {
    var formValues = {}
    formValues[key] = value
    onValuesChange(formValues)
    const selectedAR = areceipts.find(areceipt => areceipt.id === value)
    formValues[key] = selectedAR
    form.setFieldsValue(formValues)
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
              return <FormItem item={item} onFail={onFail} onTableSelect={onTableSelect} />;
            })}

            {areceipts !== null && areceipts.length > 0 ? ( 
            formDetails.ar_items.map((item) => {
              return <FormItem item={item} onFail={onFail} onTableSelect={onTableSelect} />;
            })
            ):(
              <Alert 
                message="Please select a depot with a pending acknowledgement receipt." 
                type="warning" 
                showIcon 
                style={{width: '62.5%', marginLeft: '25%', marginBottom: '2%'}} />
            )}
          </Form>
          
           
          
          {areceipts !== null && areceipts.length > 0 && (
          <Table
            dataSource={tableData}
            columns={formTable.columns}
            pagination={false}
            locale={{ emptyText: <Empty description="Please select an Acknowledgement Receipt." /> }}
            summary={(data) => {
              let vatableSales = 0;
              let totalSales = 0;
              let vatExemptSales = 0;
              let vatLess = 0;
              let zeroRatedSales = 0;
              let netSales = 0;
              data.forEach(({ appliedAmount }) => {
                vatableSales += appliedAmount / 1.12
                totalSales += appliedAmount
                vatLess += appliedAmount / 1.12 * 0.12
                netSales += appliedAmount / 1.12
              });
              return(
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell>VATABLE Sales</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{vatableSales.toFixed(2)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>Total Sales (Vat Inclusive)</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{totalSales.toFixed(2)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell>VAT Exempt Sales</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{vatExemptSales.toFixed(2)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>less VAT</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{vatLess.toFixed(2)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell>Zero-Rated Sales</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{zeroRatedSales.toFixed(2)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>NET</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{netSales.toFixed(2)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              )
            }
            }
            style={{width: "87.5%"}}
          />
          )}

          {areceipts !== null && areceipts.length > 0 && (
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
          )}
        </Col>
      </Row>
    </>
  );
};

export default FormScreen;

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
