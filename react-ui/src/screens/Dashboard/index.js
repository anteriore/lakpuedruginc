import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Tabs, Typography, Skeleton, Empty } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../../components/container';
import ModulesGrid from '../../components/ModulesGrid';
import { routes } from '../../navigation/dashboard';

import { listCompany, setCompany } from '../../redux/company';
import { logout } from '../../redux/auth';
import GeneralHelper from '../../helpers/general-helper';

const { TabPane } = Tabs;
const { Title } = Typography;

const Dashboard = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [moduleRoutes, setModuleRoutes] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);
  const { handleRequestResponse, pushErrorPage } = GeneralHelper()

  const companies = useSelector((state) => state.company.companyList);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const { permissions } = useSelector((state) => state.auth);

  const getPermittedRoutes = useCallback(() => {
    const routeList = [];
    routes.forEach((route) => {
      if (
        typeof permissions[route.path.split('/')[1]] !== 'undefined' &&
        (permissions[route.path.split('/')[1]]?.actions ?? '').search('r') !== -1
      ) {
        routeList.push(route);
      }
    });
    return routeList;
  }, [permissions]);

  useEffect(() => {
    setContentLoading(true);
    dispatch(listCompany()).then((response) => {
      const onSuccess = () => {
        setModuleRoutes(getPermittedRoutes());
        setContentLoading(false);
      }
      const onFail = () => {
        dispatch(logout())
        pushErrorPage(response?.payload?.status ?? 400, '/login');
      }
      handleRequestResponse([response], onSuccess, onFail, null)
    });
  }, [dispatch, getPermittedRoutes, handleRequestResponse, pushErrorPage]);

  const handleChangeTab = (id) => {
    dispatch(setCompany(id));
  };

  return (
    <Switch>
      <Route exact path={path}>
        <Container location={{ pathname: path }}>
          <Row>
            <Title level={3}>Dashboard</Title>
          </Row>
          {contentLoading ? (
            <Skeleton />
          ) : (
            <Row>
              <Col span={24}>
                <Tabs defaultActiveKey={selectedCompany} onChange={handleChangeTab}>
                  {companies.map((val) => {
                    return (
                      <TabPane tab={val.name} key={val.id}>
                        <ModulesGrid company={val.name} modules={moduleRoutes} />
                      </TabPane>
                    );
                  })}
                </Tabs>
                {moduleRoutes.length === 0 && (
                  <Empty
                    style={{ width: '87.5%' }}
                    description="You do not have the permission to access this module."
                  />
                )}
              </Col>
            </Row>
          )}
        </Container>
      </Route>
      {!contentLoading &&
        moduleRoutes.map((module) => {
          const actions = [];
          if (permissions[module.path.split('/')[1]].actions.search('u') !== -1) {
            actions.push('update');
          }
          if (permissions[module.path.split('/')[1]].actions.search('c') !== -1) {
            actions.push('create');
          }
          if (permissions[module.path.split('/')[1]].actions.search('d') !== -1) {
            actions.push('delete');
          }
          if (permissions[module.path.split('/')[1]].actions.search('r') !== -1) {
            actions.push('read');
          }
          return (
            <Route key={path} path={path + module.path}>
              <Container location={{ pathname: path + module.path }}>
                <module.component
                  title={module.title}
                  company={selectedCompany}
                  actions={actions}
                />
              </Container>
            </Route>
          );
        })}
    </Switch>
  );
};

export default Dashboard;
