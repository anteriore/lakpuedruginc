import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Typography, Skeleton } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from '../../navigation/maintenance';
import Container from '../../components/container';
import ModulesGrid from '../../components/ModulesGrid';

import { listCompany } from '../../redux/company';

const { TabPane } = Tabs;
const { Title } = Typography;

const Maintenance = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const [company, setCompany] = useState(1);
  const [contentLoading, setContentLoading] = useState(true);
  const [moduleRoutes, setModuleRoutes] = useState([]);

  const { companyList } = useSelector((state) => state.company);
  const { permissions } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(listCompany()).then(() => {
      setModuleRoutes(routes)
      //setModuleRoutes(getPermittedRoutes())
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

  const handleChangeTab = (id) => {
    setCompany(id);
  };

  

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <Container location={{ pathname: path }}>
            <Row>
              <Title level={3}>Maintenance</Title>
            </Row>
            {contentLoading ? (
              <Skeleton />
            ) : (
              <Row>
                <Col span={24}>
                  <Tabs defaultActiveKey="company.id" onChange={handleChangeTab}>
                    {companyList.map((val) => {
                      return (
                        <TabPane tab={val.name} key={val.id}>
                          <ModulesGrid company={val.name} modules={moduleRoutes} />
                        </TabPane>
                      )
                    })}
                  </Tabs>
                </Col>
              </Row>
            )}
          </Container>
        </Route>
        {!contentLoading && moduleRoutes.map((module) => {
          return (
            <Route path={path + module.path}>
              <Container location={{ pathname: path + module.path }}>
                <module.component title={module.title} company={company} />
              </Container>
            </Route>
          )
        })}
      </Switch>
    </>
  );
};

export default Maintenance;
