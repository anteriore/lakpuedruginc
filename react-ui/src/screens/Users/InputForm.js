import React, { useEffect } from 'react';
import {
  Form,
  Button,
  Input,
  Checkbox,
  Row,
  Col,
  Typography,
  message,
} from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormItem from '../../components/forms/FormItem'

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onCancel, onSubmit, values, formDetails, formMode } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const permissions = useSelector((state) => state.users.listPermission);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  const onFail = () => {
    history.push(`/users`);
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
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
          >
            {formDetails.form_items.map((item) => (
              <FormItem item={item} onFail={onFail} formMode={formMode} />
            ))}

            <Form.List
              {...{ wrapperCol: { span: 24 }, labelCol: { span: 24 } }}
              label="Permissions"
              name="permissions"
              rules={[{ required: true }]}
            >
              {({ errors }) => (
                <>
                  <Row>
                    <Title level={5} style={{ float: 'left' }}>
                      Permissions
                    </Title>
                  </Row>
                  <Row>
                    {permissions.map((permission) => {
                      return (
                        <Row style={styles.formList}>
                          <Row style={{ width: '100%' }}>
                            <Title level={5} style={{ float: 'left' }}>
                              {permission.category}
                            </Title>
                          </Row>
                          <Row style={{ width: '100%' }}>
                            {permission.permissionSubs.map((permissionSub) => {
                              return (
                                <Row style={{ width: '100%' }}>
                                  <Form.Item
                                    name={[permissionSub.code, 'id']}
                                    fieldKey={[permissionSub.code, 'id']}
                                    hidden
                                  >
                                    <Input />
                                  </Form.Item>
                                  <Form.Item
                                    name={[permissionSub.code, 'code']}
                                    fieldKey={[permissionSub.code, 'code']}
                                    hidden
                                  >
                                    <Input />
                                  </Form.Item>
                                  <Form.Item
                                    {...styles.listItems}
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'flex-end',
                                      width: '95%',
                                    }}
                                    label={permissionSub.name}
                                    name={[permissionSub.code, 'actions']}
                                    fieldKey={[permissionSub.code, 'actions']}
                                  >
                                    <Checkbox.Group>
                                      <Checkbox value="c">Create</Checkbox>
                                      <Checkbox value="r">Read</Checkbox>
                                      <Checkbox value="u">Update</Checkbox>
                                      <Checkbox value="d">Delete</Checkbox>
                                    </Checkbox.Group>
                                  </Form.Item>
                                </Row>
                              );
                            })}
                          </Row>
                        </Row>
                      );
                    })}
                    <Form.ErrorList errors={errors} />
                  </Row>
                </>
              )}
            </Form.List>

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
