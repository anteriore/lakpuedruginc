import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Typography } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../../components/container';
import ModulesGrid from '../../components/ModulesGrid';
import { routes } from '../../navigation/dashboard';

import { listCompany } from '../../redux/company';

const { TabPane } = Tabs;
const { Title } = Typography;

const Dashboard = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  
  const [company, setCompany] = useState(1);
  const [moduleRoutes, setModuleRoutes] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);
  
  const companies = useSelector((state) => state.company.companyList);
  const { permissions } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(listCompany()).then(() => {
      setModuleRoutes(getPermittedRoutes())
      setContentLoading(false);
    });

  }, [dispatch]);

  const getPermittedRoutes = () => {
    var routeList = []
    routes.forEach((route) => {
      if(typeof route.key !== 'undefined'){
        if(typeof permissions[route.key] !== 'undefined'){
          routeList.push(route)
        }
      }
      else {
        routeList.push(route)
      }
    })
    return routeList
  }

  const handleTabChange = (key) => {
    setCompany(key);
  };

  return (
    <Switch>
      <Route exact path={path}>
        <Container location={{ pathname: path }}>
          <Row>
            <Title level={3}>Dashboard</Title>
          </Row>
          <Row>
            <Col span={24}>
              <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                <TabPane tab="Lakpue Drug Inc." key="1">
                  <ModulesGrid modules={moduleRoutes} />
                </TabPane>
                <TabPane tab="La Croesus Pharma Inc." key="2">
                  <ModulesGrid modules={moduleRoutes} />
                </TabPane>
                <TabPane tab="Fanfreluche Enterprises Inc." key="3">
                  <ModulesGrid modules={moduleRoutes} />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </Route>
      {moduleRoutes.map((module) => (
        <Route path={path + module.path}>
          <Container location={{ pathname: path + module.path }}>
            <module.component title={module.title} company={company} />
          </Container>
        </Route>
      ))}
    </Switch>
  );
};

export default Dashboard;
