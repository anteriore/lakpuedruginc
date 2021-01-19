import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Tabs,
  Button,
  Typography,
  Skeleton,
  Divider,
  Empty,
  Card,
  Drawer,
  Descriptions,
  List,
  message,
} from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserAddOutlined,
  UserOutlined,
  EditOutlined /* DeleteOutlined */,
} from '@ant-design/icons';

import Container from '../../components/container';
import InputForm from './InputForm';

import { listUser, addUser, updateUser, /* deleteUser, */ clearData, listPermission } from './redux';
import { listCompany, setCompany } from '../../redux/company';
import { listD, clearData as clearDepartment } from '../Maintenance/DepartmentArea/redux';
import { listDepot, clearData as clearDepot } from '../Maintenance/Depots/redux';

const { TabPane } = Tabs;
const { Title } = Typography;
const { Meta } = Card;

const Users = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const [companyLoading, setCompanyLoading] = useState(true);
  const companies = useSelector((state) => state.company.companyList);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);

  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [contentLoading, setContentLoading] = useState(true);
  const [userDepartments, setUserDepartments] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const departments = useSelector((state) => state.maintenance.departmentArea.deptList);
  const depots = useSelector((state) => state.maintenance.depots.list);

  useEffect(() => {
    dispatch(listCompany()).then(() => {
      setFormData(null);
      setCompanyLoading(false);
      setSelectedUser(null);
      updateUserDepartments(1);
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearDepartment());
    };
    // eslint-disable-next-line
  }, [dispatch]);

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
        maxLength: 2,
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
        label: 'Password',
        name: 'password',
        type: 'password',
        rules: [
          {
            required: true,
            message:
              'Please provide a valid password. The password must be at least 8 characters long.',
            min: 8,
          },
        ],
        placeholder: 'Password',
        writeOnly: true,
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
        writeOnly: true,
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
        type: 'selectSearch',
        selectName: 'name',
        choices: departments,
        rules: [{ required: true }],
        placeholder: 'Select department',
      },
      {
        label: 'Depots',
        name: 'depots',
        type: 'checkList',
        selectName: 'name',
        choices: depots,
        render: (object) => `[${object.code}] ${object.name}`,
        rules: [{ required: true }],
        placeholder: 'Select depots',
      },
      {
        label: 'Permissions',
        name: 'permissions',
        type: 'customList',
      },
    ],
  };

  const handleAdd = () => {
    setFormTitle('Add User');
    setFormMode('add');
    setFormData(null);
    setCompanyLoading(true);
    dispatch(listD({ company: selectedCompany, message })).then(() => {
      dispatch(listDepot({ company: selectedCompany, message })).then(() => {
        dispatch(listPermission({ company: selectedCompany, message })).then(() => {
          history.push(`${path}/new`);
          setCompanyLoading(false);
        });
      });
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Edit User');
    setFormMode('edit');
    const depotData = [];
    data.depots.forEach((depot) => {
      depotData.push(depot.id);
    });
    const permissionsData = {};
    for (const [key, value] of Object.entries(data.permissions)) {
      const actions = [];
      for (let i = 0; i < value.actions.length; i++) {
        actions.push(value.actions[i]);
      }
      permissionsData[key] = {
        ...value,
        actions,
      };
    }
    const formData = {
      ...data,
      department: data.department !== null ? data.department.id : null,
      depots: depotData,
      permissions: permissionsData,
    };
    setFormData(formData);
    setCompanyLoading(true);
    dispatch(listD({ company: selectedCompany, message })).then(() => {
      dispatch(listDepot({ company: selectedCompany, message })).then(() => {
        dispatch(listPermission({ company: selectedCompany, message })).then(() => {
          history.push(`${path}/${data.id}`);
          setCompanyLoading(false);
        });
      });
    });
  };

  /* const handleDelete = (data) => {
    dispatch(deleteUser(data.id)).then((response) => {
      setContentLoading(true);
      if (response.payload.status === 200) {
        dispatch(listUser({ selectedCompany })).then(() => {
          setContentLoading(false);
          message.success(`Successfully deleted ${data.firstName} ${data.lastName}`);
        });
      } else {
        setContentLoading(false);
        message.error(`Unable to delete ${data.firstName} ${data.lastName}`);
      }
    });
  }; */

  const handleCancelButton = () => {
    setFormData(null);
  };

  const onSubmit = (data) => {
    const depotData = [];
    data.depots.forEach((depot) => {
      depotData.push({
        id: depot,
      });
    });
    const permissionData = {};
    for (const key in data.permissions) {
      let actionStr = '';
      if (
        typeof data.permissions[key].actions !== 'undefined' &&
        data.permissions[key].actions !== null
      ) {
        for (let i = 0; i < data.permissions[key].actions.length; i++) {
          actionStr = actionStr.concat(data.permissions[key].actions[i]);
        }

        if (typeof data.permissions[key].code === 'undefined') {
          data.permissions[key].code = key;
        }

        permissionData[key] = {
          ...data.permissions[key],
          actions: actionStr,
        };
      }
    }
    const payload = {
      ...data,
      company: {
        id: selectedCompany,
      },
      department: {
        id: data.department,
      },
      depots: depotData,
      permissions: permissionData,
    };
    if (formMode === 'edit') {
      payload.id = formData.id;
      console.log(payload)
      dispatch(updateUser(payload)).then((response) => {
        setContentLoading(true);
        if (response.payload.status === 200) {
          updateUserDepartments(selectedCompany);
          history.goBack();
          message.success(`Successfully updated ${data.firstName} ${data.lastName}`);
        } else {
          setContentLoading(false);
          message.error(`Unable to update ${data.firstName} ${data.lastName}`);
        }
      });
    } else if (formMode === 'add') {
      dispatch(addUser(payload)).then((response) => {
        setContentLoading(true);
        if (response.payload.status === 200) {
          updateUserDepartments(selectedCompany);
          history.goBack();
          message.success(`Successfully added ${data.firstName} ${data.lastName}`);
        } else {
          setContentLoading(false);
          message.error(`Unable to add ${data.firstName} ${data.lastName}`);
        }
      });
    }
    setFormData(null);
  };

  const updateUserDepartments = (companyID) => {
    dispatch(listD({ company: companyID, message })).then((response) => {
      if (response.payload.status === 200) {
        const userDepartmentList = [];
        response.payload.data.forEach((department) => {
          userDepartmentList.push({
            id: department.id,
            users: [],
          });
        });
        dispatch(listUser({ company: companyID, message })).then((response) => {
          if (response.payload.status === 200) {
            response.payload.data.forEach((user) => {
              const usersPerDept = userDepartmentList.find(
                (department) => department.id === user.department.id
              );
              usersPerDept.users.push(user);
            });
            setUserDepartments(userDepartmentList);
            setContentLoading(false);
          }
        });
      }
    });
  };

  const handleChangeTab = (companyID) => {
    setContentLoading(true);
    dispatch(setCompany(companyID));
    updateUserDepartments(companyID);
  };

  const renderUsers = (departmentUsers) => {
    if (departmentUsers.users.length > 0) {
      let index = 0;
      let usersRow = [];
      const usersGrid = [];
      departmentUsers.users.forEach((user) => {
        index += 1;
        usersRow.push(
          <Card
            bordered
            hoverable
            style={styles.Card}
            onClick={() => {
              setSelectedUser(user);
              showDrawer();
            }}
          >
            <Meta avatar={<UserOutlined />} title={`${user.firstName} ${user.lastName}`} />
          </Card>
        );
        if (index % 4 === 0) {
          usersGrid.push(<Row gutter={styles.gutter}>{usersRow}</Row>);
          usersRow = [];
        }
      });
      if (index % 4 !== 0) {
        usersGrid.push(
          <Row gutter={styles.gutter} style={styles.row}>
            {usersRow}
          </Row>
        );
      }
      return usersGrid;
    }

    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  };

  const showDrawer = () => {
    setDisplayDrawer(true);
  };

  const onClose = () => {
    setDisplayDrawer(false);
    setSelectedUser(null);
  };

  return (
    <Container location={{ pathname: path }}>
      <Switch>
        <Route path={`${path}/new`}>
          <InputForm
            title={formTitle}
            onSubmit={onSubmit}
            values={formData}
            onCancel={handleCancelButton}
            formDetails={formDetails}
            formMode={formMode}
          />
        </Route>
        <Route path={`${path}/:id`}>
          <InputForm
            title={formTitle}
            onSubmit={onSubmit}
            values={formData}
            onCancel={handleCancelButton}
            formDetails={formDetails}
            formMode={formMode}
          />
        </Route>
        <Route>
          <Row>
            <Title level={3}>Users</Title>
          </Row>
          {companyLoading ? (
            <Skeleton />
          ) : (
            <Row>
              <Col span={20}>
                <Tabs defaultActiveKey={selectedCompany} onChange={handleChangeTab}>
                  {companies.map((company) => {
                    return (
                      <TabPane tab={company.name} key={company.id} disabled={contentLoading} />
                    );
                  })}
                </Tabs>

                {contentLoading ? (
                  <Skeleton />
                ) : (
                  <>
                    <Button
                      style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
                      icon={<UserAddOutlined />}
                      onClick={(e) => {
                        handleAdd();
                      }}
                    >
                      Add
                    </Button>
                    {departments.map((department) => {
                      const departmentUsers = userDepartments.find(
                        (userDepartment) => userDepartment.id === department.id
                      );
                      return (
                        <>
                          <Divider orientation="left">{department.name}</Divider>
                          {renderUsers(departmentUsers)}
                        </>
                      );
                    })}
                    <Drawer
                      width="50%"
                      placement="right"
                      closable={false}
                      onClose={onClose}
                      visible={displayDrawer}
                    >
                      {selectedUser === null ? (
                        <Skeleton />
                      ) : (
                        <>
                          <Descriptions
                            bordered
                            title={`${selectedUser.firstName} ${selectedUser.lastName}`}
                            size="default"
                            layout="vertical"
                            extra={
                              <Row gutter={[8, 8]}>
                                <Col>
                                  <Button
                                    icon={<EditOutlined />}
                                    onClick={(e) => {
                                      handleUpdate(selectedUser);
                                    }}
                                  >
                                    Edit User
                                  </Button>
                                </Col>
                                {/* <Col>
                              <Button danger
                                icon={<DeleteOutlined />}
                                onClick={(e) => {
                                  handleDelete(selectedUser)
                                }}
                              >
                                Deactivate User
                              </Button>
                              </Col> */}
                              </Row>
                            }
                          >
                            {formDetails.form_items.map((item) => {
                              if (!item.writeOnly) {
                                if (item.type === 'select' || item.type === 'selectSearch') {
                                  const itemData = selectedUser[item.name];
                                  return (
                                    <Descriptions.Item label={item.label}>
                                      {itemData[item.selectName]}
                                    </Descriptions.Item>
                                  );
                                }
                                if (
                                  item.type === 'list' ||
                                  item.type === 'listSelect' ||
                                  item.type === 'checkList'
                                ) {
                                  return (
                                    <Descriptions.Item label={item.label}>
                                      <List
                                        size="small"
                                        bordered
                                        dataSource={selectedUser[item.name]}
                                        renderItem={(listItem) => (
                                          <List.Item>{item.render(listItem)}</List.Item>
                                        )}
                                      />
                                    </Descriptions.Item>
                                  );
                                }
                                if (item.type === 'customList') {
                                  return null;
                                }

                                return (
                                  <Descriptions.Item label={item.label}>
                                    {selectedUser[item.name]}
                                  </Descriptions.Item>
                                );
                              }

                              return null;
                            })}
                          </Descriptions>
                        </>
                      )}
                    </Drawer>
                  </>
                )}
              </Col>
            </Row>
          )}
        </Route>
      </Switch>
    </Container>
  );
};

export default Users;

const styles = {
  Card: {
    backgroundColor: '#FAFAFA',
    marginRight: '2%',
  },

  CardIcon: {
    fontSize: '32px',
  },

  formList: {
    borderStyle: 'solid',
    borderWidth: 1,
    padding: '2%',
    backgroundColor: '#FAFAFA',
    width: '87.5%',
    marginBottom: '2%',
  },

  row: {
    marginLeft: '1%',
  },

  span: 5,

  gutter: [16, 16],

  listItems: {
    labelCol: {
      span: 12,
      style: {
        display: 'flex',
      },
    },
    wrapperCol: {
      span: 12,
    },
  },
};
