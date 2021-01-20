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
      setTableData(formTable.getValues(values));
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
      const selectedAR = areceipts.find(areceipt => areceipt.id === event.acknowledgementReceipt)
      form.setFieldsValue({
        customerCode: selectedAR.client.code,
        tin: selectedAR.client.tin,
        receivedFrom: selectedAR.client.name,
        businessAddress: selectedAR.client.businessAddress,
      })
    }
  }

  const onFail = () => {
    history.push(`${path.replace(new RegExp('/new|[0-9]|:id'), '')}`);
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
          </Form>

          
          <Table
            dataSource={tableData}
            columns={formTable.columns}
            pagination={false}
            locale={{ emptyText: <Empty description="Please select an Acknowledgement Receipt." /> }}
            summary={(data) => {
              return(
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell>VATABLE Sales</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{0}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>Total Sales (Vat Inclusive)</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{0}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell>VAT Exempt Sales</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{0}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>less VAT</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{0}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell>Zero-Rated Sales</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{0}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>NET</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text>{0}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              )
            }
            }
            style={{width: "87.5%"}}
          />

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
