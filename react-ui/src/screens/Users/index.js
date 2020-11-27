import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Button, Typography, Skeleton, Divider, Empty, Card, Drawer, Descriptions } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserAddOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';

import Container from '../../components/container';
import { listCompany } from '../../redux/company';
import { listD } from '../Maintenance/DepartmentArea/redux';
import { listUser } from './redux/'

const { TabPane } = Tabs;
const { Title } = Typography;
const { Meta } = Card;

const Users = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [displayDrawer, setDisplayDrawer] = useState(false)
  const [companyLoading, setCompanyLoading] = useState(true)
  const [contentLoading, setContentLoading] = useState(true)
  const { companyList } = useSelector((state) => state.company)
  const [userDepartments, setUserDepartments] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const departments = useSelector((state) => state.maintenance.departmentArea.deptList)
  const users = useSelector((state) => state.users.list)

  useEffect(() => {
    dispatch(listCompany()).then(() => {
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
        label: 'Department',
        name: 'department',
        type: 'select',
        selectName: 'name',
        choices: departments,
        rules: [{ required: true }],
      },
    ],
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
    setContentLoading(true);
    updateUserDepartments(companyID)
    
  };

  const renderUsers = (departmentUsers) => {
    if(departmentUsers.users.length > 0) {
      var index = 0
      var usersRow = []
      var usersGrid = []
      departmentUsers.users.map((user) => {
        index += 1
        if(index % 4 === 0){
          usersRow.push(
            <Card bordered style={styles.Card}>
              {user.firstName}
            </Card>
          )
          usersGrid.push(<Row gutter={styles.gutter}>{usersRow}</Row>)
          usersRow = []
        }
        else {
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
                description="Admin Account"
              />
              
            </Card>
          )
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
    <>
      <Switch>
        <Route exact path={path}>
          <Container location={{ pathname: path }}>
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
                      //handleAdd();
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
                            <Button
                              icon={<EditOutlined />}
                              onClick={(e) => {
                              }}
                            >Edit User</Button>
                          }
                        >
                          {formDetails.form_items.map((item) => {
                            if(item.type === 'select'){
                              const itemData = selectedUser[item.name]
                              return <Descriptions.Item label={item.label}>{selectedUser[item.selectName]}</Descriptions.Item>
                            }
                            else if(item.type === 'list' || item.type === 'listSelect'){
                              return ''
                            }
                            else {
                              return <Descriptions.Item label={item.label}>{selectedUser[item.name]}</Descriptions.Item>
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
          </Container>
        </Route>
      </Switch>
    </>
  );
};

export default Users;

const styles = {
  Card: {
    backgroundColor: "#FAFAFA",
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