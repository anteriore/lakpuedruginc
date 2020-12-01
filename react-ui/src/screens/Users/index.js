import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Button, Typography, Skeleton, Divider, Empty, Card, Drawer, Descriptions, List, message } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserAddOutlined, UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import Container from '../../components/container';
import FormScreen from '../../components/forms/FormScreen';

import { listUser, addUser, deleteUser } from './redux/';
import { listCompany } from '../../redux/company';
import { listD } from '../Maintenance/DepartmentArea/redux';
import { listDepot } from '../Maintenance/Depots/redux';

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
  
  const { companyList } = useSelector((state) => state.company)
  const [companyLoading, setCompanyLoading] = useState(true)
  const [company, setCompany] = useState(1)

  const [displayDrawer, setDisplayDrawer] = useState(false)
  const [contentLoading, setContentLoading] = useState(true)
  const [userDepartments, setUserDepartments] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const departments = useSelector((state) => state.maintenance.departmentArea.deptList)
  const depots = useSelector((state) => state.maintenance.depots.list)
  const users = useSelector((state) => state.users.list)

  useEffect(() => {
    dispatch(listCompany()).then(() => {
      setFormData(null);
      setCompanyLoading(false)
      setSelectedUser(null)
      updateUserDepartments(1)
    })
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
      /*{
        label: 'Password',
        name: 'password',
        type: 'password',
        rules: [{ required: true, message: 'Please provide a valid password. Your password must be at least 8 characters.', min: 8 }],
        placeholder: 'Password',
        writeOnly: true
      },
      {
        label: 'Confirm Password',
        name: 'confirmPassword',
        type: 'password',
        rules: [{ required: true, message: 'Please provide a valid password' }],
        placeholder: 'Confirm Password',
        writeOnly: true
      },*/
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
      {
        label: 'Depots',
        name: 'depots',
        type: 'checkList',
        selectName: 'name',
        choices: depots,
        render: object => `[${object.code}] ${object.name}`,
        rules: [{ required: true }],
        placeholder: 'Select depots',
      },
    ],
  };

  const handleAdd = () => {
    setFormTitle('Add User');
    setFormMode('add');
    setFormData(null);
    dispatch(listD({ company })).then(() => {
      dispatch(listDepot({ company })).then(() => {
        history.push(`${path}/new`);
      })
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Edit User');
    setFormMode('edit');
    var userData = users.find(user => user.id === data.id)
    var depotData = []
    userData.depots.map((depot) => {
      depotData.push(depot.id)
    })
    const formData = {
      ...userData,
      department: userData.department !== null ? userData.department.id : null,
      depots: depotData,
    };
    console.log(formData)
    setFormData(formData);
    dispatch(listD({ company })).then(() => {
      dispatch(listDepot({ company })).then(() => {
        history.push(`${path}/${data.id}`);
      })
    });
  };

  const handleDelete = (data) => {
    dispatch(deleteUser(data.id)).then((response) => {
      setContentLoading(true);
      if(response.payload.status === 200){
        dispatch(listUser({ company })).then(() => {
          setContentLoading(false);
          message.success(`Successfully deleted ${data.firstName} ${data.lastName}`);
        })
      }
      else {
        setContentLoading(false);
        message.error(`Unable to delete ${data.firstName} ${data.lastName}`);
      }
    });
  };

  const handleCancelButton = () => {
    setFormData(null);
  };

  const onSubmit = (data) => {
    console.log(data)
    var depotData = []
    data.depots.map((depot) => {
      depotData.push({
        id: depot
      })
    })
    var payload = {
      ...data,
      company: {
        id: company,
      },
      department: {
        id: data.department
      },
      depots: depotData
    };
    if (formMode === 'edit') {
      payload.id = formData.id
      dispatch(addUser(payload)).then((response) => {
        setContentLoading(true);
        if(response.payload.status === 200){
            updateUserDepartments(company)
            history.goBack();
            message.success(`Successfully updated ${data.firstName} ${data.lastName}`);
        }
        else {
          setContentLoading(false);
          message.error(`Unable to update ${data.firstName} ${data.lastName}`);
        }
      });
    } else if (formMode === 'add') {
      console.log(payload)
      dispatch(addUser(payload)).then((response) => {
        setContentLoading(true);
        if(response.payload.status === 200){
          updateUserDepartments(company)
          history.goBack();
          message.success(`Successfully added ${data.firstName} ${data.lastName}`);
        }
        else {
          setContentLoading(false);
          message.error(`Unable to add ${data.firstName} ${data.lastName}`);
        }
      });
    }

    setFormData(null);
  };

  const updateUserDepartments = (companyID) => {
    dispatch(listD({company: companyID})).then((response) => {
      if(response.payload.status == 200){
        var userDepartmentList = []
        {response.payload.data.map((department) => {
          userDepartmentList.push({
            id: department.id,
            users: []
          })
        })}
        dispatch(listUser({company: companyID})).then((response) => {
          if(response.payload.status == 200){
            {response.payload.data.map((user) => {
              var usersPerDept = userDepartmentList.find(department => department.id === user.department.id)
              usersPerDept.users.push(user)
            })}
            setUserDepartments(userDepartmentList)
            setContentLoading(false);
          }
        })
      }
    });
  }

  const handleChangeTab = (companyID) => {
    setContentLoading(true)
    setCompany(companyID)
    updateUserDepartments(companyID)
    
  };

  const renderUsers = (departmentUsers) => {
    if(departmentUsers.users.length > 0) {
      var index = 0
      var usersRow = []
      var usersGrid = []
      departmentUsers.users.map((user) => {
        index += 1
        usersRow.push(
          <Card 
            bordered 
            hoverable
            style={styles.Card}
            onClick={() => {
              setSelectedUser(user)
              showDrawer()
            }}
          >
            <Meta
              avatar={<UserOutlined/>}
              title={user.firstName + ' ' + user.lastName}
            />
            
          </Card>
        )
        if(index % 4 === 0){
          usersGrid.push(<Row gutter={styles.gutter}>{usersRow}</Row>)
          usersRow = []
        }
      })
      if(index % 4 !== 0){
        usersGrid.push(<Row gutter={styles.gutter} style={styles.row}>{usersRow}</Row>)
      }
      return usersGrid
    }
    else {
     return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)
    }
  }

  const showDrawer = () => {
    setDisplayDrawer(true)
  };

  const onClose = () => {
    setDisplayDrawer(false)
    setSelectedUser(null)
  };

  return (
    <Container location={{ pathname: path }}>
      <Switch>
        <Route path={`${path}/new`}>
          <FormScreen
            title={formTitle}
            onSubmit={onSubmit}
            values={formData}
            onCancel={handleCancelButton}
            formDetails={formDetails} 
          />
        </Route>
        <Route path={`${path}/:id`}>
          <FormScreen
            title={formTitle}
            onSubmit={onSubmit}
            values={formData}
            onCancel={handleCancelButton}
            formDetails={formDetails} 
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
                <Tabs onChange={handleChangeTab}>
                  {companyList.map((company) => {
                    return (
                      <TabPane tab={company.name} key={company.id}>
                      </TabPane>
                    )
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
                    const departmentUsers = userDepartments.find(userDepartment => userDepartment.id === department.id)
                    return (
                      <>
                      <Divider orientation="left">{department.name}</Divider>
                        {renderUsers(departmentUsers)}
                      </>
                    )
                  })}
                  <Drawer
                    width={"50%"}
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
                        title={selectedUser.firstName + ' ' + selectedUser.lastName}
                        size="default"
                        layout="vertical"
                        extra={
                          <Row gutter={[8,8]}>
                            <Col>
                              <Button
                                icon={<EditOutlined />}
                                onClick={(e) => {
                                  handleUpdate(selectedUser)
                                }}
                              >
                                Edit User
                              </Button>
                            </Col>
                            {/*<Col>
                              <Button danger
                                icon={<DeleteOutlined />}
                                onClick={(e) => {
                                  handleDelete(selectedUser)
                                }}
                              >
                                Delete User
                              </Button>
                              </Col>*/}
                          </Row>
                        }
                      >
                        {formDetails.form_items.map((item) => {
                          if(!item.writeOnly){
                            if(item.type === 'select'){
                              const itemData = selectedUser[item.name]
                              return <Descriptions.Item label={item.label}>{itemData[item.selectName]}</Descriptions.Item>
                            }
                            else if(item.type === 'list' || item.type === 'listSelect' || item.type === 'checkList'){
                              console.log("DATA", selectedUser[item.name])
                              return (
                                <Descriptions.Item label={item.label}>
                                  <List
                                    size="small"
                                    bordered
                                    dataSource={selectedUser[item.name]}
                                    renderItem={listItem => (
                                      <List.Item>
                                        {item.render(listItem)}
                                      </List.Item>
                                    )
                                    }
                                  />
                                </Descriptions.Item>
                              )
                            }
                            else {
                              return <Descriptions.Item label={item.label}>{selectedUser[item.name]}</Descriptions.Item>
                            }
                          }
                          
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
    backgroundColor: "#FAFAFA",
    marginRight: "2%"
  },

  CardIcon: {
    fontSize: '32px',
  },

  row: {
    marginLeft: "1%",
  },

  span: 5,

  gutter: [16, 16],
};