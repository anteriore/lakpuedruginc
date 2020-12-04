import React, { useEffect, useState } from 'react';
import { Form, Button, Input, InputNumber, Select, Checkbox, Row, Col, Typography, Space, Skeleton, message } from 'antd';
import { LockOutlined, MinusCircleOutlined, SelectOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { addUser } from '../Users/redux';
import { getUser } from '../../redux/auth';
import { listCompany } from '../../redux/company';
import { listD, clearData as clearDepartment } from '../Maintenance/DepartmentArea/redux';
import Container from '../../components/container';
import FormModal from '../../components/forms/FormModal';

const { TextArea } = Input;
const { Title } = Typography;

const Account = (props) => {
  const { title, onCancel, onSubmit, values } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  const [loading, setLoading] = useState(true)
  const departments = useSelector((state) => state.maintenance.departmentArea.deptList)
  const companies = useSelector((state) => state.company.companyList)
  const user = useSelector((state) => state.auth.user)

  const [displayForm, setDisplayForm] = useState(false)

  const formData = {
    ...user,
    department: user.department !== null ? user.department.id : null,
    company: user.company !== null ? user.company.id : null,
  };

  useEffect(() => {
    dispatch(listCompany()).then(() => {
        dispatch(listD({company: user.company.id})).then(() => {
            setLoading(false)
        })
    })

    return function cleanup() {
        setLoading(true)
        setDisplayForm(false)
        dispatch(clearDepartment());
      };

  }, [dispatch]);

  useEffect(() => {
    if(!loading){
        form.setFieldsValue(formData);
    }
  }, [loading, form, formData]);

  const formPassword = {
    form_name: 'password',
    form_items: [
        {
            label: 'Old Password',
            name: 'oldPassword',
            type: 'password',
            rules: [{ required: true, message: 'Please provide a valid password.' }],
            placeholder: 'Old Password',
            writeOnly: true
        },
        {
            label: 'New Password',
            name: 'password',
            type: 'password',
            rules: [{ required: true, message: 'Please provide a valid password. Your password must be at least 8 characters long.', min: 8 }],
            placeholder: 'New Password',
            writeOnly: true
        },
        {
            label: 'Confirm Password',
            name: 'confirmPassword',
            type: 'password',
            dependencies: ['password'],
            rules: [
            { required: true, message: 'Please confirm your password.' },
            ({ getFieldValue }) => ({
                validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
                },
            }),
            ],
            placeholder: 'Confirm Password',
            writeOnly: true
        },
    ]
}

  const formDetails = {
    form_name: 'user',
    form_items: [
      {
        label: 'First Name',
        name: 'firstName',
        rules: [{ required: true, message: 'Please provide a valid First Name' }],
        placeholder: 'First Name',
      },
      {
        label: 'Middle Initial',
        name: 'middleInitial',
        rules: [{ required: true, message: 'Please provide a valid Middle Initial' }],
        placeholder: 'Middle Initial',
        maxLength: 2
      },
      {
        label: 'Last Name',
        name: 'lastName',
        rules: [{ required: true, message: 'Please provide a valid Last Name' }],
        placeholder: 'Last Name',
      },
      {
        label: 'Email Address',
        name: 'email',
        rules: [{ required: true, message: 'Please provide a valid Email Address' }],
        placeholder: 'Email Address',
      },
      {
        label: 'Company',
        name: 'company',
        type: 'select',
        selectName: 'name',
        choices: companies,
        rules: [{ required: true }],
        placeholder: 'Select company',
      },
      {
        label: 'Employee Type',
        name: 'employeeType',
        rules: [{ required: true, message: 'Please provide a valid Employee Type' }],
        placeholder: 'Employee Type',
      },
      {
        label: 'Department',
        name: 'department',
        type: 'select',
        selectName: 'name',
        choices: departments,
        rules: [{ required: true }],
        placeholder: 'Select department',
      },
    ],
  };

  const FormItem = ({ item }) => {
    if (item.type === 'select') {
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <Select placeholder={item.placeholder}>
            {item.choices.map((choice) => (
              <Select.Option value={choice.id}>{choice[item.selectName]}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      );
    }
    else if (item.type === 'textArea') {
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <TextArea rows={3} maxLength={200} placeholder={item.placeholder} />
        </Form.Item>
      );
    }
    else if(item.type === 'number'){
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <InputNumber style={styles.inputNumber}/>
        </Form.Item>
      );
    }
    else if(item.type === 'checkList'){
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <Checkbox.Group style={styles.inputCheckList}>
              {item.choices.map((choice) => (
                <Row>
                  <Checkbox value={choice.id}>{item.render(choice)}</Checkbox>
                </Row>
              ))}
          </Checkbox.Group>
        </Form.Item>
      )
    }
    else {
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <Input placeholder={item.placeholder} maxLength={item.maxLength} />
        </Form.Item>
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    // message.error(errorInfo)
  };

  const onFinish = (data) => {
    var payload = {
        ...data,
        id: user.id,
        company: {
          id: data.company,
        },
        department: {
          id: data.department
        }
    };
    dispatch(addUser(payload)).then((response) => {
        if(response.payload.status === 200){
            dispatch(getUser()).then(() => {
                history.goBack();
                message.success(`Successfully updated your user details`);
            })
        }
        else {
            message.error(`Unable to update user details`);
        }
    });
  }

  const handleUpdatePassword = () => {
      setDisplayForm(true)
  }
  
  const onSubmitPassword = (data) => {
      console.log("Password update request")
      console.log({password: data.password})
      setDisplayForm(false)
  }

  return (
    <Container location={{ pathname: path }}>
      <Row>
        <Title level={3}>{"Update Account Details"}</Title>
        
      </Row>
      <Row>
        <Col span={20}>
        <Row style={{display:"flex", justifyContent: "flex-end", width: "87.5%", marginBottom: "2%"}}>
            <Button
                icon={<LockOutlined />}
                onClick={(e) => {
                    handleUpdatePassword()
                }}
            >
                Change Password
            </Button>
        </Row>
            {loading ? (
                <Skeleton/>
            ) : (
                <Form 
                    {...styles.layout}
                    form={form}
                    initialValues={values} 
                    name={formDetails.form_name}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {formDetails.form_items.map((item) => (
                    <FormItem item={item} />
                    ))}

                    <div style={styles.tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button
                        style={{ marginRight: '2%' }}
                        onClick={() => {
                        history.goBack();
                        }}
                    >
                        Cancel
                    </Button>
                    </div>
                </Form>
            )}
        </Col>
        <FormModal
          visible={displayForm}
          title={"Change Password"}
          onSubmit={onSubmitPassword}
          values={null}
          onCancel={() => {setDisplayForm(false)}}
          formDetails={formPassword}
        />
      </Row>
    </Container>
  );
};

export default Account;

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
    borderStyle: "solid",
    borderWidth: 1,
    padding: "2%",
    backgroundColor: "#FAFAFA",
    width: '87.5%',
    marginBottom: "2%",
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
