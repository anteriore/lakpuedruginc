import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import GeneralHelper, { reevalutateMessageStatus } from '../../helpers/general-helper';

import {
  listUser,
  addUser,
  updateUser,
  /* deleteUser, */ clearData,
  listPermission,
} from './redux';
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
  const { handleRequestResponse } = GeneralHelper()

  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const isMounted = useRef(true);

  const [companyLoading, setCompanyLoading] = useState(true);

  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [contentLoading, setContentLoading] = useState(true);
  const [userDepartments, setUserDepartments] = useState([]);
  const [actions, setActions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const companies = useSelector((state) => state.company.companyList);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const departments = useSelector((state) => state.maintenance.departmentArea.deptList);
  const depots = useSelector((state) => state.maintenance.depots.list);
  const { statusMessage, action, status, statusLevel } = useSelector((state) => state.users);
  const { permissions } = useSelector((state) => state.auth);

  useEffect(() => {
    const actionList = [];
    if (typeof permissions.users !== 'undefined') {
      if (permissions.users.actions.search('u') !== -1) {
        actionList.push('update');
      }
      if (permissions.users.actions.search('c') !== -1) {
        actionList.push('create');
      }
      if (permissions.users.actions.search('d') !== -1) {
        actionList.push('delete');
      }
      if (permissions.users.actions.search('r') !== -1) {
        actionList.push('read');
      }
    }
    setActions(actionList);
  }, [permissions])

  useEffect(() => {
    dispatch(listCompany()).then(() => {
      setFormData(null);
      setCompanyLoading(false);
      setSelectedUser(null);
    });

    return function cleanup() {
      isMounted.current = false
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearDepartment());
    }
  }, [dispatch]);

  const updateUserDepartments = useCallback(() => {
    setContentLoading(true);
    if(actions.includes('read')){
      dispatch(listD({ company: selectedCompany, message })).then((response1) => {
        dispatch(listUser({ company: selectedCompany, message })).then((response2) => {
          const onSuccess = () => {
            const userDepartmentList = [];
            response1.payload.data.forEach((department) => {
              userDepartmentList.push({
                id: department.id,
                users: [],
              });
            });
            response2.payload.data.forEach((user) => {
              const usersPerDept = userDepartmentList.find(
                (department) => department.id === user.department.id
              );
              usersPerDept.users.push(user);
            });
            setUserDepartments(userDepartmentList);
            setContentLoading(false);
          }
          const onFail = () => {
            setUserDepartments([]);
            setContentLoading(false);
          }
          handleRequestResponse([response1, response2], onSuccess, onFail, '');
        });
      });
    }
    else {
      setUserDepartments([]);
      setContentLoading(false);
    }
  }, [actions, selectedCompany, dispatch])

  useEffect(() => {
    updateUserDepartments()
  }, [updateUserDepartments])

  useEffect(() => {
    reevalutateMessageStatus({status, action, statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  const performCleanup = () => {
  };

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
    dispatch(listD({ company: selectedCompany, message })).then((response1) => {
      dispatch(listDepot({ company: selectedCompany, message })).then((response2) => {
        dispatch(listPermission({ company: selectedCompany, message })).then((response3) => {
          if(isMounted.current){
            const onSuccess = () => {
              history.push(`${path}/new`);
              setCompanyLoading(false);
            }
            const onFail = () => {
              setCompanyLoading(false);
            }
            handleRequestResponse([response1, response2, response3], onSuccess, onFail, '');
          }
          else {
            performCleanup()
          }
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
    dispatch(listD({ company: selectedCompany, message })).then((response1) => {
      dispatch(listDepot({ company: selectedCompany, message })).then((response2) => {
        dispatch(listPermission({ company: selectedCompany, message })).then((response3) => {
          if(isMounted.current){
            const onSuccess = () => {
              history.push(`${path}/${data.id}`);
              setCompanyLoading(false);
            }
            const onFail = () => {
              setCompanyLoading(false);
            }
            handleRequestResponse([response1, response2, response3], onSuccess, onFail, '');
          }
          else {
            performCleanup()
          }
        });
      });
    });
  };

  const handleCancelButton = () => {
    setFormData(null);
  };

  const onSubmit = async (data) => {
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
      await dispatch(updateUser(payload)).then((response) => {
        setContentLoading(true);
        history.goBack();
        const onSuccess = () => {
          updateUserDepartments(selectedCompany);
        }
        const onFail = () => {
          setContentLoading(false);
        }
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    } 
    else if (formMode === 'add') {
      await dispatch(addUser(payload)).then((response) => {
        setContentLoading(true);
        history.goBack();
        const onSuccess = () => {
          updateUserDepartments(selectedCompany);
        }
        const onFail = () => {
          setContentLoading(false);
        }
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    }
    setFormData(null);
    return 1
  };

  const handleChangeTab = (companyID) => {
    dispatch(setCompany(companyID));
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
                    {actions.includes('create') && (
                      <Button
                        style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
                        icon={<UserAddOutlined />}
                        onClick={(e) => {
                          handleAdd();
                        }}
                      >
                        Add
                      </Button>
                    )}
                    {actions.includes('read') ? (
                      departments !== null ? (
                        departments.map((department) => {
                          const departmentUsers = userDepartments.find(
                            (userDepartment) => userDepartment.id === department.id
                          );
                          return (
                            <>
                              <Divider orientation="left">{department.name}</Divider>
                              {renderUsers(departmentUsers)}
                            </>
                          );
                        })
                      ) : (
                        <Empty style={{ width: '87.5%' }} description="No data." />
                      )
                    ) : (
                      <Empty
                        style={{ width: '87.5%' }}
                        description="You do not have the permission to access this module."
                      />
                    )}
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
                                {actions.includes('update') && (
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
                                )}
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
                          <Descriptions
                            bordered
                            // title={"Permissions"}
                            size="default"
                            layout="vertical"
                          >
                            <Descriptions.Item label="Permissions">
                              <List
                                size="small"
                                bordered
                                dataSource={Object.entries(selectedUser.permissions)}
                                renderItem={(listItem) => {
                                  return (
                                    <List.Item>
                                      {`${listItem[1].code} - ${listItem[1].actions}`}
                                    </List.Item>
                                  );
                                }}
                              />
                            </Descriptions.Item>
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
