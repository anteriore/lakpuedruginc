import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Typography, Skeleton, Empty } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from '../../navigation/maintenance';
import Container from '../../components/container';
import ModulesGrid from '../../components/ModulesGrid';
import { listCompany, setCompany } from '../../redux/company';

const { TabPane } = Tabs;
const { Title } = Typography;

const Maintenance = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const [moduleRoutes, setModuleRoutes] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);
  const companies = useSelector((state) => state.company.companyList);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const { permissions } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(listCompany()).then(() => {
      //setModuleRoutes(routes)
      setModuleRoutes(getPermittedRoutes())
      setContentLoading(false);
    });

  }, [dispatch]);

  const getPermittedRoutes = () => {
    var routeList = []
    routes.forEach((route) => {
      if(typeof permissions[route.path.split("/")[1]] !== 'undefined'){
        routeList.push(route)
      }
    })
    return routeList
  }

  const handleChangeTab = (id) => {
    dispatch(setCompany(id));
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
                  <Tabs defaultActiveKey={selectedCompany} onChange={handleChangeTab}>
                    {companies.map((val) => (
                      <TabPane tab={val.name} key={val.id}>
                        <ModulesGrid company={val.name} modules={moduleRoutes} />
                      </TabPane>
                    ))}
                  </Tabs>
                  {moduleRoutes.length === 0 && <Empty style={{width: "87.5%"}} description="You do not have the permission to access this module." />}
                </Col>
              </Row>
            )}
          </Container>
        </Route>
        {
          moduleRoutes.map((module) => {
            var actions = []
            if(permissions[module.path.split("/")[1]].actions.search('u') !== -1){
              actions.push("update")
            }
            if(permissions[module.path.split("/")[1]].actions.search('c') !== -1){
              actions.push("create")
            }
            if(permissions[module.path.split("/")[1]].actions.search('d') !== -1){
              actions.push("delete")
            }
            if(permissions[module.path.split("/")[1]].actions.search('r') !== -1){
              actions.push("read")
            }
            return (
            <Route path={path + module.path}>
              <Container location={{ pathname: path + module.path }}>
                <module.component title={module.title} company={selectedCompany} actions={actions}/>
              </Container>
            </Route>
            )
        })}
      </Switch>
    </>
  );
};

export default Maintenance;
